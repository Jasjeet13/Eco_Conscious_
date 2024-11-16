import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import logo from "../public/logo.png";
import { FaRegUser, FaRegHeart, FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

const Navbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token"); 

  const categories = {
    cosmetic: "Beauty Products",
    footwear: "Footwear",
    bag: "Bags",
    clothing: "Clothing",
  };

  const navigateToHome = () => {
    navigate("/home");
  };

  const navigateToProfile = () => {
    if (token) {
      navigate("/profile");
    } else {
      navigate("/login"); 
      // navigate(`/login/${id}`);
    }
  };

  const navigateToWishlist = () => {
    navigate("/wishlist");
  };

  const navigateToBag = () => {
    navigate("/bag");
  };

  const navigateToCategory = (category) => {
    navigate(`/products/${category}`);
  };
  const handleSearch = () => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    if (categories[lowerSearchTerm]) {
      navigateToCategory(categories[lowerSearchTerm]);
    } else {
      navigate(`/products?search=${searchTerm}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };



  const styles = {
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 20px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#ffffff",
      zIndex: 1000,
      boxSizing: "border-box",
    },
    logo: {
      height: "40px",
      cursor: "pointer",
      marginLeft: "20px",
    },
    heading: {
      marginLeft: "10px",
      fontSize: "18px",
      fontWeight: "bold",
      color: "#3e4152",
      cursor: "pointer",
    },
    menuContainer: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      gap: "30px",
      fontSize: "16px",
      fontWeight: "500",
      color: "#3e4152",
    },
    menuItem: {
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      color: "black",
      fontSize: "14px",
      fontWeight: "600",
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f5f5f6",
      padding: "10px 20px",
      //borderRadius: "20px",
      marginRight: "70px",
      width: "500px",
    },
    searchInput: {
      border: "none",
      backgroundColor: "transparent",
      outline: "none",
      width: "100%",
      fontSize: "14px",
      color: "#3e4152",
    },
    iconsContainer: {
      display: "flex",
      alignItems: "center",
      gap: "40px",
      marginRight: "40px",
    },
    iconWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: "14px",
      color: "#3e4152",
      cursor: "pointer",
    },
    icon: {
      fontSize: "20px",
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <img src={logo} alt="Logo" style={styles.logo} onClick={navigateToHome} />
      <div style={styles.heading} onClick={navigateToHome}>
        Eco-Conscious
      </div>

      {/* Navigation Links */}
      <div style={styles.menuContainer}>
        <button
          style={styles.menuItem}
          onClick={() => navigateToCategory("Beauty Products")}
        >
          Cosmetic
        </button>
        <button
          style={styles.menuItem}
          onClick={() => navigateToCategory("Footwear")}
        >
          Footwear
        </button>
        <button
          style={styles.menuItem}
          onClick={() => navigateToCategory("Bags")}
        >
          Bag
        </button>
        <button
          style={styles.menuItem}
          onClick={() => navigateToCategory("Clothing")}
        >
          Clothing
        </button>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <FaSearch style={{ cursor: "pointer" }} onClick={handleSearch} />
        <input
          type="text"
          placeholder="Search for products, and more"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.searchInput}
        />
      </div>


      {/* Profile, Wishlist, and Bag Icons */}
      <div style={styles.iconsContainer}>
        <div style={styles.iconWrapper} onClick={navigateToProfile}>
          <FaRegUser style={styles.icon} />
          <span>Profile</span>
        </div>
        <div style={styles.iconWrapper} onClick={navigateToWishlist}>
          <FaRegHeart style={styles.icon} />
          <span>Wishlist</span>
        </div>
        <div style={styles.iconWrapper} onClick={navigateToBag}>
          <FiShoppingBag style={styles.icon} />
          <span>Bag</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
