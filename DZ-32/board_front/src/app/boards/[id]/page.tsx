"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  apiGetBoard,
  apiGetTasks,
  apiDeleteTask,
} from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import type { Board, Task } from "@/types";
import TaskForm from "@/components/TaskForm";

type BoardWithTasks = Board & { tasks: Task[] };

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [data, setData] = useState<BoardWithTasks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  // загрузка доски + задач
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const board = await apiGetBoard(id);
      const tasks = await apiGetTasks({ boardId: id });
      setData({ ...board, tasks });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Доска не найдена");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleDeleteTask(taskId: string) {
    if (!confirm("Удалить задачу?")) return;

    setDeletingId(taskId);

    try {
      await apiDeleteTask(taskId);
      await loadData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Не удалось удалить");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-8 bg-gray-800 rounded w-1/2 mb-4" />
        <div className="h-4 bg-gray-800 rounded w-1/4 mb-8" />
        <div className="h-32 bg-gray-800 rounded mb-8" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <p className="text-red-400 mb-4">{error || "Доска не найдена"}</p>
        <button
          onClick={() => router.back()}
          className="text-blue-400 hover:underline"
        >
          ← Назад
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Назад */}
      <button
        onClick={() => router.back()}
        className="text-gray-500 hover:text-white text-sm mb-6 transition-colors"
      >
        ← К списку досок
      </button>

      {/* Инфо о доске */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <h1 className="text-3xl font-bold text-white">{data.title}</h1>

        <p className="text-gray-500 text-sm mt-2">
          Создано:{" "}
          {new Date(data.createdAt).toLocaleDateString("ru-RU")}
        </p>

        {data.description && (
          <p className="text-gray-300 mt-4">{data.description}</p>
        )}

        <p className="text-gray-400 text-sm mt-4">
          Задач: {data.tasks.length}
        </p>
      </div>

      {/* Форма создания задачи */}
      {loggedIn ? (
        <div className="mb-8">
          <TaskForm boardId={id} onTaskAdded={loadData} />
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-8 text-center">
          <p className="text-gray-400 text-sm">
            Чтобы создавать задачи,{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              войдите в аккаунт
            </a>
          </p>
        </div>
      )}

      {/* Список задач */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          Задачи {data.tasks.length > 0 && `(${data.tasks.length})`}
        </h2>

        {data.tasks.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>Задач пока нет. Создай первую!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.tasks.map((task: Task) => (
              <div
                key={task.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{task.title}</p>

                    <span className="text-gray-500 text-xs">
                      {task.user?.name ?? "Аноним"} •{" "}
                      {new Date(task.createdAt).toLocaleDateString("ru-RU")}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        task.status === "TODO"
                          ? "bg-gray-700 text-gray-300"
                          : task.status === "IN_PROGRESS"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-green-900 text-green-300"
                      }`}
                    >
                      {task.status}
                    </span>

                    {loggedIn && (
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        disabled={deletingId === task.id}
                        className="text-gray-600 hover:text-red-400 text-xs disabled:opacity-50"
                      >
                        {deletingId === task.id ? "..." : "Удалить"}
                      </button>
                    )}
                  </div>
                </div>

                {task.description && (
                  <p className="text-gray-300 mt-2 text-sm">
                    {task.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}