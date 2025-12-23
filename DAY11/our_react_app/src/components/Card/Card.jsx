/*************  ✨ Windsurf Command 🌟  *************/
import cardStyles from "./Card.module.scss";
import buttonStyles from "../Button/Button.module.scss";

function Card({ product }) {
  return (
    // TODO: Add card styles
    <div className={cardStyles.card}>
      <h1 className={cardStyles.h1}>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>Год выпуска: {product.year}</p>
      <p>Страна: {product.Country}</p>
      <br />
      <button className={buttonStyles.button}>Смотреть</button>
    </div>
  );
}
export default Card;
