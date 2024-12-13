import styles1 from '@/components/Books.module.css';
import Search from '@/components/Search';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/Authors.module.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SearchPage = ({ darkMode }) => {
  const { user } = useAuth(); 
  const router = useRouter(); 

  useEffect(() => {
    if (!user) {
      router.push('/login'); 
    }
  }, [user, router]);

  if (!user) {
    return null; 
  }

  return (
    <div>
      <h2 className={styles.heading1}>Search Page</h2>
      <div className={styles1.mainContainer}>
        <div className={styles1.bookDetailCard}>
          <Search darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
