import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        login(data.user, data.token); // Only pass user data (without password) and token
        router.push("/"); // Redirect to home page after successful login
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  

  return (
    <div className={styles.mainContainer}>
      <div className={styles.booksContainer}>
      <div className={styles.centerbox}>
        <h1>Login</h1>
        {error && <p className={styles.errorText}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                type="submit"
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <p className={styles.registerLink}>
            Don't have an account?{" "}
            <a href="/register" className={styles.linkText}>
              Register
            </a>
          </p>
        </div>
      </div>
    <div className={styles.imageContainer}>
    <img src="/bookimage.jpg" alt="Right Column Image" />
  </div>
    </div>
  );
};

export default Login;
