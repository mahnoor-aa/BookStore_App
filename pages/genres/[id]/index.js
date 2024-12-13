import styles from '@/styles/Authors.module.css';
import Link from 'next/link';

const GenreBooksPage = ({ books, genreName }) => {
  return (
    <div>
      <h2 className={styles.heading}>Books in {genreName}</h2>
      {books.length > 0 ? (
        <div className={styles.authorsList}>
          <ul>
            {books.map((book) => (
              <li key={book._id} className={styles.authorItem}>
                <Link href={`/books/${book._id}`}>
                  <h3 className={styles.authorname}>{book.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No books found in this genre.</p>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  try {
    const res = await fetch(`http://localhost:3000/api/genres/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch books for genre ID ${id}`);
    }

    const { books, genreName } = await res.json();

    return {
      props: {
        books,
        genreName,
      },
    };
  } catch (error) {
    console.error('Error fetching books by genre:', error.message);

    return {
      props: {
        books: [],
        genreName: 'Unknown',
      },
    };
  }
};

export default GenreBooksPage;
