
import Link from 'next/link';
import styles from '@/styles/Authors.module.css';

const Info = () => {
  return (
  
    <div className={styles.container}>
    <h2 className={styles.heading}>Information Center</h2>
      <p className={styles.authorbiography}>Welcome to the Information Center! Here you can find answers to common questions and resources for further assistance.</p>
      <div className={styles.links}>
        <Link href="/info/faqs">
          <p className={styles.each}>FAQs - Frequently Asked Questions</p>
        </Link>
        <Link href="/info/support">
          <p className={styles.each}>Support - Help and Support Resources</p>
        </Link>
      </div>

    </div>
  );
};

export default Info;
