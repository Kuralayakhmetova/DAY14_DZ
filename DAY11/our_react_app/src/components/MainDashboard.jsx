/*************  ✨ Windsurf Command 🌟  *************/

function MainDashboard({ boards }) {
  return (
    <div>
      <main className="border rounded-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">ГЛАВНАЯ ПАНЕЛЬ</h2>

        <div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Boards</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {boards.map((board) => (
                <div
                  key={board.id}
                  className="
            bg-slate-800
            border
            rounded-xl
            p-4
            flex
            flex-col
            transition
            hover:border-blue-500
            hover:shadow-lg
          "
                >
                  <h2 className="text-lg text-white font-semibold mb-2">
                    {board.title}
                  </h2>
                  <p className="text-slate-400 text-sm">{board.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-700 p-4 mt-6 rounded-lg">
            <section>
              <div className="rounded-lg text-center">
                <h1 className="text-white text-center font-bold">Кино</h1>
                <p className="text-gray-200 text-center">НОВИНКИ</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
  /*******  6f248ea5-ecb0-461b-b8e6-5fe27408db10  *******/
}

export default MainDashboard;
