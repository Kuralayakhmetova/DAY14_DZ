function Header() {
  return (
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md transition">
            + New Board
          </button>
        </nav>
      </div>
    </header>
  );
}
export default Header;
