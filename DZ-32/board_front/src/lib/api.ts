import { getAccessToken, saveAccessToken, clearAccessToken } from "./auth";
import type {
  Board,
  BoardsResponse,
  BoardsQuery,
  Task,
  TasksQuery,
  User,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ─── БАЗОВЫЙ REQUEST ────────────────────────────────────────────────
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false,
): Promise<T> {
  const accessToken = getAccessToken();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  // 🔁 Refresh token логика
  if (response.status === 401 && !isRetry) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      return request<T>(endpoint, options, true);
    } else {
      clearAccessToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Сессия истекла");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Ошибка ${response.status}`);
  }

  if (response.status === 204) return null as T;

  return response.json();
}

// ─── REFRESH TOKEN ───────────────────────────────────────────────
async function tryRefreshToken(): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) return false;

    const data = await response.json();
    saveAccessToken(data.accessToken);
    return true;
  } catch {
    return false;
  }
}

// ─── AUTH ─────────────────────────────────────────────────────────
export async function apiRegister(
  email: string,
  password: string,
  name: string,
): Promise<{ accessToken: string }> {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export async function apiLogin(
  email: string,
  password: string,
): Promise<{ accessToken: string }> {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function apiLogout(): Promise<void> {
  return request("/auth/logout", { method: "POST" });
}

// ─── USERS ────────────────────────────────────────────────────────
export async function apiGetProfile(): Promise<User> {
  return request<User>("/users/profile");
}

// ─── BOARDS ───────────────────────────────────────────────────────
export async function apiGetBoards(query: BoardsQuery = {}): Promise<BoardsResponse> {
  const params = new URLSearchParams();
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  if (query.title) params.set("title", query.title);
  if (query.sortBy) params.set("sortBy", query.sortBy);
  if (query.order) params.set("order", query.order);

  const qs = params.toString();
  return request<BoardsResponse>(`/boards${qs ? `?${qs}` : ""}`);
}

export async function apiGetBoard(id: string): Promise<Board> {
  return request<Board>(`/boards/${id}`);
}

export async function apiCreateBoard(data: { title: string; description?: string }): Promise<Board> {
  return request<Board>("/boards", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function apiDeleteBoard(id: string): Promise<void> {
  return request<void>(`/boards/${id}`, { method: "DELETE" });
}

// ─── TASKS ───────────────────────────────────────────────────────
export async function apiGetTasks(query: TasksQuery = {}): Promise<Task[]> {
  const params = new URLSearchParams();
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  if (query.status) params.set("status", query.status);
  if (query.boardId) params.set("boardId", query.boardId);
  if (query.userId) params.set("userId", query.userId);
  if (query.sortBy) params.set("sortBy", query.sortBy);
  if (query.order) params.set("order", query.order);

  const qs = params.toString();
  return request<Task[]>(`/tasks${qs ? `?${qs}` : ""}`);
}

export async function apiCreateTask(data: { title: string; description?: string; status: string; boardId: string }): Promise<Task> {
  return request<Task>("/tasks", { method: "POST", body: JSON.stringify(data) });
}

export async function apiUpdateTask(id: string, data: Partial<{ title: string; description: string; status: string }>): Promise<Task> {
  return request<Task>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

export async function apiDeleteTask(id: string): Promise<void> {
  return request<void>(`/tasks/${id}`, { method: "DELETE" });
}