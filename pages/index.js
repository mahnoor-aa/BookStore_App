import { useAuth } from "@/context/AuthContext";
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

export default function Main({ darkMode, books }) {
  const router = useRouter();
  const { user, logout } = useAuth(); 
  console.log("User in Main component:", user);

  const handleHome = () => {
    router.push("/home"); 
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.booksContainer}>
        <div className={styles.centerbox}>
          <h1>Welcome to BookStore</h1>
          {user ? (
            <>
              <span className={styles.userEmail}>{user.name}</span>
              <button
                className={darkMode ? styles.mainButtonLight : styles.mainButtonDark}
                onClick={handleHome}
              >
                Explore Books
              </button>
            </>
          ) : (
            <button
              className={darkMode ? styles.mainButtonLight : styles.mainButtonDark}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src="/bookimage.jpg" alt="Right Column Image" />
      </div>
    </div>
  );
}
