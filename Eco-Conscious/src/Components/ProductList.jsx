import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';


const ProductList = () => {
  
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryMapping = {
    beauty: 'Beauty',
    shoes: 'Shoes',
    mens: `men's clothing`,
    womens: `women's clothing`,
  };

  const normalizedCategory = categoryMapping[category.toLowerCase()] || category;

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(response => {
        const data = response.data;
        const filteredProducts = normalizedCategory === 'All' 
          ? data 
          : data.filter(product => product.category === normalizedCategory);
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [normalizedCategory]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return (
    <div style={styles.app}>
      <h2 style={styles.title}>
        {normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1)}
      </h2>
      <div style={styles.productGrid}>
        {products.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          products.map(product => (
            <Link to={`/products/${category}/${product._id}`} key={product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={styles.productCard}>
                <img src={product.image} alt={product.name} style={styles.productImage} />
                <h3 style={styles.productBrand}>{product.brand}</h3>
                <p style={styles.productName}>{product.name}</p>
                <div style={styles.rating}>{product.rating} ★★★★★ | {product.reviews} reviews</div>
                <div style={styles.price}>
                  <span>$ {product.price}</span>
                  {/* <del style={styles.originalPrice}> $ {product.originalPrice}</del> */}
                  <span style={styles.discount}>({product.discount}60% OFF)</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    margin: 0,
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    marginTop: '60px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    maxWidth: '1450px',
    margin: '0 auto',
  },
  productCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'hidden',
    textAlign: 'center',
    padding: '30px',
    height:"290px",
    transition: 'box-shadow 0.3s ease',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    paddingBottom:"40px"
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'contain',
    borderRadius: '8px',
  },
  productBrand: {
    fontSize: '16px',
    margin: '10px 0',
    color: '#333',
  },
  productName: {
    fontSize: '14px',
    color: '#777',
    margin: '5px 0',
  },
  rating: {
    fontSize: '14px',
    color: '#ff8c00',
    margin: '5px 0',
  },
  price: {
    fontSize: '16px',
    color: '#333',
    margin: '10px 0',
  },
  originalPrice: {
    color: '#999',
    marginLeft: '10px',
  },
  discount: {
    color: '#ff3b3b',
    marginLeft: '10px',
  },
};

export default ProductList;
