"use client";

import { useEffect, useState } from "react";
import { apiGetBoards } from "@/lib/api";
import type { Board, BoardsResponse, BoardsQuery } from "@/types";
import BoardCard from "@/components/BoardCard";
import BoardFilters from "@/components/BoardFilter";

export default function HomePage() {
  const [response, setResponse] = useState<BoardsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentQuery, setCurrentQuery] = useState<BoardsQuery>({ page: 1 });

  // Загружаем доски
  useEffect(() => {
    loadBoards(currentQuery);
  }, [currentQuery]);

  async function loadBoards(query: BoardsQuery) {
    setLoading(true);
    setError("");

    try {
      const data = await apiGetBoards(query);
      setResponse(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Не удалось загрузить доски",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleFilter(query: BoardsQuery) {
    setCurrentQuery(query);
  }

  function handlePageChange(page: number) {
    setCurrentQuery((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Заголовок */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Все доски</h1>
        <p className="text-gray-500 mt-1">
          {response ? `Найдено ${response.meta.total} досок` : ""}
        </p>
      </div>

      {/* Фильтры */}
      <BoardFilters onFilter={handleFilter} loading={loading} />

      {/* Ошибка */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => loadBoards(currentQuery)}
            className="mt-3 text-blue-400 hover:underline text-sm"
          >
            Попробовать снова
          </button>
        </div>
      )}

      {/* Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 h-40 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Контент */}
      {!loading && !error && response && (
        <>
          {response.data.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-gray-400">Доски не найдены</p>
              <button
                onClick={() => handleFilter({ page: 1 })}
                className="mt-3 text-blue-400 hover:underline text-sm"
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <>
              {/* Список досок */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {response.data.map((board: Board) => (
                  <BoardCard key={board.id} board={board} />
                ))}
              </div>

              {/* Пагинация */}
              {response.meta.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() => handlePageChange(response.meta.page - 1)}
                    disabled={!response.meta.hasPrevPage}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors text-sm"
                  >
                    ← Назад
                  </button>

                  <span className="text-gray-400 text-sm px-3">
                    {response.meta.page} из {response.meta.totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(response.meta.page + 1)}
                    disabled={!response.meta.hasNextPage}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors text-sm"
                  >
                    Вперёд →
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}