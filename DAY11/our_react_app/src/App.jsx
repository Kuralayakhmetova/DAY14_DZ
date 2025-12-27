import React from "react";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainDashboard from "./components/MainDashboard/MainDashboard.jsx";
import Card from "./components/Card/Card.jsx";
import { products as initialProducts } from "./data/product";
import { boards as initialBoards } from "./data/boards";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [boards, setBoards] = useState(initialBoards);
  const handleRemoveBoard = (id) => {
    setBoards((prev) => prev.filter((board) => board.id !== id));
  };

  const handleAddBoard = ({ title, description }) => {
    const newBoard = {
      id: Date.now(),
      title,
      description,
      date: new Date().toLocaleDateString(),
    };

    setBoards((prev) => [...prev, newBoard]);
  };

  return (
    <div className="flex m-5">
      <Sidebar />

      <div className="flex-1 flex flex-col m-5 ">
        <Header onAddBoard={handleAddBoard} />

        <MainDashboard boards={boards} onRemoveBoard={handleRemoveBoard} />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center items-center h-screen w-4/5 mx-auto">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
