import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SecondaryNavbar from "./SecondaryNavbar";
import Navbar from "./Navbar";

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

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

        const filteredAndSortedProducts = filterProducts(filteredProducts);
        setProducts(filteredAndSortedProducts);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [normalizedCategory, filter, sortOption]); // Dependency on filter, sortOption

  // Function to handle filtering based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase()); // Update search term state
  };

  // Filter products based on selected filter and search term
  const filterProducts = (products) => {
    let filtered = products;

    // Apply category filters
    if (filter) {
      filtered = filtered.filter((product) => {
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
    }

    // Apply search term filtering
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  // Sort products based on selected sorting option
  const sortProducts = (products) => {
    if (sortOption === "price_low_high") {
      return products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_high_low") {
      return products.sort((a, b) => b.price - a.price);
    }
    return products;
  };

  // Apply both filter and sort
  const filteredAndSortedProducts = sortProducts(filterProducts(products));

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return (
    <div style={styles.outerContainer}>
      <SecondaryNavbar
        currentCategory={normalizedCategory}
        onSortSelect={(value) => setSortOption(value)}
        onFilterSelect={(value) => setFilter(value)}
      />
      <div style={styles.app}>
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
    </div>
  );
};

const styles = {
  outerContainer: {
    backgroundColor: "#f9f9f9",
  },
  app: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: "20px",
    width: "80%",
    margin: "0 auto", // Center the content
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Responsive grid
    gap: "30px",
    maxWidth: "1450px",
    margin: "0 auto",
  },
  productCard: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    // borderRadius: "4px",
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
    fontSize: "16px",
    color: "black",
    margin: "5px 0",
    fontWeight : "700",
  },
  rating: {
    fontSize: "12px",
    color: "#555",
    margin: "10px 0",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#777",
  },
};

export default ProductList;
