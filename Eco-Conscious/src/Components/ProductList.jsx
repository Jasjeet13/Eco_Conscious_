import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryMapping = {
    beauty: 'Beauty',
    shoes: 'Shoes',
    mens: `men's clothing`,
    womens: `women's clothing`
    // Add other categories as needed
  };

  const normalizedCategory = categoryMapping[category.toLowerCase()] || category;

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(response => {
        const data = response.data;
        const filteredProducts = normalizedCategory === 'All' ? data : data.filter(product => product.category === normalizedCategory);
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
    <div>
      <h2>{normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1)} Products</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
      }}>
        {products.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          products.map(product => (
            <Link to={`/products/${category}/${product._id}`} key={product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                border: '1px solid #ccc',
                padding: '16px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}>
                <img src={product.image} alt={product.name} style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }} />
                <h3 style={{
                  fontSize: '18px',
                  margin: '8px 0',
                }}>{product.name}</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#555',
                }}>{product.description}</p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}>Price: ${product.price}</p>
                <p style={{
                  fontSize: '14px',
                  color: '#777',
                }}>Category: {product.category}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
