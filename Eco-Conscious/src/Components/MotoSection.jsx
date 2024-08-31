import React from "react";
import { FaLeaf, FaRecycle } from "react-icons/fa";

const MotoSection = () => {
  return (
    <div style={styles.container}>
      <div style={styles.backgroundOverlay}></div>
      <div style={styles.content}>
        <div style={styles.textContainer}>
          <h2 style={styles.heading}>Our Commitment to Sustainability</h2>
          <p style={styles.description}>
            At Eco-Conscious, we are dedicated to promoting a greener future by
            offering sustainable products and practices. Join us in making a
            positive impact on the planet.
          </p>
          <button style={styles.button}>Learn More</button>
        </div>
        <div style={styles.iconContainer}>
          <FaLeaf style={styles.icon} />
          <FaRecycle style={styles.icon} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "50vh",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(to right, #e0f2f1, #b9fbc0)", // Light gradient background
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.2)", // Dark overlay for better text contrast
    zIndex: 1,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
    padding: "0 20px",
  },
  textContainer: {
    flex: 1,
    padding: "20px",
    color: "#666", // Very light black for text
    zIndex: 2,
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    color: "#555", // Slightly lighter black for heading
    textAlign: "left",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  },
  description: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "#666", // Very light black for description
    textAlign: "left",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1.2rem",
    color: "#fff",
    backgroundColor: "#2e8b57", // Darker green
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  buttonHover: {
    backgroundColor: "#3cb371", // Slightly lighter green
    transform: "scale(1.05)",
  },
  iconContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "20px",
    position: "relative",
    zIndex: 2,
  },
  icon: {
    fontSize: "4rem",
    color: "#444", // Very light black for icons
    transition: "transform 0.3s ease, color 0.3s ease",
  },
  iconHover: {
    transform: "scale(1.2)",
    color: "#2e8b57", // Darker green for hover effect
  },
};

export default MotoSection;
