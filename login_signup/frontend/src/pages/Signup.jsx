import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Signup.module.css"; // Import CSS Module

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // General error message
  const [passwordError, setPasswordError] = useState(""); // Password-specific error
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Client-side password validation
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    setPasswordError(""); // Clear password error
    setError(""); // Clear general error

    try {
      await axios.post("http://localhost:3000/user/signup", { name, email, password });
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error.response?.data || error.message);
      setError(error.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <input
              type="email"
              className={styles.inputField}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputContainer}>
          <input
            type="password"
            className={styles.inputField}
            placeholder={passwordError ? "Password must be at least 8 characters long." : "Password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
                if (e.target.value.length < 8) {
              setPasswordError(true);
                } else {
              setPasswordError(false);
                }
              }}
              required
            />

            {passwordError && <p className={styles.error}>{passwordError}</p>}
          </div>

          {error && <p className={styles.error}>{error}</p>} {/* General error message */}

          <button type="submit" disabled={!name || !email || password.length < 8}>
            Sign Up
          </button>
        </form>
        <a href="/login" className={styles.link}>Already have an account? Login</a>
      </div>
    </div>
  );
};

export default Signup;
