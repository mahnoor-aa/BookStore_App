
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Authors.module.css';

const InfoPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const render = () => {
    if (!slug) {
      return <p>Welcome to the Info section. Choose a topic below.</p>;
    }

    const slugPath = slug.join('/');
    switch (slugPath) {
      case 'faqs':
        return <p>Here are the Frequently Asked Questions.</p>;
      case 'support':
        return <p>Support.</p>;
      default:
        return <p>Other Information: {slugPath}</p>;
    }
  };

  return (
  

    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/info/faqs">FAQs</Link> |{'  '}
        <Link href="/info/support">Support</Link>|{'  '}
        <Link href="/info/other">Other Information</Link>
      </nav>
      <div className={styles.content}>
        {render()}
      </div>
      </div>
  );
};

export default InfoPage;
