import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import SignUp_Login from "./Components/SignUp_Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import ProfileDetails from "./Components/ProfileDetails";
import ProductProfile from "./Components/ProductProfile";
import ProductList from "./Components/ProductList";
import Edit from "./Components/Edit";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Wishlist from './Components/Wishlist';

function App() {
  // Check if the user is authenticated by looking for the token in localStorage
  const token = localStorage.getItem("token");

  // If there's no token, redirect to login page (this will also apply when the user logs out)
  const isAuthenticated = token !== null;

  return (
    <>
      <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<SignUp_Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfileDetails /> : <Navigate to="/" />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products/:category/:id" element={<ProductProfile />} />
        <Route path="/edit" element={isAuthenticated ? <Edit /> : <Navigate to="/" />} />
        <Route path="/wishlist" element={isAuthenticated ? <Wishlist />:<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
