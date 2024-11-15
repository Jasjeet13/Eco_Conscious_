import React, { useState, useEffect } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/wishlist');
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      setWishlist(wishlist.filter(item => item._id !== id));
      const response = await fetch(`http://localhost:3000/api/wishlist/remove/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        alert(`Error removing item`);
      } else {
        alert('Item removed from wishlist');
      }
    } catch (error) {
      alert('Error removing item from wishlist');
    }
  };

  if (wishlist.length === 0) {
    return <div>Your wishlist is empty.</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Your Wishlist Items</h1>
      <div>
        {wishlist.map((item) => (
          <div key={item._id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Wishlist;