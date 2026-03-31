import Link from "next/link";
import type { Board } from "@/types";

export default function BoardCard({ board }: { board: Board }) {
  return (
    <Link href={`/boards/${board.id}`} className="block group">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 h-full hover:border-gray-600 transition-all duration-200 hover:-translate-y-1">
        
        {/* Заголовок */}
        <h3 className="text-white font-semibold text-base mb-2 group-hover:text-blue-400 transition-colors">
          {board.title}
        </h3>

        {/* Описание */}
        {board.description && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-3">
            {board.description}
          </p>
        )}

        {/* Дата создания */}
        <p className="text-gray-500 text-xs mb-2">
          Создано: {formatDate(board.createdAt)}
        </p>

        {/* Количество задач */}
        {board._count && (
          <p className="text-gray-600 text-xs">
            {board._count.tasks} {getTaskWord(board._count.tasks)}
          </p>
        )}
      </div>
    </Link>
  );
}

// Формат даты
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ru-RU");
}

// Склонение слова "задача"
function getTaskWord(n: number): string {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;

  if (abs >= 11 && abs <= 19) return "задач";
  if (last === 1) return "задача";
  if (last >= 2 && last <= 4) return "задачи";
  return "задач";
}