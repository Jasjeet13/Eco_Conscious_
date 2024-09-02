import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../public/logo.png";

const Navbar3 = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
  };

  return (
    <nav style={styles.navbar}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <div style={styles.heading}>
        <h2>Eco-Conscious</h2>
      </div>
    </nav>
  );
};

export default Navbar3;
