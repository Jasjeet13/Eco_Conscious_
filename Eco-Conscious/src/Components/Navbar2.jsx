import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../public/logo.png";
import { FaUser, FaSearch } from "react-icons/fa"; // Importing the user icon and search icon from react-icons

const Navbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

   const navigateToHome = () => {
    navigate(`/home/${id}`);
  };
  const navigateToProfile = () => {
    navigate(`/profile/${id}`); 
  };

  const navigateToCategory = (category) => {
    navigate(`/products/${category}`);
  };

  const styles = {
    navbar: {
      display: "flex",
      alignItems: "center",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
      boxSizing: "border-box",
    },
    logo: {
      height: "45px",
      cursor: "pointer",
      marginLeft: "100px",
    },
    heading: {
      textAlign: "center",
      cursor: "pointer",
    },
    menuContainer: {
      flex: 2,
      display: "flex",
      alignItems: "center", // Align items vertically centered
      justifyContent: "center",
    },
    menu: {
      display: "flex",
      listStyle: "none",
      gap: "40px",
    },
    menuItem: {
      fontSize: "17px",
      color: "#000",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      padding: 0,
    },
    searchContainer: {
      position: "relative",
      margin: "0 20px", // Add margin for spacing
    },
    searchInput: {
      padding: "10px 0px 10px 10px", // Add padding to accommodate icon
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "20px",
      outline: "none",
      width: "400px",
    },
    searchIcon: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#aaa",
    },
    userProfileButton: {
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
      color: "black",
      cursor: "pointer",
      backgroundColor: "#ace1af",
      border: "none",
      padding: "10px 20px",
      borderRadius: "30px",
      marginRight: "30px",
      fontWeight: "800",
    },
    userIcon: {
      marginRight: "5px",
      marginTop: "2px",
    },
  };

  return (
    <nav style={styles.navbar}>
      <img
        src={logo}
        alt="Logo"
        style={styles.logo}
      />
      <div style={styles.heading}>
        <h2>Eco-Conscious</h2>
      </div>
      <div style={styles.menuContainer}>
        <ul style={styles.menu}>
          <li>
            <button
              style={styles.menuItem}
              onClick={() => navigateToCategory('men\'s clothing')}
            >
              Men
            </button>
          </li>
          <li>
            <button
              style={styles.menuItem}
              onClick={() => navigateToCategory('women\'s clothing')}
            >
              Women
            </button>
          </li>
          <li>
            <button
              style={styles.menuItem}
              onClick={() => navigateToCategory('beauty')}
            >
              Beauty
            </button>
          </li>
          <li>
            <button
              style={styles.menuItem}
              onClick={() => navigateToCategory('shoes')}
            >
              Shoes
            </button>
          </li>
        </ul>
        {/* <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            style={styles.searchInput}
          />
          <FaSearch style={styles.searchIcon} />
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
