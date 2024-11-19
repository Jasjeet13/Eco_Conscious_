import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Alternative = () => {
  const [products, setProducts] = useState([]);
  const [alternatives, setAlternatives] = useState([]); // New state to store filtered alternatives
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch products from the backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);

        // Filter alternatives based on an 'ecoFriendly' flag (you can modify this logic)
        const ecoFriendlyAlternatives = data.filter(
          (product) => product.ecoFriendly === true // Example criterion
        );
        setAlternatives(ecoFriendlyAlternatives);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={styles.app}>
      <h1 style={styles.heading}>Find Your Green Alternative!</h1>
      <div style={styles.productGrid}>
        {alternatives.length > 0 ? (
          alternatives.map((product) => (
            <Link
              to={`/alternative-products/${product._id}`}
              key={product._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={styles.productCard}>
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.name}
                  style={styles.productImage}
                />
                <h3 style={styles.productBrand}>{product.brand}</h3>
                <p style={styles.productName}>{product.name}</p>
                <div style={styles.rating}>
                  {product.rating} ★★★★★ | {product.reviews} reviews
                </div>
                <div style={styles.price}>
                  <span>$ {product.price}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No alternative products found</p> // In case no alternatives are found
        )}
      </div>
    </div>
  );
};

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    margin: 0,
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    maxWidth: "1450px",
    margin: "0 auto",
  },
  productCard: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
    overflow: "hidden",
    textAlign: "center",
    padding: "20px",
    height: "330px", // Adjusted height for better flexibility
    transition: "box-shadow 0.3s ease",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "8px",
  },
  productBrand: {
    fontSize: "16px",
    margin: "10px 0",
    color: "#333",
  },
  productName: {
    fontSize: "14px",
    color: "#777",
    margin: "5px 0",
  },
  rating: {
    fontSize: "12px",
    color: "#555",
    margin: "5px 0",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "10px 0",
  },
};

export default Alternative;
