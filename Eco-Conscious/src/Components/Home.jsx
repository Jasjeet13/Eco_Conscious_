import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const { email } = useParams(); 
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${email}`); // Use navigate instead of window.location.href
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={navigateToProfile}>Go to Profile</button>
    </div>
  );
};

export default Home;
