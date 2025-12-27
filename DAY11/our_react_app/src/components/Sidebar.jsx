function Sidebar() { 
  return (
    <div className=" bg-slate-800 px-4 py-3 mt-5 min-h-[110vh]">
      <aside className="p-5 border-l border-gray-300 text-center box-border rounded-lg">
        <h2 className="text-lg font-bold mb-4 underline text-white">Меню</h2>
        <ul className="flex flex-col gap-2 text-center">
          <li className="text-white hover:text-yellow-400 transition"> Все задачи</li>
          <li className="text-white hover:text-yellow-400 transition">Важное</li>
          <li className="text-white hover:text-yellow-400 transition">Завершённые</li>
          <li className="text-white hover:text-yellow-400 transition">Настройки</li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
