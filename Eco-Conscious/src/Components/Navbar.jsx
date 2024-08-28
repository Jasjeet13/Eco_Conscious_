import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShippingFast,
  faDollarSign,
  faCreditCard,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const NewArrivals = () => {
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
    textSection: {
      position: "absolute",
      top: "50%",
      left: "10%",
      transform: "translateY(-50%)",
      textAlign: "left",
      color: "#fff",
      padding: "20px",
      maxWidth: "40%",
    },
    collectionText: {
      fontSize: "18px",
      marginBottom: "10px",
    },
    mainHeading: {
      fontSize: "48px",
      fontWeight: "bold",
      margin: "10px 0",
    },
    discountText: {
      fontSize: "20px",
      marginBottom: "20px",
    },
    shopButton: {
      padding: "15px 30px",
      backgroundColor: "#e63946",
      color: "#fff",
      border: "none",
      fontSize: "18px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    shopButtonHover: {
      backgroundColor: "#d62839",
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: -1,
    },
    newSection: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "10px",
      padding: "20px",
      marginTop: "20px",
    },
    largeSectionItem: {
      position: "relative",
      backgroundColor: "#000",
      color: "#fff",
      height: "400px",
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
      backgroundColor: "#000",
      color: "#fff",
      height: "200px",
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
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1,
    },
    sectionContent: {
      position: "relative",
      zIndex: 2,
    },
    sectionTitle: {
      fontSize: "24px",
      marginBottom: "10px",
    },
    sectionButton: {
      padding: "10px 20px",
      backgroundColor: "transparent",
      border: "2px solid #fff",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    infoSection: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "20px 0",
      backgroundColor: "#f5f5f5", // Adjust the background color as needed
    },
    infoItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      width: "200px", // Adjust the width as needed
    },
    icon: {
      width: "50px", // Adjust the size as needed
      height: "50px",
      marginBottom: "10px",
    },
    quoteSection: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px 20px",
      backgroundColor: "gray", // Adjust the background color as needed
      color: "#333",
      textAlign: "center",
      height: "500px",
    },
    quoteContainer: {
      maxWidth: "800px",
      padding: "20px",
      //   backgroundColor:"red"
    },
    quoteText: {
      fontSize: "24px",
      fontStyle: "italic",
      marginBottom: "20px",
      lineHeight: "1.5",
    },
    quoteAuthor: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    footer: {
      padding: "40px 20px",
      backgroundColor: "#f5f5f5",
      color: "#333",
    },
    footerContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    footerColumn: {
      flex: "1",
      minWidth: "200px",
      marginBottom: "20px",
    },
    footerHeading: {
      fontSize: "16px",
      marginBottom: "20px",
      fontWeight: "bold",
    },
    footerList: {
      listStyleType: "none",
      padding: 0,
    },
    footerListItem: {
      marginBottom: "10px",
    },
    footerBottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "40px",
      borderTop: "1px solid #444",
      paddingTop: "20px",
    },
    socialIcons: {
      display: "flex",
      gap: "10px",
    },
    socialIcon: {
      fontSize: "20px",
      cursor: "pointer",
    },
  };

  return (
    <div>
      <div style={styles.container}>
        <nav style={styles.navbar}>
          <img src="path-to-your-logo.png" alt="Logo" style={styles.logo} />
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
        <img
          src="https://i.pinimg.com/originals/5c/18/b0/5c18b066da9a67121b770d72a98631ae.jpg"
          alt="Room Scene"
          style={styles.backgroundImage}
        />
        <div style={styles.textSection}>
          <p style={styles.collectionText}>Summer Collections</p>
          <h1 style={styles.mainHeading}>New Arrivals!</h1>
          <p style={styles.discountText}>Take 20% Off ‘Sale Must-Haves'</p>
          <button
            style={styles.shopButton}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.shopButtonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.shopButton.backgroundColor)
            }
          >
            SHOP NOW!
          </button>
        </div>
      </div>

      {/* New Section Below */}
      <div style={styles.newSection}>
        <div
          style={{
            ...styles.largeSectionItem,
            backgroundImage:
              "url('https://i.pinimg.com/originals/d2/c4/a9/d2c4a987416b76e4d2781e2cd97ff6c8.jpg')",
          }}
        >
          <div style={styles.overlay}></div>
          <div style={styles.sectionContent}>
            <h2 style={styles.sectionTitle}>Stylish Men's Wear</h2>
            <button style={styles.sectionButton}>View More</button>
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
            <h2 style={styles.sectionTitle}>Elegant Women's Fashion</h2>
            <button style={styles.sectionButton}>View More</button>
          </div>
        </div>
        <div
          style={{
            ...styles.smallSectionItem,
            backgroundImage:
              "url('https://www.shutterstock.com/image-photo/stylish-fashion-child-baby-girl-260nw-1769789042.jpg')",
          }}
        >
          <div style={styles.overlay}></div>
          <div style={styles.sectionContent}>
            <h2 style={styles.sectionTitle}>Trendy Kids' Collection</h2>
            <button style={styles.sectionButton}>View More</button>
          </div>
        </div>
        <div
          style={{
            ...styles.largeSectionItem,
            backgroundImage:
              "url('https://th.bing.com/th/id/OIP.vcUsqpCQzTNwZLvTkSuQZgHaEK?w=1000&h=562&rs=1&pid=ImgDetMain')",
          }}
        >
          <div style={styles.overlay}></div>
          <div style={styles.sectionContent}>
            <h2 style={styles.sectionTitle}>Footwear for All Seasons</h2>
            <button style={styles.sectionButton}>View More</button>
          </div>
        </div>
      </div>

      {/* Info Section Below */}
      <div style={styles.infoSection}>
        <div style={styles.infoItem}>
          <FontAwesomeIcon icon={faShippingFast} style={styles.icon} />
          <p>FREE SHIPPING WORLDWIDE</p>
        </div>
        <div style={styles.infoItem}>
          <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
          <p>100% MONEY BACK GUARANTEE</p>
        </div>
        <div style={styles.infoItem}>
          <FontAwesomeIcon icon={faCreditCard} style={styles.icon} />
          <p>MANY PAYMENT GATEWAYS</p>
        </div>
        <div style={styles.infoItem}>
          <FontAwesomeIcon icon={faHeadset} style={styles.icon} />
          <p>24/7 ONLINE SUPPORT</p>
        </div>
      </div>

      {/* Quote Section Below */}
      <div style={styles.quoteSection}>
        <div style={styles.quoteContainer}>
          <p style={styles.quoteText}>
            "Fashion is the armor to survive the reality of everyday life."
          </p>
          <p style={styles.quoteAuthor}>- Bill Cunningham</p>
        </div>
      </div>

      {/* Footer Section */}
      <div style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>CATEGORIES</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>Men's Clothing</li>
              <li style={styles.footerListItem}>Women's Clothing</li>
              <li style={styles.footerListItem}>Baby</li>
              <li style={styles.footerListItem}>Beauty</li>
              <li style={styles.footerListItem}>Kids</li>
              <li style={styles.footerListItem}>Shoes</li>
              <li style={styles.footerListItem}>Jewelery</li>
            </ul>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>BRAND</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>About Us</li>
              <li style={styles.footerListItem}>Careers</li>
              <li style={styles.footerListItem}>Gift Cards</li>
              <li style={styles.footerListItem}>Watch and Jewelry Care</li>
            </ul>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>CUSTOMER CARE</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>FAQ</li>
              <li style={styles.footerListItem}>Payment</li>
              <li style={styles.footerListItem}>Shipping</li>
              <li style={styles.footerListItem}>Returns</li>
              <li style={styles.footerListItem}>Warranty</li>
              <li style={styles.footerListItem}>Contact</li>
            </ul>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>CONTACT US</h4>
            <p>Call: +1 (888) 658 5054 (toll free)</p>
            <p>WhatsApp: +49 1525 5174862</p>
            <p>Email: support@example.com</p>
            <p>Mon to Fri 11 AM - 7 PM (PST)</p>
          </div>
          {/* {/* <div style={styles.footerColumn}> */}
          {/* <h4 style={styles.footerHeading}>MY ACCOUNT</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>Login</li>
              <li style={styles.footerListItem}>Register</li>
            </ul> */}
          {/* </div>  */}
        </div>
        <div style={styles.footerBottom}>
          <div style={styles.socialIcons}>
            <i className="fab fa-facebook-f" style={styles.socialIcon}></i>
            <i className="fab fa-pinterest-p" style={styles.socialIcon}></i>
            <i className="fab fa-instagram" style={styles.socialIcon}></i>
            <i className="fab fa-snapchat-ghost" style={styles.socialIcon}></i>
            <i className="fab fa-youtube" style={styles.socialIcon}></i>
            <i className="fab fa-linkedin-in" style={styles.socialIcon}></i>
            <i className="fab fa-tiktok" style={styles.socialIcon}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
