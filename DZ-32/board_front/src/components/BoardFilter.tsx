'use client';

import { useState } from 'react';
import type { BoardsQuery } from '@/types';

interface Props {
  onFilter: (query: BoardsQuery) => void;
  loading: boolean;
}

export default function BoardFilters({ onFilter, loading }: Props) {
  const [title, setTitle] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'createdAt'>('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const query: BoardsQuery = { page: 1 };

    if (title.trim()) query.title = title.trim();
    query.sortBy = sortBy;
    query.order = order;

    onFilter(query);
  }

  function handleReset() {
    setTitle('');
    setSortBy('createdAt');
    setOrder('desc');
    onFilter({ page: 1 });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        
        {/* Поиск по названию */}
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Поиск по доскам..."
          className="bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
        />

        {/* Сортировка */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'title' | 'createdAt')}
          className="bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="createdAt">По дате</option>
          <option value="title">По названию</option>
        </select>

        {/* Порядок */}
        <select
          value={order}
          onChange={e => setOrder(e.target.value as 'asc' | 'desc')}
          className="bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="desc">Сначала новые</option>
          <option value="asc">Сначала старые</option>
        </select>
      </div>

      {/* Кнопки */}
      <div className="flex gap-2 mt-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm px-5 py-2 rounded-lg transition-colors"
        >
          {loading ? 'Поиск...' : 'Найти'}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-5 py-2 rounded-lg transition-colors"
        >
          Сбросить
        </button>
      </div>
    </form>
  );
}