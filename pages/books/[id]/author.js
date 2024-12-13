import Author from '@/components/Author';
import styles from '@/components/Books.module.css';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthorDetails = ({ book }) => {
  const router = useRouter();
  const {user}=useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  const author = {
    name: book.author,
    biography: book.biography,
  };

  return (
    <div className={styles.mainContainer}>
      <Author key={book._id} author={author} />
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/books');
  const books = await res.json();

  const paths = books.map((book) => ({
    params: { id: book._id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/books/${params.id}`);
  const book = await res.json();

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
    revalidate: 10,
  };
}

export default AuthorDetails;
