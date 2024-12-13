
import styles from '@/styles/Authors.module.css';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Authors = () => {
  const { data, error } = useSWR('/api/authors', fetcher); 

  if (error) return <div>Error loading authors...</div>;
  if (!data) return <div>Loading authors...</div>;

  return (
    <div>
      <h2 className={styles.heading}>Authors List</h2>
      <div className={styles.authorsList}>
        {data.map((author) => (
          <div key={author.id} className={styles.authorItem}>
            <Link href={`/authors/${author._id.toString()}`}>
                
            <h3 className={styles.authorname}>{author.name}</h3>
              </Link>
            <p className={styles.authorbiography}>{author.biography}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authors;
