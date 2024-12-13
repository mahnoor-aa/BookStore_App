import styles from '@/styles/Authors.module.css';
import Link from 'next/link';

const GenresPage = ({ genres }) => {
  return (
    <div>
      <h2 className={styles.heading}>Book Genres</h2>
      <div className={styles.authorsList}>
        <ul>
          {genres.map((genre) => (
            <li key={genre._id} className={styles.authorItem}>
              <Link href={`/genres/${genre._id.toString()}`}>
                <h3 className={styles.authorname}>{genre.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/genres');
    if (!res.ok) {
      throw new Error('Failed to fetch genres');
    }

    const genres = await res.json();

    return {
      props: {
        genres,
      },
    };
  } catch (error) {
    console.error('Error fetching genres:', error.message);

    return {
      props: {
        genres: [],
      },
    };
  }
};

export default GenresPage;
