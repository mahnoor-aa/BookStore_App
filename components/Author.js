import styles from './Books.module.css';

export default function Author({ author }) {
  return (
    <div className={styles.bookDetailCard}>
      <p className={styles.bookTitle}>{author.name}</p>
      <p className={styles.bookDescription}>{author.biography}</p>
    </div>
  );
}
