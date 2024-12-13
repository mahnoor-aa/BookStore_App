import styles from '@/components/Books.module.css';
import BookDetailsInfo from "@/components/BooksDetailInfo";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BookDetails = ({ darkMode, book, reviews }) => {
  const router = useRouter();
  const {user}=useAuth();
  const { id } = router.query;

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <BookDetailsInfo darkMode={darkMode} key={book._id} book={book} reviews={reviews} />
    </div>
  );
};
export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/books');
  const books = await res.json();
  const paths = books.map(book => ({
    params: { id: book._id },
  }));

  return {
    paths,
    fallback: false, 
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/books/${params.id}`);
  const book = await res.json();

  return {
    props: { book, reviews: book.reviews  },
  };
}

export default BookDetails;