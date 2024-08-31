import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import Slider from "./Slider";
import TopPicks from "./TopPicks";
import Categories from "./Categories";
import MotoSection from "./MotoSection";
import CustomerTestimonials from "./CustomerTestimonials";
import Footer from "./Footer";

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${id}`); // Use navigate instead of window.location.href
  };

  const navigateToCategory = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div>
      <Navbar />
      <Slider />
      <TopPicks />
      <Categories />
      <MotoSection />
      <CustomerTestimonials />
      <Footer />
    </div>
  );
};

// Simple button styling
const buttonStyle = {
  margin: "5px",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Home;
