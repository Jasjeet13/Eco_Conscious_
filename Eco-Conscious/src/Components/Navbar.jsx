import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    navigate("/bag");
  };

  const navigateToCategory = (category) => {
    navigate(`/products/${category}`);
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

  return (
    <>
      <style>{`
        
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
      <nav className="navbar">
        <img
          src={logo}
          alt="Logo"
          className="navbar-logo"
          onClick={navigateToHome}
        />
        <div className="navbar-heading" onClick={navigateToHome}>
          Eco-Conscious
        </div>

        <div className="menu-container">
          <button
            className="menu-item"
            onClick={() => navigateToCategory("beauty")}
          >
            Cosmetic
          </button>
          <button
            className="menu-item"
            onClick={() => navigateToCategory("footwear")}
          >
            Footwear
          </button>
          <button
            className="menu-item"
            onClick={() => navigateToCategory("bags")}
          >
            Bag
          </button>
          <button
            className="menu-item"
            onClick={() => navigateToCategory("clothing")}
          >
            Clothing
          </button>
        </div>

        <div className="search-container">
          <FaSearch style={{ cursor: "pointer" }} onClick={handleSearch} />
          <input
            type="text"
            placeholder="Search for products, and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
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
      </nav>
    </>
  );
};

export default Navbar;