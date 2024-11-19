import React, { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import logo from "../public/logo.png";
import { FaRegUser, FaRegHeart, FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

const Navbar = ({ onSearch }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  const categoryMapping = {
    beauty: "beauty",
  footwear: "footwear",
  bags: "bags",
  clothing: "clothing",
  };

  const navigateToHome = () => {
    navigate("/home");
  };
  
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);

  const navigateToProfile = () => {
    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const navigateToWishlist = () => {
    navigate("/wishlist");
  };
  const navigateToBag = () => {
    navigate("/cart");
  };

  const showProfileMenu = () => setIsProfileMenuVisible(true);
  const hideProfileMenu = () => setIsProfileMenuVisible(false);

  const navigateToCategory = (category) => navigate(`/products/${category}`);
  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
  
    // Navigate to the login page
    navigate("/");
  };

  
  const handleSearch = () => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    // Check if search term matches a category
    const matchedCategory = Object.keys(categoryMapping).find(
      (key) => categoryMapping[key] === normalizedSearchTerm
    );

    if (matchedCategory) {
      navigateToCategory(matchedCategory);
    } else {
      // If no category match, perform product search
      onSearch(normalizedSearchTerm);
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
      padding: "20px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#ffffff",
      zIndex: 1000,
    },
    logo: { height: "40px", cursor: "pointer", marginLeft: "20px" },
    heading: { marginLeft: "10px", fontSize: "18px", fontWeight: "bold", color: "#3e4152", cursor: "pointer" },
    menuContainer: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      gap: "30px",
      fontSize: "16px",
      fontWeight: "500",
      color: "#3e4152",
    },
    menuItem: { cursor: "pointer", backgroundColor: "transparent", border: "none", color: "black", fontSize: "14px", fontWeight: "600" },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f5f5f6",
      padding: "10px 20px",
      marginRight: "70px",
      width: "500px",
    },
    searchInput: { border: "none", backgroundColor: "transparent", outline: "none", width: "100%", fontSize: "14px", color: "#3e4152" },
    iconsContainer: { display: "flex", alignItems: "center", gap: "40px", marginRight: "40px" },
    iconWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: "14px",
      color: "#3e4152",
      cursor: "pointer",
      height: "100%",
      justifyContent: "center",
      borderBottom: "2px solid transparent", 
      transition: "border-bottom 0.3s ease",
    },
    iconWrapperHover: {
      borderBottom: "2px solid #007F4E", 
    },
    icon: { fontSize: "20px" },
    profileMenu: {
      position: "absolute",
      top: "60px",
      right: "110px",
      width: "200px",
      backgroundColor: "#ffffff",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      overflow: "hidden",
      zIndex: 1001,
    },
    profileMenuItem: {
      padding: "10px 20px",
      fontSize: "14px",
      color: "#333",
      cursor: "pointer",
      borderBottom: "1px solid #f0f0f0",
    },
  };

  return (
    <><style>{`
        
      .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 20px;
        height: 70px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #ffffff;
        z-index: 1000;
        box-sizing: border-box;
      }
      .navbar-logo {
        height: 40px;
        cursor: pointer;
        margin-left: 20px;
      }
      .navbar-heading {
        margin-left: 10px;
        font-size: 18px;
        font-weight: bold;
        color: #3e4152;
        cursor: pointer;
      }
      .menu-container {
        display: flex;
        flex: 1;
        justify-content: center;
        gap: 30px;
        font-size: 16px;
        font-weight: 500;
        color: #3e4152;
      }
      .menu-item {
        cursor: pointer;
        background-color: transparent;
        border: none;
        color: black;
        font-size: 14px;
        font-weight: 600;
      }
      .search-container {
        display: flex;
        align-items: center;
        background-color: #f5f5f6;
        padding: 10px 20px;
        margin-right: 70px;
        width: 500px;
      }
      .search-input {
        border: none;
        background-color: transparent;
        outline: none;
        width: 100%;
        font-size: 14px;
        color: #3e4152;
      }
      .icons-container {
        display: flex;
        align-items: center;
        gap: 40px;
        margin-right: 40px;
      }
      .icon-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        color: #3e4152;
        cursor: pointer;
      }
      .icon {
        font-size: 20px;
      }

      /* Hide categories menu and search bar at 768px and below */
      @media (max-width: 768px) {
        .menu-container,
        .search-container {
          display: none;
        }
        .icons-container {
          gap: 20px;
        }
      }

      /* Show only the logo and icons at screens below 480px */
      @media (max-width: 480px) {
        .navbar {
          padding: 20px;
        }
        .icons-container {
          margin-right: 20px;
        }
        .navbar-logo {
          height: 40px;
          margin-left: 0;
        }
      }
    
  `}</style>
    <nav style={styles.navbar}>
      <img src={logo} alt="Logo" style={styles.logo} onClick={navigateToHome} />
      <div style={styles.heading} onClick={navigateToHome}>
        Eco-Conscious
      </div>

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

        <div className="icons-container">
          <div className="icon-wrapper" onClick={navigateToProfile}>
            <FaRegUser className="icon" />
            <span>Profile</span>
          </div>
          <div className="icon-wrapper" onClick={navigateToWishlist}>
            <FaRegHeart className="icon" />
            <span>Wishlist</span>
          </div>
          <div className="icon-wrapper" onClick={navigateToBag}>
            <FiShoppingBag className="icon" />
            <span>Bag</span>
          </div>
        </div>
      </nav></>
  );
};



export default Navbar;

