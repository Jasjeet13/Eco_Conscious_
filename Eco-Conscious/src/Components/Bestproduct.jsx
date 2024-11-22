import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BestProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:3000/api/bestproduct", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setBestProducts(response.data);
      } catch (error) {
        console.error("Error fetching best products:", error);
      }
    };

    fetchBestProducts();
  }, []);

  if (bestProducts.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.outer_container}>
      <h1>Best Eco-Friendly Products</h1>
      <div style={styles.container}>
        {bestProducts.map((product) => (
          <div
            key={product._id}
            style={styles.innerDiv}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Link
              to={`/products/${product.category}/${product._id}`}
              style={styles.link}
            >
              <div style={styles.imageContainer}>
                <img
                  src={product.image || "https://via.placeholder.com/250"} // Add a placeholder if no image
                  alt={product.name}
                  style={styles.image}
                />
              </div>
              <div style={styles.contentContainer}>
                <div style={styles.nameContainer}>
                  <h3 style={styles.name}>{product.name}</h3>
                </div>
                <div style={styles.priceContainer}>
                  <p style={styles.price}>${product.price}</p>
                </div>
                <div style={styles.ecoscoreContainer}>
                  <p style={styles.ecoscore}>Eco Score: {product.ecoScore}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  outer_container: {
    width: "100%",
    paddingTop: "10px",
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    width: "80%",
    justifyContent: "center",
    margin: "0 auto",
    paddingBottom: "40px",
  },
  innerDiv: {
    flex: "1 1 22%",
    minWidth: "250px",
    backgroundColor: "#f2f2f2",
    border: "1px solid #ccc",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    transition: "transform 0.3s ease",
  },
  imageContainer: {
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "contain",
  },
  contentContainer: {
    padding: "15px",
    backgroundColor: "#f2f2f2",
  },
  nameContainer: {
    marginBottom: "5px",
    height: "15px",
  },
  name: {
    fontSize: "16px",
    color: "#333",
  },
  priceContainer: {
    marginBottom: "10px",
    marginTop: "10px",
    height: "20px",
  },
  price: {
    fontSize: "16px",
    color: "black",
  },
  ecoscoreContainer: {
    marginBottom: "10px",
  },
  ecoscore: {
    fontSize: "14px",
    color: "green",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
};

export default BestProducts;
