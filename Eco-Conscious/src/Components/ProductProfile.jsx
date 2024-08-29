import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductProfile = () => {
  const [quantity, setQuantity] = useState(1);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const styles = {
    container: {
      display: 'flex',
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      alignItems: 'flex-start',
    },
    imageGallery: {
      flex: '1',
      marginRight: '40px',
    },
    productImage: {
      width: '480px',
      borderRadius: '8px',
      height: '500px',
    },
    details: {
      padding: '30px',
      flex: '2',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    price: {
      fontSize: '20px',
      color: '#e63946',
      marginBottom: '10px',
    },
    reviews: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    stars: {
      color: '#ffcc00',
      marginRight: '10px',
    },
    reviewsText: {
      color: '#333',
    },
    description: {
      marginBottom: '20px',
      color: '#555',
      lineHeight: '1.6',
    },
    stock: {
      marginBottom: '10px',
    },
    productType: {
      marginBottom: '10px',
    },
    cartOptions: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    quantityInput: {
      width: '50px',
      padding: '5px',
      marginRight: '20px',
    },
    addToCartButton: {
      padding: '10px 20px',
      border: '1px solid #000',
      cursor: 'pointer',
      backgroundColor: '#fff',
      color: '#000',
      marginRight: '20px',
      display: 'flex',
      alignItems: 'center',
    },
    wishlistButton: {
      padding: '10px 20px',
      border: '1px solid #000',
      cursor: 'pointer',
      backgroundColor: '#fff',
      color: '#000',
      marginRight: '20px',
      display: 'flex',
      alignItems: 'center',
    },
    buyNowButton: {
      padding: '15px 30px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      width: '25%',
      marginTop: '20px',
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginRight: '10px',
      transition: 'color 0.3s, transform 0.3s',
    },
    faLayer: {
      marginRight: '10px',
      display: 'inline-block',
      position: 'relative',
    },
    plusIcon: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '0.6em',
      color: hoveredIcon === 'buyNow' ? '#fff' : '#000',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageGallery}>
        <img
          src="https://via.placeholder.com/500"
          alt="Product"
          style={styles.productImage}
        />
      </div>
      <div style={styles.details}>
        <h1 style={styles.title}>Belted chino trousers polo</h1>
        <p style={styles.price}>$191.00</p>
        <div style={styles.reviews}>
          <span style={styles.stars}>★★★★★</span>
          <a href="#reviews" style={styles.reviewsText}>
            3 reviews
          </a>
        </div>
        <p style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p style={styles.stock}>
          <strong>Availability:</strong> In stock (7 items)
        </p>
        <p style={styles.productType}>
          <strong>Product Type:</strong> T-Shirt
        </p>

        <div style={styles.cartOptions}>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.quantityInput}
          />
          <button
            style={styles.addToCartButton}
            onMouseEnter={() => setHoveredIcon('cart')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <i
              className={hoveredIcon === 'cart' ? 'fas fa-cart-plus' : 'fas fa-shopping-cart'}
              style={styles.icon}
            ></i>
            ADD TO CART
          </button>
          <button
            style={styles.wishlistButton}
            onMouseEnter={() => setHoveredIcon('wishlist')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <i
              className={hoveredIcon === 'wishlist' ? 'fas fa-heart' : 'far fa-heart'}
              style={styles.icon}
            ></i>
            ADD TO WISHLIST
          </button>
        </div>
        {/* </div> */}
        <button style={styles.buyNowButton}>
          BUY IT NOW
        </button>
      {/* </div> */}

      </div>
    </div>
  );
};

export default ProductProfile;