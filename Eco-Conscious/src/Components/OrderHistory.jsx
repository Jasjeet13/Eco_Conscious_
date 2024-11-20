import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f0f8f4', // Light greenish background
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    fontSize: '28px',
    marginTop: '70px',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  orderContainer: {
    marginBottom: '30px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  itemContainer: {
    display: 'flex',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    marginBottom: '10px',
  },
  imageContainer: {
    flex: 1,
    maxWidth: '150px',
    margin: '10px',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  productDetails: {
    flex: 3,
    marginLeft: '20px',
    color: '#333',
  },
  productName: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  text: {
    fontSize: '16px',
    marginBottom: '8px',
  },
};

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/order-history', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();  // Log detailed error response
          console.error(errorData);
          throw new Error('Failed to fetch order history');
        }

        const data = await response.json();
        setOrderHistory(data.orders);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (orderHistory.length === 0)
    return <div style={styles.container}><h3 style={styles.heading}>No orders found</h3></div>;

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Your Order History</h3>
      <div style={styles.itemsContainer}>
        {orderHistory.map((order) => (
          <div key={order._id} style={styles.orderContainer}>
            <h4>Order ID: {order._id}</h4>
            <p style={styles.text}>
              <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
            </p>
            <p style={styles.text}>
              <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <div>
              {order.items.map((item) => (
                <div key={item.productId?._id} style={styles.itemContainer}>
                  {/* Left side - Image */}
                  <div style={styles.imageContainer}>
                    <img
                      // Safely access image property with optional chaining
                      src={item.productId?.image || "https://via.placeholder.com/150"}
                      alt={item.productId?.name || "Image not available"}
                      style={styles.image}
                    />
                  </div>

                  {/* Right side - Product Details */}
                  <div style={styles.productDetails}>
                    <p style={styles.productName}>{item.productId?.name || "Product unavailable"}</p>
                    <p style={styles.text}>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p style={styles.text}>
                      <strong>Price:</strong> ${item.productId?.price || "N/A"}
                    </p>
                    <p style={styles.text}>
                      <strong>Total:</strong> ${(item.productId ? item.quantity * item.productId.price : 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
