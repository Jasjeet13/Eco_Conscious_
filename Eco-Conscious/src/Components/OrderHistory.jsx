import React, { useState, useEffect } from 'react';


const styles = {
  container: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#f9fafb', // Light background for a soft look
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    marginTop: '80px',
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '700',
    color: '#333',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '900px',
    margin: '20px 0',
  },
  orderHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#444',
  },
  orderDetails: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '15px',
  },
  itemContainer: {
    display: 'flex',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fafafa',
    marginBottom: '15px',
    alignItems: 'center',
    gap: '20px',
  },
  imageContainer: {
    width: '150px',
    height: '150px',
    overflow: 'hidden',
    borderRadius: '10px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  productDetails: {
    flex: 1,
    color: 'black',
  },
  productName: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#222',
  },
  text: {
    fontSize: '16px',
    color: 'black',
    fontWeight: '550',
    marginBottom: '8px',
  },
  totalPrice: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#333',
    marginTop: '10px',
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
            <div style={styles.productDetails}>
              <h4>Order ID: {order._id}</h4>
              <p style={styles.text}>
                <strong>Order Date: </strong> {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p style={styles.text}>
                <strong>Total Price: </strong> ${order.totalPrice.toFixed(2)}
              </p><br />
            </div>
            {/* Order items displayed horizontally */}
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
                      <strong>Total: ${item.productId.price} * {item.quantity} = </strong> ${(item.productId ? item.quantity * item.productId.price : 0).toFixed(2)}
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