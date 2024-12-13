import Books from "@/components/Books";
import styles from "@/styles/Home.module.css";
import localFont from "next/font/local";
import { useRouter } from "next/router";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home({ darkMode, books }) {
  const router = useRouter();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.booksContainer}>
        <h2 className={styles.heading}>Featured Books</h2>
        <div className={styles.booksContainerGrid}>
          {books.map((book) => (
            <Books darkMode={darkMode} key={book._id} book={book} />
          ))}
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src="/bookimage.jpg" alt="Right Column Image" />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000/api/books');
    const books = await res.json();

    const featuredBooks = books.filter(book => book.featured === 1);

    if (!featuredBooks.length) {
      return {
        notFound: true,
      };
    }

    return {
      props: { books: featuredBooks },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching books from API:", error);
    return {
      props: { books: [] },
    };
  }
}
