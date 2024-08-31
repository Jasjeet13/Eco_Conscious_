// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const Home = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const navigateToProfile = () => {
//     navigate(`/profile/${id}`); // Use navigate instead of window.location.href
//   };

//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//       <button onClick={navigateToProfile}>Go to Profile</button>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import Navbar from "./Navbar";
import Slider from "./Slider";
import TopPicks from "./TopPicks";
import Categories from "./Categories";
import MotoSection from "./MotoSection";
import CustomerTestimonials from "./CustomerTestimonials";
import Footer from "./Footer";

const Home = () => {
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

export default Home;
