import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(name, email, password);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.booksContainer}>
      <div className={styles.centerbox}>
        <h1>Register</h1>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
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
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <p className={styles.registerLink}>
        Already have an account?{" "}
          <a href="/login"  className={styles.linkText}>
            Login
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

export default Register;
