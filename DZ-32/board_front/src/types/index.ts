// Роли пользователей
export type Role = 'USER' | 'ADMIN';

// Статусы задач
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

// Пользователь
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  tasks?: UserTask[]; // задачи пользователя (в профиле)
}

// Задача внутри профиля пользователя
export interface UserTask {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  board: {
    id: string;
    title: string;
  };
  createdAt: string;
}

// Доска (аналог Movie)
export interface Board {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  _count?: {
    tasks: number; // количество задач (с бэка)
  };
}

// Задача (аналог Review)
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  boardId: string;
  userId: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

// Ответ от GET /boards (с пагинацией)
export interface BoardsResponse {
  data: Board[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Параметры фильтрации досок
export interface BoardsQuery {
  page?: number;
  limit?: number;
  title?: string;
  sortBy?: 'title' | 'createdAt';
  order?: 'asc' | 'desc';
}

// Параметры фильтрации задач
export interface TasksQuery {
  page?: number;
  limit?: number;
  status?: TaskStatus;
  boardId?: string;
  userId?: string;
  sortBy?: 'createdAt' | 'status' | 'title';
  order?: 'asc' | 'desc';
}