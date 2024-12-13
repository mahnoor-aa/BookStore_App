import Link from 'next/link';
import styles from './Books.module.css';

export default function BooksDetailsInfo({ darkMode, book, reviews = [] }) {
  return (
    <div className={styles.bookDetailCard}>
      <h2 className={styles.bookTitle}>{book.title}</h2>
      <p className={styles.bookAuthor}>by {book.author}</p>
      <p className={styles.bookDescription}>{book.description}</p>
      <p className={styles.bookGenre}>
        <span style={{ color: 'inherit', fontWeight: 'bold' }}>Genre: </span>{book.genre}
      </p>
      <p className={styles.bookPrice}>
        <span style={{ color: 'inherit', fontWeight: 'bold' }}>Price: $</span>{book.price}
      </p>
      <p className={styles.bookPrice}>
        <span style={{ color: 'inherit', fontWeight: 'bold' }}>Rating: </span>{book.rating}
      </p>

      <Link href={`/books/${book._id}/author`}>
        <button className={darkMode ? styles.authorButtonLight : styles.authorButtonDark}>View Author Details</button>
      </Link>

      <h2 className={styles.bookReviews}>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={styles.noBullets}>
          {reviews.map(review => (
            <li key={review._id} className={styles.bookDescription}>
              <div className={styles.reviewContent}>
                <span>{review.comment}</span>
                <span className={styles.rating}>Rating: {review.rating}</span>
              </div>
              <div className={styles.reviewAuthor}>
                - by {review.user.name} ({review.user.email})
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}
