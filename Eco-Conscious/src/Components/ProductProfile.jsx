import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EnvironmentCriteria from "./EnvironmentCriteria";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./Footer";

const ProductProfile = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false); // To track if the product is in the wishlist
  const [hoveredIcon, setHoveredIcon] = useState(null); // For hover effect
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
        } else {
          setError(data.message || "Failed to fetch product");
        }
      } catch (error) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Check if product is in the wishlist when the component mounts
  useEffect(() => {
    const checkWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3000/api/wishlist", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Check if the current product is in the wishlist
          const itemInWishlist = data.some(
            (item) => item.productId === product._id
          );
          setIsInWishlist(itemInWishlist);
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    if (product) {
      checkWishlist();
    }
  }, [product]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10) || 1; // Default to 1 if input is invalid
    setQuantity(Math.min(Math.max(1, value), 20)); // Ensure quantity is between 1 and 20
  };

  const addToWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to add items to your wishlist.");
      return;
    }
    if (isInWishlist) {
      alert("This item is already in your wishlist.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/wishlist/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsInWishlist(true); // Mark as in wishlist
        alert(data.message);
        navigate("/wishlist");
      } else {
        alert(data.message || 'Error adding to wishlist');
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  const buyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to place an order.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/order/buy-now", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity, // Send the quantity selected by the user
          price: product.price, // Send the product price
          image: product.image, // Send product image URL
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Show success message
        navigate(`/order/${data.order._id}`); // Navigate to order details page
      } else {
        alert(data.message || "Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again.");
    }
  };
  
  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to add items to your cart.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/cart/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity, // Include the selected quantity
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/cart");
      } else {
        alert(data.message || "Error adding to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "60px 30px",
          maxWidth: "100%",
          margin: "0 auto",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1", marginRight: "10px", marginTop: "40px" }}>
          <img
            src={product.image || "https://via.placeholder.com/600"}
            alt={product.name || "Product"}
            style={{
              width: "600px",
              borderRadius: "12px",
              padding: "5px",
              objectFit: "contain",
              height: "630px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          />
        </div>
        <div style={{ padding: "40px", flex: "2" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            {product.name}
          </h1>
          <p
            style={{ fontSize: "28px", color: "#e63946", marginBottom: "15px" }}
          >
            ${product.price}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <span
              style={{
                color: "#ffcc00",
                marginRight: "15px",
                fontSize: "20px",
              }}
            >
              ★★★★★
            </span>
            <a href="#reviews" style={{ color: "#333", fontSize: "18px" }}>
              3 reviews
            </a>
          </div>
          <p
            style={{
              marginBottom: "25px",
              color: "#555",
              lineHeight: "1.8",
              fontSize: "18px",
            }}
          >
            {product.description}
          </p>
          <p style={{ marginBottom: "15px", fontSize: "18px" }}>
            <strong>Availability:</strong>{" "}
            {product.inStock ? "In stock" : "Out of stock"}
          </p>
          <p style={{ marginBottom: "15px", fontSize: "18px" }}>
            <strong>Product Type:</strong> {product.category}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <input
              type="number"
              min="1"
              max="20"
              value={quantity}
              onChange={handleQuantityChange}
              style={{
                width: "70px",
                padding: "10px",
                marginRight: "30px",
                fontSize: "18px",
              }}
            />
            <button
              style={{
                padding: "15px 30px",
                border: "1px solid #000",
                cursor: "pointer",
                backgroundColor: "#fff",
                color: "#000",
                marginRight: "30px",
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
              }}
              onClick={addToCart}
              onMouseEnter={() => setHoveredIcon("cart")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <i
                className={
                  hoveredIcon === "cart"
                    ? "fas fa-cart-plus"
                    : "fas fa-shopping-cart"
                }
                style={{
                  margin: "0px 20px 0px 0px",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: isInCart
                    ? "#088F8F"
                    : hoveredIcon === "cart"
                    ? "#088F8F"
                    : "#ccc",
                  transition: "color 0.3s ease",
                }}
              ></i>
              ADD TO CART
            </button>
            <button
              style={{
                padding: "15px 30px",
                border: "1px solid #000",
                cursor: "pointer",
                backgroundColor: "#fff",
                color: "#000",
                marginRight: "30px",
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
              }}
              onClick={addToWishlist}
            >
              <i
                className="fas fa-heart"
                style={{
                  margin: "0px 20px 0px 0px",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: isInWishlist
                    ? "#ff0000"
                    : hoveredIcon === "heart"
                    ? "#ff0000"
                    : "#ccc",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={() => setHoveredIcon("heart")}
                onMouseLeave={() => setHoveredIcon(null)}
              ></i>
              {isInWishlist ? "IN WISHLIST" : "ADD TO WISHLIST"}
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "50px",
              marginBottom: "25px",
            }}
          >
            <button
  style={{
    padding: "20px 40px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "25px",
    display: "flex",
    alignItems: "center",
  }}
  onClick={buyNow} // Call the buyNow function
>
  <i className="fas fa-credit-card" style={{ marginRight: "10px" }}></i>
  Buy Now
</button>

            <EnvironmentCriteria
              ecoScore={product.ecoScore}
              details={{
                carbonFootprint: product.carbonFootprint,
                materialSourcing: product.materialSourcing,
                recyclability: product.recyclability,
                waterUsage: product.waterUsage,
                energyEfficiency: product.energyEfficiency,
                biodegradability: product.biodegradability,
                durability: product.durability,
              }}
            />
          </div>
        </div>
      </div>
      {/* Product details */}
      {/* <Alternative currentProduct={product} products={relatedProducts} /> */}
    </>
  );
};

export default ProductProfile;
