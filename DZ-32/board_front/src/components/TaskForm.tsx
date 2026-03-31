"use client";

import { useState } from "react";
import { apiCreateTask } from "@/lib/api";
import type { TaskStatus } from "@/types";

interface Props {
  boardId: string;
  onTaskAdded: () => void;
}

export default function TaskForm({ boardId, onTaskAdded }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Введите название задачи");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await apiCreateTask({
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        boardId,
      });

      // очистка формы
      setTitle("");
      setDescription("");
      setStatus("TODO");

      onTaskAdded(); // обновляем список задач
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ошибка при создании задачи");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">Создать задачу</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Название */}
        <div>
          <label className="text-gray-400 text-sm block mb-1">
            Название
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Сделать API"
            className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Описание */}
        <div>
          <label className="text-gray-400 text-sm block mb-1">
            Описание <span className="text-gray-600">(необязательно)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Добавьте детали задачи..."
            className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Статус */}
        <div>
          <label className="text-gray-400 text-sm block mb-1">
            Статус
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        {/* Ошибка */}
        {error && (
          <p className="text-red-400 text-sm bg-red-950 border border-red-900 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Кнопка */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium transition-colors"
        >
          {loading ? "Создание..." : "Создать задачу"}
        </button>
      </form>
    </div>
  );
}