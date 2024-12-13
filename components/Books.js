import Link from 'next/link';
import styles from './Books.module.css';

export default function Books({ darkMode, book }) {
  return (
    <div className={styles.bookCard}>
      <h2 className={styles.bookTitle}>{book.title}</h2>
      <p className={styles.bookAuthor}>by {book.authorName}</p>
      <p className={styles.bookGenre}>
        <span style={{ color: 'inherit', fontWeight: 'bold' }}>Genre: </span>{book.genreName}
      </p>
      <p className={styles.bookPrice}>${book.price}</p>

      <Link href={`/books/${book._id}`}>
        <button className={darkMode ? styles.detailsButtonLight : styles.detailsButtonDark}>View Details</button>
      </Link>
    </div>
  );
}
