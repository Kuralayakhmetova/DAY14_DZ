import { useState } from "react";

function Header({ onAddBoard }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAddBoard({
      title,
      description,
    });

    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <>
      <header className="w-full bg-slate-800 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">
              TN
            </div>
            <span className="text-lg font-semibold">TaskNest</span>
          </div>

          <span className="text-gray-400 text-sm">
            Ваш центр управления задачами
          </span>

          <nav className="flex items-center gap-4 text-sm">
            <button className="text-gray-300 hover:text-white transition">
              Boards
            </button>
            <button className="text-gray-300 hover:text-white transition">
              Analytics
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md transition"
            >
              + New Board
            </button>
          </nav>
        </div>
      </header>

      {/* 🪟 МОДАЛЬНОЕ ОКНО */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 w-80">
            <h3 className="text-lg font-bold mb-3">Новая доска</h3>

            <input
              type="text"
              placeholder="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2 mb-2"
            />

            <textarea
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1"
              >
                Отмена
              </button>

              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;