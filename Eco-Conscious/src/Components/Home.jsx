import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${id}`); // Use navigate instead of window.location.href
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={navigateToProfile}>Go to Profile</button>
    </div>
  );
};

export default Home;
