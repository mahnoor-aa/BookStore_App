import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.css";

export default function Header({ darkMode, toggleTheme }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); 
    router.push("/login"); 
  };

  return (
    <header className={darkMode ? styles.navbarDark : styles.navbarLight}>
      <div className={styles.logo}>
        <Link href="/">BookStore</Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <li><Link href="/books">All Books</Link></li>
          <li>
            <button onClick={() => router.push("/genres")} className={styles.genreButton}>
              Genres
            </button>
          </li>
          <li><Link href="/authors">Authors</Link></li>
          <li><Link href="/search">Search</Link></li>
       
        {user ? (
          <>
            <span className={styles.userEmail}>Logged in as: {user.email}</span>
            <button className={styles.genreButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className={styles.genreButton} onClick={() => router.push("/login")}>
            Login
          </button>
        )}
         </ul>
        <button className={styles.genreButton} onClick={toggleTheme}>
          {darkMode ? "Dark-Mode" : "Light-Mode"}
        </button>
      </nav>
    </header>
  );
}
