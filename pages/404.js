
import Link from 'next/link';
import styles from '@/styles/Error.module.css'; 

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>The page you're looking for doesn't exist.</p>
      <Link href="/" className={styles.link}>Go back to Home</Link>
    </div>
  );
};

export default Custom404;
