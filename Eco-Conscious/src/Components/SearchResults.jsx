import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { term } = useParams();  // Get the search term from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);  // To handle error state

  useEffect(() => {
    // Fetch the products from the API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/name/${term}`);
        
        // Check if the response is OK (status 200)
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [term]);  // Re-fetch when the search term changes

  return (
    <div>
      <h2>Search Results for "{term}"</h2>
      
      {/* Loading and error states */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {/* Display products or message if none are found */}
      <div>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product._id}>{product.name}</li>  // Display the product name
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
