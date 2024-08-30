import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${id}`);
  };

  const navigateToCategory = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={navigateToProfile}>Go to Profile</button>

      <div style={{ marginTop: '20px' }}>
        <h2>Shop by Category</h2>
        <button onClick={() => navigateToCategory('men\'s clothing')} style={buttonStyle}>Men's Clothing</button>
        <button onClick={() => navigateToCategory('women\'s clothing')} style={buttonStyle}>Women's Clothing</button>
        <button onClick={() => navigateToCategory('beauty')} style={buttonStyle}>Beauty</button>
        <button onClick={() => navigateToCategory('shoes')} style={buttonStyle}>Shoes</button>
      </div>
    </div>
  );
};

// Simple button styling
const buttonStyle = {
  margin: '5px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Home;
