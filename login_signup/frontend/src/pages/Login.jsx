import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css"; // Import CSS Module

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Track errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset errors

    try {
      const response = await axios.post("http://localhost:3000/user/login", { 
        email, 
        password 
      });

      console.log("Login success:", response.data);

      // ✅ Fix: Store token & user details correctly
      localStorage.setItem("token", response.data.user.JWT);
      localStorage.setItem("name", response.data.user.name); // Store user name
      localStorage.setItem("email", response.data.user.email); // Store user email

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Login</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>} {/* Show errors */}
        
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            className={styles.inputField}  
            placeholder="Email"  
            value={email}  
            onChange={(e) => setEmail(e.target.value)}  
            required
          />

          <input  
            type="password"  
            className={styles.inputField}  
            placeholder="Password"  
            value={password}  
            onChange={(e) => setPassword(e.target.value)}  
            required
          />

          <button type="submit" className={styles.loginButton}>Login</button>
        </form>

        <a href="/signup" className={styles.link}>Don't have an account? Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
