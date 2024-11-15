// src/hooks/useFetchProducts.js
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProducts = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        const filteredProducts =
          category === "All"
            ? data
            : data.filter((product) => product.category === category);
        setProducts(filteredProducts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return { products, loading, error };
};

export default useFetchProducts;
