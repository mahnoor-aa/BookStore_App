import Books from "@/components/Books";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from 'react';

export default function AllBooks({ darkMode }) {
  const [books, setBooks] = useState([]);
  const [allGenres, setAllGenres] = useState(['All']);
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/books');
      const data = await res.json();

      console.log('Fetched books data:', data); 

      setBooks(data);

      const genres = ['All', ...new Set(data.map(book => book.genreName))];
      setAllGenres(genres);
    };

    fetchData();
  }, []);

  const filteredBooks = selectedGenre === 'All' ? books : books.filter(book => book.genreName === selectedGenre);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.booksContainer}>
        <h2 className={styles.heading}>All Books</h2>
        <div className={styles.filterContainer}>
          <label htmlFor="genreSelect" className={styles.filterLabel}>Filter by Genre:</label>
          <select
            id="genreSelect"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className={styles.filterDropdown}
          >
            {allGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.booksContainerGrid}>
          {filteredBooks.map((book) => {
            return (
              <Books
                darkMode={darkMode}
                key={book._id}
                book={book}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src="/bookimage.jpg" alt="Right Column Image" />
      </div>
    </div>
  );
}
