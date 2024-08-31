import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const styles = {
    container: {
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
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
      gap: "20px",
      },
    socialIcon: {
      fontSize: "30px",
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "#333",
    },
  };

  return (
    <div>
      {/* Footer Section */}
      <div style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>CATEGORIES</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>Women's Wear</li>
              <li style={styles.footerListItem}>Men's Wear</li>
              <li style={styles.footerListItem}>Beauty</li>
              <li style={styles.footerListItem}>Shoes</li>
            </ul>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>CUSTOMER CARE</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>FAQ</li>
              <li style={styles.footerListItem}>About Us</li>
              <li style={styles.footerListItem}>Feedback</li>
            </ul>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>CONNECT</h4>
            <div style={styles.socialIcons}>
              <a href="https://www.facebook.com" style={styles.link}>
                <FaFacebookF style={styles.socialIcon} />
              </a>
              <a href="https://www.instagram.com" style={styles.link}>
                <FaInstagram style={styles.socialIcon} />
              </a>
              <a href="https://www.twitter.com" style={styles.link}>
                <FaTwitter style={styles.socialIcon} />
              </a>
              <a href="mailto:support@example.com" style={styles.link}>
                <FaEnvelope style={styles.socialIcon} />
              </a>
            </div>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>CONTACT US</h4>
            <p>Call: +1 (xxx) xxx xxx(toll free)</p>
            <p>Email: support@example.com</p>
            <p>Mon to Fri 11 AM - 7 PM (PST)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
