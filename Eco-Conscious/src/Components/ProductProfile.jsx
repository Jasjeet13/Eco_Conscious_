import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductProfile = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const styles = {
    container: {
      display: 'flex',
      padding: '20px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageGallery: {
      marginRight: '20px',
    },
    productImage: {
      width: '300px',
      height: 'auto',
    },
    details: {
      maxWidth: '500px',
    },
    title: {
      fontSize: '24px',
      margin: '16px 0',
    },
    price: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    reviews: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    stars: {
      color: '#FFD700',
      marginRight: '10px',
    },
    reviewsText: {
      color: '#555',
      textDecoration: 'none',
    },
    description: {
      fontSize: '16px',
      marginBottom: '20px',
    },
    stock: {
      marginBottom: '20px',
    },
    productType: {
      marginBottom: '20px',
    },
    cartOptions: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    quantityInput: {
      width: '50px',
      marginRight: '10px',
    },
    addToCartButton: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '10px 20px',
      marginRight: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    wishlistButton: {
      backgroundColor: '#ffc107',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buyNowButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageGallery}>
        <img src={product.image} alt={product.name} style={styles.productImage} />
      </div>
      <div style={styles.details}>
        <h1 style={styles.title}>{product.name}</h1>
        <p style={styles.price}>${product.price}</p>
        <div style={styles.reviews}>
          <span style={styles.stars}>★★★★★</span>
          <a href="#reviews" style={styles.reviewsText}>3 reviews</a>
        </div>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.stock}><strong>Availability:</strong> {product.inStock ? 'In stock' : 'Out of stock'}</p>
        <p style={styles.productType}><strong>Product Type:</strong> {product.category}</p>

        <div style={styles.cartOptions}>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.quantityInput}
          />
          <button style={styles.addToCartButton}>
            ADD TO CART
          </button>
          <button style={styles.wishlistButton}>
            ADD TO WISHLIST
          </button>
        </div>
        <button style={styles.buyNowButton}>
          BUY IT NOW
        </button>
      </div>
    </div>
  );
};

export default ProductProfile;
