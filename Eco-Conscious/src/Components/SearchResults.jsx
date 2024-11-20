import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import SecondaryNavbar from "./SecondaryNavbar";

const SearchResults = () => {
  const { term } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(`http://localhost:3000/api/search/${term}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message || "Failed to fetch products"
            : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [term]);

  if (loading) return <p>Loading search results...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.outerContainer}>
      <SecondaryNavbar currentCategory={`${term}`} /> 
    <div style={styles.app}>

      <div style={styles.productGrid}>
        {products.length === 0 ? (
          <p>No products found for "{term}".</p>
        ) : (
          products.map((product) => (
            <Link
              to={`/products/${product.category}/${product._id}`}
              key={product._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={styles.productCard}>
                <img
                  src={product.image || "placeholder.png"} // Fallback to placeholder if no image
                  alt={product.name}
                  style={styles.productImage}
                />
                {/* <h3 style={styles.productBrand}>{product.brand || "Brand"}</h3> */}
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
        )}
      </div>
    </div>
    </div>
  );
};

const styles = {
  outerContainer:{
    backgroundColor: "#f9f9f9",
  },

  app: {
    fontFamily: "Arial, sans-serif",
    // margin: 0,
    padding: "20px",
    width : "75%",
    margin : "0 auto"
    
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Responsive grid
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
    padding: "30px",
    height: "290px",
    transition: "box-shadow 0.3s ease",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    paddingBottom: "40px",
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
    margin: "10px 0",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
  },
};

export default SearchResults;
