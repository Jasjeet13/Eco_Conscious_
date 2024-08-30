import React from 'react';

const products = [
  {
    id: 1,
    name: "Boys Cotton Printed T-shirt",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150", // Placeholder image
    rating: 4.6,
    reviews: 894,
    price: 535,
    originalPrice: 799,
    discount: 33
  },
  {
    id: 2,
    name: "Opaque Casual Shirt",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150", // Placeholder image
    rating: 4.2,
    reviews: 21,
    price: 794,
    originalPrice: 1499,
    discount: 47
  },
  {
    id: 3,
    name: "Girls Ankle Length Dungarees",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150", // Placeholder image
    rating: 4.5,
    reviews: 152,
    price: 1324,
    originalPrice: 2499,
    discount: 47
  },
  {
    id: 4,
    name: "Girls T-shirt",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150", // Placeholder image
    rating: 4.1,
    reviews: 58,
    price: 450,
    originalPrice: 799,
    discount: 43
  },
  {
    id: 5,
    name: "Boys Cotton Hoodie",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150", // Placeholder image
    rating: 4.7,
    reviews: 128,
    price: 800,
    originalPrice: 1499,
    discount: 47
  },
  {
    id: 6,
    name: "Girls Printed Dress",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150", // Placeholder image
    rating: 4.3,
    reviews: 96,
    price: 899,
    originalPrice: 1699,
    discount: 47
  },
  {
    id: 7,
    name: "Boys Denim Jeans",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150", // Placeholder image
    rating: 4.4,
    reviews: 73,
    price: 749,
    originalPrice: 1499,
    discount: 50
  },
  {
    id: 8,
    name: "Girls Printed Skirt",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150", // Placeholder image
    rating: 4.6,
    reviews: 112,
    price: 699,
    originalPrice: 1299,
    discount: 46
  },
];

const ProductCard = ({ product }) => {
  return (
    <div style={styles.productCard}>
      <img src={product.image} alt={product.name} style={styles.productImage} />
      <h3 style={styles.productBrand}>{product.brand}</h3>
      <p style={styles.productName}>{product.name}</p>
      <div style={styles.rating}>{product.rating} ★ | {product.reviews}</div>
      <div style={styles.price}>
        <span>Rs. {product.price}</span>
        <del style={styles.originalPrice}>Rs. {product.originalPrice}</del>
        <span style={styles.discount}>({product.discount}% OFF)</span>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  return (
    <div style={styles.productGrid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const Products = () => {
  return (
    <div style={styles.app}>
      {/* <h1 style={styles.title}>Product Grid</h1> */}
      <ProductGrid />
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
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  productCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'hidden',
    textAlign: 'center',
    padding: '10px',
    transition: 'box-shadow 0.3s ease',
  },
  productCardHover: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  productImage: {
    maxWidth: '100%',
    height: 'auto',
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

export default Products;