import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Alternative = ({ productId, category }) => {
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h2>Alternatives</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div style={styles.alternativeGrid}>
        {alternatives.length === 0 ? (
          <p>No alternatives found.</p>
        ) : (
          alternatives.map((product) => (
            <Link
              to={`/products/${product.category}/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              >
            <div key={product._id} style={styles.alternativeCard}>
              <img
                src={product.image}
                alt={product.name}
                style={styles.alternativeImage}
              />
              <h3 style={styles.productName}>{product.name}</h3>
              <p>Price: ${product.price}</p>
              {/* Display the ecoScore below the price */}
              <p>EcoScore: {product.ecoScore}</p>
            </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  alternativeGrid: {
    display: "flex",
    // gridTemplateColumns: "repeat(3, 1fr)",
  },
  alternativeCard: {
    border: "2px solid green",
    borderRadius: "4px",
    padding: "10px",
    width: "330px",
    margin: "10px",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  alternativeImage: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  productName: {
    fontSize: "16px",
    color: "#333",
  },
};

export default Alternative;
