import React from "react";
import logo from "../public/logo.png";

const Navbar = () => {
  const styles = {
    container: {
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#fff",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
      boxSizing: "border-box",
    },
    logo: {
      height: "40px",
      cursor: "pointer",
    },
    menuContainer: {
      flex: 2,
      paddingLeft: "210px",
      display: "flex",
      justifyContent: "center",
    },
    menu: {
      display: "flex",
      listStyle: "none",
      gap: "20px",
      margin: 0,
      padding: 0,
    },
    menuItem: {
      fontSize: "16px",
      color: "#000",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      padding: "0",
    },
    login: {
      flex: 1,
      display: "flex",
      justifyContent: "flex-end",
    },
    loginButton: {
      fontSize: "16px",
      color: "#000",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      padding: "0",
    },
  };
  return (
    <>
      <div>
        <nav style={styles.navbar}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <div>
            <h2>Eco-Conscious</h2>
          </div>
          <div style={styles.menuContainer}>
            <ul style={styles.menu}>
              <li>
                <button
                  style={styles.menuItem}
                  onClick={() => (window.location.href = "/mens-clothing")}
                >
                  Men's Clothing
                </button>
              </li>
              <li>
                <button
                  style={styles.menuItem}
                  onClick={() => (window.location.href = "/womens-clothing")}
                >
                  Women's Clothing
                </button>
              </li>
              <li>
                <button
                  style={styles.menuItem}
                  onClick={() => (window.location.href = "/baby")}
                >
                  Baby
                </button>
              </li>
              <li>
                <button
                  style={styles.menuItem}
                  onClick={() => (window.location.href = "/beauty")}
                >
                  Beauty
                </button>
              </li>
              <li>
                <button
                  style={styles.menuItem}
                  onClick={() => (window.location.href = "/kids")}
                >
                  Kids
                </button>
              </li>
              <li>
                <button
                  style={styles.menuItem}
                  onClick={() => (window.location.href = "/shoes")}
                >
                  Shoes
                </button>
              </li>
              <li>
                <button
                  style={styles.menuItem}
                  onClick={() => (window.location.href = "/jewelery")}
                >
                  Jewelery
                </button>
              </li>
            </ul>
          </div>
          <div style={styles.login}>
            <button
              style={styles.loginButton}
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Navbar;
