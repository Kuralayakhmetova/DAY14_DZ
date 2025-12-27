import styles from "./BoardCard.module.scss";

function BoardCard({ title, description, date, onRemoveBoard }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>📚</span>
        <h3>{title}</h3>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.footer}>
        <span className={styles.date}>{date}</span>
        <button onClick={onRemoveBoard} className={styles.delete}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default BoardCard;
