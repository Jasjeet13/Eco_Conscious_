import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SecondaryNavbar from './SecondaryNavbar';
import Navbar from "./Navbar";

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(""); // To manage selected filter
  const [sortOption, setSortOption] = useState(""); // To manage sorting option

  const categoryMapping = {
    beauty: "Beauty Products",
    footwear: "Footwear",
    bags: "Bags",
    clothing: "Clothing",
  };

  const normalizedCategory = categoryMapping[category.toLowerCase()] || category;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const filteredProducts =
          normalizedCategory === "All"
            ? data
            : data.filter((product) => product.category === normalizedCategory);

        // Apply the filter and sort
        const filteredAndSortedProducts = filterProducts(filteredProducts);
        setProducts(filteredAndSortedProducts);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [normalizedCategory, filter, sortOption]); // Dependency on filter and sortOption

  // Filter products based on selected filter option
  const filterProducts = (products) => {
    if (!filter) return products;

    return products.filter((product) => {
      switch (filter) {
        case "low_carbon_footprint":
          return product.carbonFootprint < 10;
        case "material_sourcing_good":
          return product.materialSourcing === "good";
        case "material_sourcing_better":
          return product.materialSourcing === "better";
        case "material_sourcing_best":
          return product.materialSourcing === "best";
        case "high_recyclability":
          return product.recyclability >= 85;
        case "low_water_usage":
          return product.waterUsage === "low";
        case "high_energy_efficiency":
          return product.energyEfficiency === "high";
        case "high_biodegradability":
          return product.biodegradability > 90;
        default:
          return true;
      }
    });
  };

  // Sort products based on selected sorting option
  const sortProducts = (products) => {
    if (sortOption === "price_low_high") {
      return products.sort((a, b) => a.price - b.price); // Sort low to high
    } else if (sortOption === "price_high_low") {
      return products.sort((a, b) => b.price - a.price); // Sort high to low
    }
    return products;
  };

  // Apply both filter and sort
  const filteredAndSortedProducts = sortProducts(filterProducts(products));

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return (
    <div style={styles.app}>
      <Navbar />
      <SecondaryNavbar
        currentCategory={normalizedCategory}
        onSortSelect={(value) => setSortOption(value)} // Update sort option
        onFilterSelect={(value) => setFilter(value)} // Update filter option
      />
      <div style={styles.productGrid}>
        {filteredAndSortedProducts.length === 0 ? (
          <p>No products match the selected criteria.</p>
        ) : (
          filteredAndSortedProducts.map((product) => (
            <Link
              to={`/products/${category}/${product._id}`}
              key={product._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={styles.productCard}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.productImage}
                />
                <h3 style={styles.productBrand}>{product.brand}</h3>
                <p style={styles.productName}>{product.name}</p>
                <div style={styles.rating}>
                  {product.rating} ★★★★★ | {product.reviews} reviews
                </div>
                <div style={styles.price}>
                  <span>$ {product.price}</span>
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
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    margin: 0,
    padding: "20px",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    maxWidth: "1450px",
    margin: "0 auto",
  },
  productCard: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
    overflow: "hidden",
    textAlign: "center",
    padding: "30px",
    height: "290px",
    transition: "box-shadow 0.3s ease",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    paddingBottom: "40px",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "8px",
  },
  productBrand: {
    fontSize: "16px",
    margin: "10px 0",
    color: "#333",
  },
  productName: {
    fontSize: "14px",
    color: "#777",
    margin: "5px 0",
  },
};

export default ProductList;
