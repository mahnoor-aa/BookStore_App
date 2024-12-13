import styles from '@/styles/Authors.module.css';
import Link from 'next/link';

const AuthorDetails = ({ author }) => {
  if (!author) return <div>Error loading author details...</div>;

 
  return (
    <div>
      <h2 className={styles.heading}>Books by {author.name}</h2>
      {author.books.length > 0 ? (
        <div className={styles.authorsList}>
          <ul>
            {author.books.map((book) => (
              <li key={book._id} className={styles.authorItem}>
                <Link href={`/books/${book._id}`}>
                  <h3 className={styles.authorname}>{book.title}</h3>
                  <p className={styles.authorbiography}>{book.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No books found by this author.</p>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
  
    const res = await fetch(`http://localhost:3000/api/authors/${id}`);
    const authorData = await res.json();
  
    return {
      props: { author: authorData }, 
    };
  }

export default AuthorDetails;
