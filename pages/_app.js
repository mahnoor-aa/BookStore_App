import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      document.body.className = savedTheme === "dark" ? "dark-mode" : "light-mode";
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme === "dark" ? "dark-mode" : "light-mode";
  };

  return (
    <AuthProvider>
      <Header darkMode={!darkMode} toggleTheme={toggleTheme} />
      <Component {...pageProps} darkMode={darkMode} />
    </AuthProvider>
  );
}
