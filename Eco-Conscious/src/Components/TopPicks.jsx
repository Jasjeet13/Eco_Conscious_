import React from 'react';
import { Link } from 'react-router-dom';

const TopPicks = () => {
  const picks = [
    {
      id: "66d00d5c7d5a8882e1b44d8c",
      imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRgaKUvGBZzATr558R_6TOBC-rM0mNJn42AyrIS3F_hv0U-yx1ki26Iaug1nZFmcfGMntKdnFQsS-wd2yur5voJLswu_LpiYTx4xCVAqp058r_DPRQJplWl",
      title: "ROYALICA Women Black and White Colour Collared Checked Shirt with Heavy",
      description: "ROYALICA Women Black and White Colour Collared Checked Shirt with Heavy",
    },
    {
      id: "66d00d5c7d5a8882e1b44d76",
      imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSguOdkliodaoG68WHrA2gyORC5FxjqmsDeLWJF4Vq7JPvhhTO1-wYi0afZC3A35-OvvyW158pK6IzmXScZBE5YSb0KUa-8YY4uBwcZmyah",
      title: "CB-COLEBROOK Men's shirt",
      description: " Men's Casual Button Down Shirts Long Sleeve Linen Shirt Fashion Textured Beach Summer Shirt, Casual Shirt for Men, Men Stylish Shirt\nStyle:Casual, Neckline:Collar, Sleeve Length:Long Sleeve\nReguler Fit",
    },
    {
      id: "66d00d5d7d5a8882e1b44def",
      imageUrl: "https://m.media-amazon.com/images/I/411WDyKUhAL._SX300_SY300_QL70_FMwebp_.jpg",
      title: "Mars 12 Shades Eyeshadow Palette",
      description: "MARS 12 Shades Back to Basics Eyeshadow Palette with Free Applicator | Matte | Shimmer |classy | Highlighter | Beginner Friendly & Long Lasting Eye Shadow Palette (14.4 gm) (Shade-02)                             ",
    },
    {
      id: "66d00d5d7d5a8882e1b44e01",
      imageUrl: "https://cdn18.nnnow.com/web-images/large/styles/D290FXLMFDF/1689330053752/3.jpg",
      title: "Men Solid Lace Up Dorit Sneakers",
      description: "Round toe, Central lacing, Panelled upper with logo, Padded top line, Reinforced heel, unter\nPull-up tabs, Cushioned footed, Textured outsole, Solid pattern   ",
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Top Picks for You</h2>
      <div style={styles.grid}>
        {picks.map((pick) => (
          <div key={pick.id} style={styles.item}>
            <img src={pick.imageUrl} alt={pick.title} style={styles.image} />
            <h3 style={styles.itemTitle}>{pick.title}</h3>
            <p style={styles.description}>{pick.description}</p>
            <Link to={`/products/${pick.category}/${pick.id}`} style={styles.button}>
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "97.5vw",
    padding: "20px",
    backgroundColor: "#fffff0",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    width: "100%",
    maxWidth: "96%",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    textAlign: "center",
    boxSizing: "border-box",
  },
  image: {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
  },
  itemTitle: {
    fontSize: "1.5rem",
    margin: "10px 0",
  },
  description: {
    fontSize: "1rem",
    color: "#666",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "1rem",
    color: "black",
    fontWeight: "600",
    backgroundColor: "#ace1af",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    textDecoration: "none",
  },
};

export default TopPicks;
