import React from "react";
import { useNavigate, useParams } from 'react-router-dom';


const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    boxSizing: "border-box",
  },
  newSection: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "5px",
    padding: "10px",
    height: "100%",
    boxSizing: "border-box",
  },
  largeSectionItem: {
    position: "relative",
    color: "#fff",
    height: "37vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    gridColumn: "span 2",
  },
  smallSectionItem: {
    position: "relative",
    color: "#fff",
    height: "22vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  },
  sectionContent: {
    position: "relative",
    zIndex: 2,
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#fff",
  },
  sectionButton: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    borderRadius: "30px",
    border: "2px solid #fff",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const navigateToCategory = (category) => {
    navigate(`/products/${category}`);
  };


  return (
    <div style={styles.container}>
      <div style={styles.newSection}>
        <div
          style={{
            ...styles.largeSectionItem,
            backgroundImage:
              "url('https://www.shutterstock.com/image-photo/stylish-fashion-child-baby-girl-260nw-1769789042.jpg')",
          }}
        >
          <div style={styles.overlay}></div>
          <div style={styles.sectionContent}>
            <h2 style={styles.sectionTitle}>Women's Wear</h2>
            <button style={styles.sectionButton} onClick={() => navigateToCategory('women\'s clothing')}>View More</button>
          </div>
        </div>
        <div
          style={{
            ...styles.smallSectionItem,
            backgroundImage:
              "url('https://th.bing.com/th/id/OIP.0gPm7veLpebWbfgTLrvVIgHaE8?rs=1&pid=ImgDetMain')",
          }}
        >
          <div style={styles.overlay}></div>
          <div style={styles.sectionContent}>
            <h2 style={styles.sectionTitle}>Beauty Products</h2>
            <button style={styles.sectionButton} onClick={() => navigateToCategory('beauty')}>View More</button>
          </div>
        </div>
        <div
          style={{
            ...styles.smallSectionItem,
            backgroundImage:
              "url('https://th.bing.com/th/id/OIP.vcUsqpCQzTNwZLvTkSuQZgHaEK?w=1000&h=562&rs=1&pid=ImgDetMain')",
          }}
        >
          <div style={styles.overlay}></div>
          <div style={styles.sectionContent}>
            <h2 style={styles.sectionTitle}>Shoes</h2>
            <button style={styles.sectionButton} onClick={() => navigateToCategory('shoes')}>View More</button>
          </div>
        </div>
        <div
          style={{
            ...styles.largeSectionItem,
            backgroundImage:
              "url('https://i.pinimg.com/originals/d2/c4/a9/d2c4a987416b76e4d2781e2cd97ff6c8.jpg')",
          }}
        >
          <div style={styles.overlay}></div>
          <div style={styles.sectionContent}>
            <h2 style={styles.sectionTitle}>Men's Wear</h2>
            <button style={styles.sectionButton}  onClick={() => navigateToCategory('men\'s clothing')}>View More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
