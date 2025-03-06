import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import Logo from "../components/Logo";
import featureImage from "../assets/image-4 1.png"; // Replace with your image path

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Background Effects */}
      <div className={styles.gradient}></div>
      <div className={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [1, 0.5, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Feature Image */}
      <motion.div
        className={styles.imageContainer}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img 
          src={featureImage} 
          alt="AI Emotion Detection" 
          className={styles.featureImage}
        />
        <div className={styles.imageOverlay} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className={styles.content}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Logo size="large" />
        </motion.div>

        {/* Animated description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className={styles.highlight}>AI-powered emotion recognition</span> that<br />
          analyzes facial expressions in real-time with<br />
          <span className={styles.highlight}>95.7% accuracy</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className={styles.buttonContainer}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.button
            className={styles.ctaButton}
            onClick={() => navigate("/signup")}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Start Emotional Analysis
            <motion.div
              className={styles.buttonGlow}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;