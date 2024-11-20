import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../public/logo.png";
import { FaRegUser, FaRegHeart, FaSearch } from "react-icons/fa";
import { FiShoppingBag, FiPackage } from "react-icons/fi";

const Navbar = ({ onSearch }) => {
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

  const navigateToOrderHistory = () => {
    navigate("/order-history"); // Corrected navigation to Order History page
  };

  const navigateToWishlist = () => {
    navigate("/wishlist");
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

  
  const handleSearch = (e) => {
    e.preventDefault();
    
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  
    // Check if the entered term matches a category
    const matchedCategory = Object.keys(categoryMapping).find((key) => 
      categoryMapping[key].toLowerCase() === normalizedSearchTerm
    );
  
    if (matchedCategory) {
      navigateToCategory(categoryMapping[matchedCategory]);
    } else if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`); // Default search behavior
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
      // borderRadius: "8px",
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
          Beauty
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

      <form style={styles.searchContainer} onSubmit={handleSearch}>
        <FaSearch style={{ cursor: "pointer" }} />
        <input
          type="text"
          placeholder="Search for products, and more"
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>


      <div style={styles.iconsContainer}>
        <div
          style={{ ...styles.iconWrapper, ...(isProfileMenuVisible && styles.iconWrapperHover) }}
          onMouseEnter={showProfileMenu}
          onMouseLeave={hideProfileMenu}
        >
          <FaRegUser style={styles.icon} />
          <span>Profile</span>

          {isProfileMenuVisible && (
            <div style={styles.profileMenu}>
              <div style={styles.profileMenuItem} onClick={() => navigate("/profile")}>Account</div>
              <div style={styles.profileMenuItem} onClick={() => navigate("/wishlist")}>Wishlist</div>
              <div style={styles.profileMenuItem} onClick={() => navigate("/order-history")}>Order History</div>
              <div style={styles.profileMenuItem} onClick={() => navigate("/contact")}>Edit Account</div>
              <div style={styles.profileMenuItem} onClick={logout}>Logout</div>
            </div>
          )}
        </div>

        <div
          style={{ ...styles.iconWrapper }}
          onMouseEnter={() => setIsProfileMenuVisible(false)}
          onMouseLeave={() => setIsProfileMenuVisible(false)}
        >
          <FaRegHeart style={styles.icon} onClick={() => navigate("/wishlist")}/>
          <span>Wishlist</span>
        </div>
        <div style={{ ...styles.iconWrapper }} onClick={() => navigate("/cart")}>
          <FiShoppingBag style={styles.icon} />
          <span>Bag</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
