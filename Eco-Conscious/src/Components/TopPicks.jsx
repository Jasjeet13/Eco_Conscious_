import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopPicks = () => {
  const [topPicks, setTopPicks] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null); // Track hovered button

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        const categories = {
          cosmetic: "Beauty Products",
          footwear: "Footwear",
          bag: "Bags",
          clothing: "Clothing",
        };

        const selectedPicks = Object.keys(categories).map((key) => {
          const productsInCategory = data.filter(
            (product) =>
              product.category?.toLowerCase() === key ||
              product.category === categories[key]
          );

          if (productsInCategory.length === 0) return null; // Skip empty categories
          const randomIndex = Math.floor(
            Math.random() * productsInCategory.length
          );
          return { ...productsInCategory[randomIndex], key };
        });

        setTopPicks(selectedPicks.filter((pick) => pick)); // Filter out nulls
      } catch (error) {
        console.error("Error fetching Top Picks:", error);
      }
    };

    fetchTopPicks();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Top Picks</h2>
      <div style={styles.grid}>
        {topPicks.map((product) => (
          <div
            key={product._id}
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <Link
              to={`/products/${product.category}/${product._id}`}
              style={styles.link}
            >
              <img
                src={product.image}
                alt={product.name}
                style={styles.image}
              />
              <h3 style={styles.name}>{product.name}</h3>
              <p style={styles.price}>${product.price}</p>
              <p style={styles.description}>{product.description}</p>
            </Link>
            <Link to={`/products/${product.key}`} style={styles.viewMoreLink}>
              <button
                style={{
                  ...styles.viewMoreButton,
                  backgroundColor:
                    hoveredButton === product._id ? "green" : "rgb(175 220 125)",
                }}
                onMouseEnter={() => setHoveredButton(product._id)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                View More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
    padding: "20px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "contain",
    marginBottom: "10px",
    borderRadius: "8px",
  },
  name: {
    fontSize: "16px",
    color: "#333",
  },
  price: {
    fontSize: "14px",
    color: "#777",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  viewMoreButton: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "rgb(175, 220, 125)", // Updated default color
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  viewMoreLink: {
    textDecoration: "none",
  },
};

export default TopPicks;
