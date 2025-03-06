import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clears JWT token
    navigate("/");
  };

  return (
    <div className={styles.container}>
      {/* Background Effects */}
      <div className={styles.gradient}></div>
      <div className={styles.particles}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [1, 0.5, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header with Logout */}
      <motion.header
        className={styles.header}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <div className={styles.logo}>
          <span className={styles.vibe}>Vibe</span>
          <span className={styles.vision}>Vision</span>
        </div>

        <motion.button
          className={styles.logoutButton}
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
          <div className={styles.buttonGlow} />
        </motion.button>
      </motion.header>

      {/* Camera Section */}
      <main className={styles.cameraContainer}>
        <motion.div
          className={styles.cameraWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className={styles.title}>Live Camera Feed</h1>
          <Webcam
            className={styles.cameraFeed}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 640,
              height: 480,
              facingMode: "user",
            }}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
