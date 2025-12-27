/*************  ✨ Windsurf Command 🌟  *************/
import cardStyles from "./Card.module.scss";
import buttonStyles from "../Button/Button.module.scss";

function Card({ product }) {
  return (
    // TODO: Add card styles
    <div className={cardStyles.card}>
      <h1 className={cardStyles.h1}>{product.title}</h1>
      <br />
      <img src={product.image} alt={product.title} />
      <h4>Год выпуска: {product.year}</h4>
      <p>Автор: {product.author}</p>

      <button className={buttonStyles.button}>📖 Читать</button>
    </div>
  );
}
export default Card;
