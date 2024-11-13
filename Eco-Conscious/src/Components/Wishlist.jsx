import React, { useState, useEffect } from 'react';
import Navbar from './Navbar2';
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/wishlist');
        const data = await response.json();
        console.log("Fetched wishlist data:", data);
        setWishlist(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  // Function to handle item removal
  const handleRemoveItem = async (id) => {
    try {
      // Remove from UI first
      setWishlist(wishlist.filter(item => item._id !== id));
  
      // Make API request to remove from database
      const response = await fetch(`http://localhost:3000/api/wishlist/remove/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error removing item: ${errorData.message}`);
      } else {
        alert('Item successfully removed from wishlist');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      alert('Error removing item from wishlist');
    }
  };

  if (wishlist.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#888' }}>Your wishlist is empty.</div>;
  }

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
      marginBottom: '30px',
      color: '#333',
      width: '100%',
    },
    wishlistItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '370px',
      height: '440px',
      padding: '10px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      objectFit: 'contain',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
      textAlign: 'center',
      position: 'relative',  // Make sure to position the cross icon inside the item container
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
      fontSize: '20px',
      color: '#555',
      margin: '10px 0 5px',
    },
    price: {
      fontSize: '16px',
      color: '#888',
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
      top: '10px',
      right: '10px',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#888',
      transition: 'color 0.3s ease',
    },
    crossHover: {
      color: 'red',
    },
    addButton: {
        backgroundColor:'rgb(146 221 151)',  // Tomato color
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        marginBottom: '10px',
        fontSize: '16px',
      },
      addButtonHover: {
        backgroundColor: 'green',  // Darker red on hover
      },
  };

  return (
    <div style={{ padding: '20px' }}>
        <div style={{marginTop:'80px'}}><Navbar></Navbar></div>
      <h1 style={styles.title}>Your Wishlist Item's</h1>
      <div style={styles.container}>
        {wishlist.map((item) => (
          <div
            key={item._id}
            style={styles.wishlistItem}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {/* Cross Icon to remove item */}
            <span
              style={styles.cross}
              onClick={() => handleRemoveItem(item._id)}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'red')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
            >
              &times;
            </span>

            <img src={item.image} alt={item.name} style={styles.image} />
            <h3 style={styles.name}>{item.name}</h3>
            <p style={styles.price}>Price: ${item.price}</p>
            <p style={styles.description}>{item.description || 'No description available'}</p>
            <button
              style={styles.addButton}
              onClick={() => addToBag(item)}  
            >
              Add to Bag
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
