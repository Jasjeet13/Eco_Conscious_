import React, { useEffect, useState } from "react";

const Alternative = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        console.log("Fetching related products for ID:", productId);
        const response = await fetch(`/api/products/${productId}/related`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Related Products:", data);
        setRelatedProducts(data);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setError(err.message);
      }
    };

    if (productId) {
      fetchRelatedProducts();
    }
  }, [productId]);


  return (
    <div>
      <h2>Related Products</h2>
      {error ? (
        <p>{error}</p>
      ) : relatedProducts.length > 0 ? (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {relatedProducts.map((product) => (
            <div
              key={product._id}
              style={{ border: "1px solid #ccc", padding: "10px" }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "150px", height: "150px" }}
              />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>EcoScore: {product.ecoScore}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No related products found.</p>
      )}
    </div>
  );
};

export default Alternative;
