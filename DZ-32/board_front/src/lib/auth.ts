// src/lib/auth.ts

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export function saveAccessToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("accessToken", token);
}

export function clearAccessToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
}

// ─── ПРОВЕРКА АВТОРИЗАЦИИ ───────────────────────────────
export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}