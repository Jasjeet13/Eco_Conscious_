import React from "react";

const products = [
  {
    id: 1,
    name: "Boys Cotton Printed T-shirt",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150",
    rating: 4.6,
    reviews: 894,
    price: 535,
    originalPrice: 799,
    discount: 33,
  },
  {
    id: 2,
    name: "Opaque Casual Shirt",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150",
    rating: 4.2,
    reviews: 21,
    price: 794,
    originalPrice: 1499,
    discount: 47,
  },
  {
    id: 3,
    name: "Girls Ankle Length Dungarees",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150",
    reviews: 152,
    price: 1324,
    originalPrice: 2499,
    discount: 47,
  },
  {
    id: 4,
    name: "Girls T-shirt",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150",
    rating: 4.1,
    reviews: 58,
    price: 450,
    originalPrice: 799,
    discount: 43,
  },
  {
    id: 5,
    name: "Boys Cotton Hoodie",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150",
    rating: 4.7,
    reviews: 128,
    price: 800,
    originalPrice: 1499,
    discount: 47,
  },
  {
    id: 6,
    name: "Girls Printed Dress",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150",
    rating: 4.3,
    reviews: 96,
    price: 899,
    originalPrice: 1699,
    discount: 47,
  },
  {
    id: 7,
    name: "Boys Denim Jeans",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150",
    rating: 4.4,
    reviews: 73,
    price: 749,
    originalPrice: 1499,
    discount: 50,
  },
  {
    id: 8,
    name: "Girls Printed Skirt",
    brand: "United Colors of Benetton",
    image: "https://via.placeholder.com/150",
    rating: 4.6,
    reviews: 112,
    price: 699,
    originalPrice: 1299,
    discount: 46,
  },
];

const ProductCard = ({ product }) => {
  return (
    <div
      style={styles.productCard}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = styles.productCardHover.boxShadow;
        e.currentTarget.style.transform = styles.productCardHover.transform;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={styles.productImage}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = styles.productImageHover.transform;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
        }}
      />
      <h3 style={styles.productBrand}>{product.brand}</h3>
      <p style={styles.productName}>{product.name}</p>
      <div style={styles.price}>
        <span>Rs. {product.price}</span>
        <del style={styles.originalPrice}>Rs. {product.originalPrice}</del>
        <span style={styles.discount}>({product.discount}% OFF)</span>
      </div>
      <button
        style={styles.viewDetailsButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor =
            styles.viewDetailsButtonHover.backgroundColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor =
            styles.viewDetailsButton.backgroundColor;
        }}
      >
        View Details
      </button>
    </div>
  );
};

const ProductGrid = () => {
  return (
    <div style={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const Products = () => {
  return (
    <div style={styles.app}>
      <ProductGrid />
    </div>
  );
};

const styles = {
  app: {
    backgroundColor: "#f9f9f9",
    margin: 0,
    padding: "20px",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "30px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  productCard: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "20px",
    overflow: "hidden",
    textAlign: "center",
    padding: "20px",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    height: "auto",
    cursor: "pointer",
  },
  productCardHover: {
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-5px)",
  },
  productImage: {
    maxWidth: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    transition: "transform 0.3s ease",
  },
  productImageHover: {
    transform: "scale(1.05)",
  },
  productBrand: {
    fontSize: "20px",
    margin: "10px 0",
    color: "#333",
  },
  productName: {
    fontSize: "17px",
    color: "#555",
    margin: "5px 0",
  },
  price: {
    fontSize: "18px",
    color: "#333",
    margin: "10px 0",
  },
  originalPrice: {
    color: "#999",
    marginLeft: "10px",
    textDecoration: "line-through",
  },
  discount: {
    color: "#4caf50",
    marginLeft: "10px",
    fontWeight: "bold",
  },
  viewDetailsButton: {
    marginTop: "15px",
    padding: "12px 24px",
    backgroundColor: "#ace1af",
    color: "black",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  viewDetailsButtonHover: {
    backgroundColor: "#8fcf9a",
  },
};

export default Products;
