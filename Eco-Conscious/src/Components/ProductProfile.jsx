import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './Navbar2';

const ProductProfile = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [hovered, setHovered] = useState(false); // Track hover state
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);

        // Check if the product is already in the wishlist
        const wishlistResponse = await fetch('http://localhost:3000/api/wishlist');
        const wishlistData = await wishlistResponse.json();
        setIsInWishlist(wishlistData.some(item => item.productId === data._id));
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToWishlist = async () => {
    if (isInWishlist) {
      alert("This item is already in your wishlist.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsInWishlist(true);
        alert(data.message);
        navigate('/wishlist');
      } else {
        alert('Error adding to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const styles = {
    container: {
      display: 'flex',
      padding: '60px 30px',
      maxWidth: '100%',
      margin: '0 auto',
      alignItems: 'flex-start',
    },
    imageGallery: {
      flex: '1',
      marginRight: '10px',
      marginTop: "40px"
    },
    productImage: {
      width: '600px',
      borderRadius: '12px',
      padding: "5px",
      objectFit: 'contain',
      height: '630px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    details: {
      padding: '40px',
      flex: '2',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    price: {
      fontSize: '28px',
      color: '#e63946',
      marginBottom: '15px',
    },
    reviews: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
    },
    stars: {
      color: '#ffcc00',
      marginRight: '15px',
      fontSize: '20px',
    },
    reviewsText: {
      color: '#333',
      fontSize: '18px',
    },
    description: {
      marginBottom: '25px',
      color: '#555',
      lineHeight: '1.8',
      fontSize: '18px',
    },
    stock: {
      marginBottom: '15px',
      fontSize: '18px',
    },
    productType: {
      marginBottom: '15px',
      fontSize: '18px',
    },
    cartOptions: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
    },
    quantityInput: {
      width: '70px',
      padding: '10px',
      marginRight: '30px',
      fontSize: '18px',
    },
    addToCartButton: {
      padding: '15px 30px',
      border: '1px solid #000',
      cursor: 'pointer',
      backgroundColor: '#fff',
      color: '#000',
      marginRight: '30px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '18px',
    },
    wishlistButton: {
      padding: '15px 30px',
      border: '1px solid #000',
      cursor: 'pointer',
      backgroundColor: '#fff',
      color: '#000',
      marginRight: '30px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '18px',
    },
    buyNowButton: {
      padding: "20px 40px",
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      width: '28%',
      marginTop: '30px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '25px',
    },
    heart: {
      margin: '0px 20px 0px 0px',
      fontSize: '24px',
      cursor: 'pointer',
      color: isInWishlist ? 'red' : hovered ? 'red' : '#ccc', // Conditional color
      transition: 'color 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <div><Navbar /></div>
      <div style={styles.imageGallery}>
        <img
          src={product.image || 'https://via.placeholder.com/600'}
          alt={product.name || 'Product'}
          style={styles.productImage}
        />
      </div>
      <div style={styles.details}>
        <h1 style={styles.title}>{product.name}</h1>
        <p style={styles.price}>${product.price}</p>
        <div style={styles.reviews}>
          <span style={styles.stars}>★★★★★</span>
          <a href="#reviews" style={styles.reviewsText}>
            3 reviews
          </a>
        </div>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.stock}>
          <strong>Availability:</strong> {product.inStock ? 'In stock' : 'Out of stock'}
        </p>
        <p style={styles.productType}>
          <strong>Product Type:</strong> {product.category}
        </p>

        <div style={styles.cartOptions}>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.quantityInput}
          />
          <button style={styles.addToCartButton}>
            <i className="fas fa-shopping-cart" style={styles.icon}></i>
            ADD TO CART
          </button>
          <button
            style={styles.wishlistButton}
            onClick={addToWishlist}
          >
            <i
              className="fas fa-heart"
              style={styles.heart}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            ></i>
            {isInWishlist ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
          </button>
        </div>
        <button style={styles.buyNowButton}>BUY IT NOW</button>
      </div>
    </div>
  );
};

export default ProductProfile;
