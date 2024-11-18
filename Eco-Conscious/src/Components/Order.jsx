import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const styles = {
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // Ensure the wrapper takes full viewport height
  },
  container: {
    flex: 1, // This makes the content grow to fill available space
    padding: "20px",
    height: "400px",
    backgroundColor: "#f0f8f4", // Light greenish background
    fontFamily: "'Arial', sans-serif",
  },
  footer: {
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    marginTop: "70px",
    textAlign: "center",
    marginBottom: "30px",
    fontWeight: "bold",
  },
  itemsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  itemContainer: {
    flex: "1 1 calc(50% - 20px)",
    maxWidth: "calc(40% - 22px)",
    display: "flex",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  imageContainer: {
    flex: 1,
    maxWidth: "150px",
    margin: "10px",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  productDetails: {
    flex: 3,
    marginLeft: "20px",
    color: "#333",
  },
  productName: {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "15px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    marginBottom: "8px",
  },
  responsiveContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
};

// Adding media query styles directly in React using JavaScript
const useResponsiveStyles = () => {
  const [responsiveStyles, setResponsiveStyles] = useState(styles.itemContainer);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 768) {
        // Small screens: Full width
        setResponsiveStyles({
          ...styles.itemContainer,
          flex: "1 1 100%",
          maxWidth: "100%",
        });
      } else if (screenWidth <= 1024) {
        // Medium screens: Two columns with smaller gaps
        setResponsiveStyles({
          ...styles.itemContainer,
          flex: "1 1 calc(50% - 10px)",
          maxWidth: "calc(50% - 10px)",
        });
      } else {
        // Large screens: Two columns
        setResponsiveStyles(styles.itemContainer);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return responsiveStyles;
};

const Order = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const responsiveStyles = useResponsiveStyles();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/order/${orderId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching order data");
        }

        const data = await response.json();
        setOrder(data.order);
      } catch (error) {
        setError("Error fetching order data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Your Order Details</h3>
      <div style={styles.responsiveContainer}>
        {order.items.map((item) => (
          <div key={item.productId} style={responsiveStyles}>
            {/* Left side - Image */}
            <div style={styles.imageContainer}>
              <img
                src={item.productId.image || "https://via.placeholder.com/150"}
                alt={item.productId.name}
                style={styles.image}
              />
            </div>

            {/* Right side - Product Details */}
            <div style={styles.productDetails}>
              <p style={styles.productName}>{item.productId.name}</p>
              <p style={styles.text}>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p style={styles.text}>
                <strong>Price:</strong> ${item.productId.price}
              </p>
              <p style={styles.text}>
                <strong>Total:</strong> ${(item.quantity * item.productId.price).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
