import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainDashboard from "./components/MainDashboard";
import Card from "./Card";

function App() {
  const products = [
    {
      id: 1,
      title: "Мажор в Дубае",
      Country: "Россия",
      year: 2025,
      image:
        "https://kinogo.rehab/uploads/mini/fullstory/823/fd8b2562b0c8353c06b249ece3ddd.webp",
    },
    {
      id: 2,
      title: "Интервью убийцы",
      Country: "Южная Корея",
      year: 2025,
      image:
        "https://kinogo.rehab/uploads/mini/fullstory/47a/d761e2d463d339ac6e191734b2002.webp",
    },
    {
      id: 3,
      title: "Инструкция не прилагается",
      Country: "Россия",
      year: 2024,
      image:
        "https://kinogo.rehab/uploads/mini/fullstory/4a5/6b090fe10c2077ff5fe671961e0ce.webp",
    },
    {
      id: 4,
      title: "Нюрнберг",
      Country: "Венгрия",
      year: 2025,
      image:
        "https://kinogo.rehab/uploads/mini/fullstory/d0d/c5fc7b743807975154ef0b40418bc.webp",
    },
    {
      id: 5,
      title: "Стервятники ",
      Country: "Франция",
      year: 2025,
      image:
        "https://kinogo.rehab/uploads/mini/fullstory/51f/0798411dbc01ef3f1cd6040748177.webp",
    },
    {
      id: 6,
      title: "Бессмертный: Кровавая дорога домой",
      Country: "Великобритания",
      year: 2025,
      image:
        "https://kinogo.rehab/uploads/mini/fullstory/f64/0ff40308fb8e702096a5942e189d3.webp",
    },
    {
      id: 7,
      title: "Вниз ",
      Country: "Россия",
      year: 2025,
      image:
        "https://kinogo.rehab/uploads/mini/fullstory/006/f4fd0a2b47ffd1a4489522e320dcb.webp",
    },
    {
      id: 8,
      title: "Ксено",
      Country: "США",
      year: 2025,
      image:
        "https://kinogo.rehab/uploads/mini/fullstory/f1a/63839769de53a8ee1099527dd288c.webp",
    },
  ];

  const [boards] = useState([
    { id: 1, title: "Мой проект", description: "Описание проекта" },
    { id: 2, title: "Учеба", description: "Домашние задания" },
  ]);

  return (
    <div className="flex m-5">
      <Sidebar />
      <div className="flex-1 flex flex-col m-5 ">
        <Header />
        <MainDashboard boards={boards} />
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

