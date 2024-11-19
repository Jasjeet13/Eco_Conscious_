import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cart", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setCartItems(
            data.map((item) => ({
              ...item,
              price: item.price || 0,
              quantity: item.quantity || 1,
            }))
          );
        } else {
          setError(data.message || "Failed to fetch cart items");
        }
      } catch (error) {
        setError("Error fetching cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Handle quantity change
  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 20) {
      alert("Quantity must be between 1 and 20");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/cart/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems(
          cartItems.map((item) =>
            item.productId === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      } else {
        alert(data.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle remove item
  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems(cartItems.filter((item) => item.productId !== productId));
      } else {
        setError(data.message || "Failed to remove item from cart");
      }
    } catch (error) {
      setError("Error removing item from cart");
    }
  };
  const handleCheckout = async () => {
    try {
      // Send the cart items to the backend for order creation
      const response = await fetch("http://localhost:3000/api/order/place-order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        // Send any necessary data in the body (if required)
      });
      
      
  
      const data = await response.json();
  
      // Check if the response is successful
      if (response.ok) {
        alert("Order placed successfully!");
        // Navigate to the order page and pass the order data or order ID
        navigate(`/order/${data.order._id}`);
      } else {
        console.error("Error response:", data);
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };
  
  

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = item.price || 0;
        const quantity = item.quantity || 1;
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    
    <div style={{ display: "flex", padding: "30px", maxWidth: "100%", margin: "0 auto" }}>
      
      {/* <h1 style={{ width: "100%", textAlign: "center", fontSize: "40px", color: "#333", marginBottom: "30px" }}>
  Your Shopping Cart
</h1> */}

      
       <div style={{ flex: 2, display: "flex", flexWrap: "wrap", gap: "20px" }}>
        
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.productId}
              style={{
                width: "40%",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name}
                style={{ width: "100%", height: "200px", objectFit: "contain", borderRadius: "10px" }}
              />
              <h3 style={{ fontSize: "20px", marginTop: "10px" }}>{item.name}</h3>
              <p style={{ fontSize: "16px", color: "#555" }}>Price: ${item.price}</p>
              <div>
                <label htmlFor={`quantity-${item.productId}`}>Quantity: </label>
                <input
                  id={`quantity-${item.productId}`}
                  type="number"
                  value={item.quantity}
                  min="1"
                  max="20"
                  onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
                  style={{
                    width: "60px",
                    padding: "5px",
                    textAlign: "center",
                    marginLeft: "10px",
                  }}
                />
              </div>
              
              <p style={{ fontSize: "18px", color: "#e63946" }}>
                Total Amount: ${(item.price * item.quantity).toFixed(2)}
              </p>
              
              <button
                onClick={() => handleRemoveItem(item.productId)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#e63946",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div>Your cart is empty!</div>
        )}
      </div>

      {/* Right side - Order Summary */}
      <div
      
        style={{
          flex: 1,
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          marginLeft: "20px",
          height: "auto",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        
        <h3 style={{ fontSize: "24px", marginBottom: "30px" }}>Order Summary</h3>
        <div style={{ marginBottom: "10px" }}>
          <p style={{ fontSize: "18px", margin: "20px 0" }}>
            <strong>Items in Cart:</strong> {cartItems.length}
          </p>
          <p style={{ fontSize: "18px", margin: "5px 0" }}>
            <strong>Total Price:</strong> ${getTotalPrice()}
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "18px" }}>
            <strong>Shipping:</strong> Free (if applicable)
          </p>
        </div>

        <button
    onClick={handleCheckout}
    style={{
      padding: "15px 30px",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      width: "100%",
      fontSize: "18px",
    }}
  >
    Proceed to Checkout
  </button>
      </div>
    </div>
  );
};

export default Cart;