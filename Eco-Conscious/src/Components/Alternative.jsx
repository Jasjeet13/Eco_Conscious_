import React, { useEffect, useState } from "react";
import logo from "./download.png";
import axios from "axios";
import { Link } from "react-router-dom";

// The main Alternative component
const Alternative = ({ productId, category }) => {
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false); // State for drawer visibility

  // Fetch alternatives when the component mounts or when productId/category changes
  useEffect(() => {
    const fetchAlternatives = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/api/alternatives/${category}/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAlternatives(response.data); // Update state with alternatives
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message || "Failed to fetch alternatives"
            : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (productId && category) {
      fetchAlternatives();
    }
  }, [category, productId]); // Refetch when category or productId changes

  // Toggle drawer visibility
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  // Close the drawer
  const closeDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <div style={styles.container}>
      {/* Logo button to show alternatives */}
      <button
        style={styles.logoButton} // Styling for the logo button
        onClick={toggleDrawer} // Toggle alternatives on click
      >
        <img
          src={logo}
          alt="Logo"
          style={styles.logoImage} // Circle logo styling
        />
      </button>

      {/* Sliding drawer for alternatives */}
      <div
        style={{
          ...styles.drawer,
          right: showDrawer ? 0 : "-400px", // Conditional right value
        }}
      >
        <button style={styles.closeButton} onClick={closeDrawer}>
          &times;
        </button>
        <h3 style={styles.title}>You May Also Like</h3>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div style={styles.alternativeGrid}>
          {alternatives.length === 0 ? (
            <p>No alternatives found.</p>
          ) : (
            alternatives.map((product) => (
              <Link
                to={`/products/${product.category}/${product._id}`}
                key={product._id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={styles.alternativeCard}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={styles.alternativeImage}
                  />
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productPrice}>Price: ${product.price}</p>
                  <p style={styles.ecoScore}>EcoScore: {product.ecoScore}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Transparent black background overlay */}
      {showDrawer && <div style={styles.overlay} onClick={closeDrawer}></div>}
    </div>
  );
};

// Styles for the button, drawer, and alternatives section
const styles = {
  container: {
    // padding: "20px",
  },
  logoButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0",
  },
  logoImage: {
    width: "80px",
    height: "80px",
  },
  drawer: {
    position: "fixed",
    top: 0,
    right: "-500px", // Initially hidden off the screen
    width: "400px",
    height: "100%",
    backgroundColor: "#e7f5e1", // Light green background
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", // Drawer shadow
    padding: "20px",
    transition: "right 0.6s ease-in-out", // Slower, smooth slide-in transition
    zIndex: 1000, // Ensures it's above other content
    overflowY: "auto",
  },
  closeButton: {
    position: "absolute",
    top: "80px",
    left: "5px",
    background: "transparent",
    border: "none",
    fontSize: "30px",
    cursor: "pointer",
    color: "#333",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  alternativeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Responsive grid layout
    gap: "5px",
    marginLeft: "10px",
  },
  alternativeCard: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.3s ease",
    cursor: "pointer",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Card shadow for depth
  },
  alternativeImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  productName: {
    fontSize: "18px",
    color: "#333",
    margin: "0px 0px",
  },
  productPrice: {
    color: "#4CAF50",
    fontWeight: "bold",
    margin: "0px 0px",
  },
  ecoScore: {
    color: "#ff9800",
    fontWeight: "bold",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
};

export default Alternative;
