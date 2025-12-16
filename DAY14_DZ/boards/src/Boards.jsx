import { useState } from "react";

function Boards() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Учебная доска",
      description: "Доска для заданий и конспектов по React",
      createdAt: "2025-03-15",
    },
    {
      id: 2,
      title: "Рабочая доска",
      description: "Доска для заданий по JavaScript",
      createdAt: "2025-03-16",
    },
    {
      id: 3,
      title: "Личная доска",
      description: "Идеи и заметки",
      createdAt: "2025-03-17",
    },
  ]);

  // Добавление доски
  const handleAddBoard = () => {
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const createdAt = Date.parse(document.querySelector("#createdAt").value);

    const newBoard = {
      id: Date.now(),
      title: title,
      description: description,
      createdAt: new Date().toISOString().split("T")[0],
    };
    console.log(newBoard);
    new Date().toISOString().split("T")[0],
      setBoards((prevBoards) => [...prevBoards, newBoard]);
    document.getElementById("#title").value = "";
    document.getElementById("#description").value = "";
    document.getElementById("#createdAt").value = "";
  };

  //Удаление доски

  const handleRemoveBoard = (id) => {
    setBoards(boards.filter((board) => board.id !== id));
  };

  return (
    <div>
      <h1>Доски</h1>
      {boards.map((board) => (
        <div key={board.id} style={{ marginBottom: "16px" }}>
          <h2>{board.title}</h2>
          <p>{board.description}</p>
          <small>Создано: {board.createdAt}</small>
        </div>
      ))}
      <br />
      <input type="text" placeholder="Enter title" id="title" />
      <br />
      <input type="text" placeholder="Enter description" id="description" />
      <br />
      <input type="date" placeholder="Enter creation date" id="createdAt" />
      <br />
      <button onClick={handleAddBoard} id="handleAddBoard">
        Добавить доску
      </button>

      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            {board.title} {board.description} ({board.createdAt.toString()})
            <button onClick={() => handleRemoveBoard(board.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Boards;
