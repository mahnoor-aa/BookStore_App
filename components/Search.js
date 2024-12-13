import { useEffect, useState } from 'react';
import styles from './Books.module.css';

const SearchHistory = ({ darkMode }) => {
  const [searchItem, setSearchItem] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await fetch('/api/user/history');
        const data = await response.json();
        setSearchHistory(data.map(item => item.searchTerm));
      } catch (error) {
        console.error('Error fetching search history:', error);
      }
    };
    fetchSearchHistory();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchItem) return;

    try {
      await fetch('/api/user/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm: searchItem }),
      });

      const updatedHistory = [searchItem, ...searchHistory.filter(term => term !== searchItem)].slice(0, 8);
      setSearchHistory(updatedHistory);
      setSearchItem('');
    } catch (error) {
      console.error('Error adding search term:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search"
          className={styles.searchInput}
        />
        <button
          className={darkMode ? styles.searchButtonLight : styles.searchButtonDark}
          type="submit"
        >
          Search
        </button>
      </form>

      <h3 className={styles.bookTitle}>Recent Searches</h3>
      <ul>
        {searchHistory.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
