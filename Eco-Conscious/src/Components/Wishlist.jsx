import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const styles = {
  container: {
    padding: '40px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  title: {
    fontSize: '32px',
    textAlign: 'center',
    marginTop: '50px',
    marginBottom: '30px',
    color: '#333',
    width: '100%',
  },
  wishlistItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '310px',
    height: '310px',
    padding: '10px',
    border: '1px solid #e0e0e0',
    // borderRadius: '8px',
    objectFit: 'contain',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    textAlign: 'center',
    position: 'relative',
  },
  wishlistItemHover: {
    transform: 'scale(1.02)',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'contain',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  name: {
    fontSize: '16px',
    fontWeight:"700",
    color: '#555',
    margin: '10px 0 5px',
  },
  price: {
    fontSize: '16px',
    color: '#888',
    fontWeight:"500",
  },
  description: {
    fontSize: '14px',
    color: '#777',
    marginTop: '10px',
    textAlign: 'center',
    padding: '0 10px',
  },
  cross: {
    position: 'absolute',
    top: '3px',
    right: '20px',
    fontSize: '25px',
    cursor: 'pointer',
    color: "#007F4E",
    transition: 'color 0.3s ease',
  },
  
  
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token'); 

      if (!token) {
        setError('User is not authenticated');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/wishlist', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError('Unauthorized access - Please log in again.');
          } else {
            setError('Failed to fetch wishlist data');
          }
          return;
        }

        const data = await response.json();
        setWishlistItems(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('An error occurred while fetching wishlist data');
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You need to log in first');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/wishlist/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error removing item: ${errorData.message}`);
      } else {
        alert('Item successfully removed from wishlist');
        setWishlistItems(prevItems => prevItems.filter(item => item.productId !== productId));
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      alert('Error removing item from wishlist');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Wishlist</h1>
      {wishlistItems.length > 0 ? (
        wishlistItems.map((item, index) => (
          <div
            key={item._id}
            style={{
              ...styles.wishlistItem,
              ...(hoveredItem === index ? styles.wishlistItemHover : {}),
            }}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span
              style={{
                ...styles.cross,
                ...(hoveredItem === index ? styles.crossHover : {}),
              }}
              onClick={() => handleRemoveFromWishlist(item.productId)}
            >
              &times;
            </span><Link to={`/products/${item.category}/${item.productId}`}
            style={{ textDecoration: "none", color: "inherit" }}>
    <img src={item.image} alt={item.name} style={styles.image} />
  
            <div style={styles.name}>{item.name}</div>
            <div style={styles.price}>${item.price}</div>
            {/* <div style={styles.description}>{item.description}</div> */}
            {/* <button style={styles.addButton}>Add to bag</button> */}
            </Link></div>
        ))
      ) : (
        <div>No items in your wishlist</div>
      )}
    </div>
  );
};
export default Wishlist;