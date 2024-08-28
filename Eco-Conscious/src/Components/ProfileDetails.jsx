import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ProfileDetails = () => {
  // State to store the profile details
  const [profile, setProfile] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    address: "",
    mobileNumber: "",
  });

  // Fetch profile details from the backend when the component mounts
  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/profile");
        const data = await response.json();

        // Update the state with the fetched data
        setProfile({
          username: data.username || "- not added -",
          fullName: data.fullName || "- not added -",
          email: data.email || "- not added -",
          password: data.password || "- not added -",
          address: data.address || "- not added -",
          mobileNumber: data.mobileNumber || "- not added -",
        });
      } catch (error) {
        console.error("Error fetching profile details:", error);
        // Handle error, possibly set some error state
      }
    };

    fetchProfileDetails();
  }, []);

  const styles = {
    whole: {
      display: "flex",
      backgroundColor: "#f5f1eb",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    },
    container: {
      width: "800px",
      margin: "0 auto",
      height: "auto",
      padding: "20px",
      backgroundColor: "#ffffff",
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    },
    headingContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "40px",
    },
    heading: {
      fontSize: "20px",
      fontWeight: "600",
      marginLeft: "10px", // Adds spacing between the icon and text
    },
    icon: {
      fontSize: "24px",
      paddingRight: "10px",
      opacity: "0.7" // Adjust size of the icon
    },
    detailGroup: {
      marginBottom: "15px",
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #eee",
      paddingBottom: "10px",
    },
    label: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#333",
    },
    value: {
      fontSize: "16px",
      color: "#666",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    button: {
      width: "calc(50% - 10px)", // Make buttons take up equal space
      // width:"100px",
      padding: "12px",
      backgroundColor: "#c49b63",
      color: "black",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      fontWeight: "400px",
      cursor: "pointer",
      textAlign: "center",
    },
    deleteButton: {
      backgroundColor: "#c49b63", // Red color for delete button
      marginLeft: "20px", // Space between buttons
    }
  };

  return (
    <div style={styles.whole}>
      <div style={styles.container}>
        <div style={styles.headingContainer}>
          <FontAwesomeIcon icon={faUser} style={styles.icon} />
          <h2 style={styles.heading}>
            Profile Details
          </h2>
        </div>
        <div style={styles.detailGroup}>
          <span style={styles.label}>Username</span>
          <span style={styles.value}>{profile.username}</span>
        </div>
        <div style={styles.detailGroup}>
          <span style={styles.label}>Full Name</span>
          <span style={styles.value}>{profile.fullName}</span>
        </div>
        <div style={styles.detailGroup}>
          <span style={styles.label}>Mobile Number</span>
          <span style={styles.value}>{profile.mobileNumber}</span>
        </div>
        <div style={styles.detailGroup}>
          <span style={styles.label}>Email ID</span>
          <span style={styles.value}>{profile.email}</span>
        </div>
        <div style={styles.detailGroup}>
          <span style={styles.label}>Password</span>
          <span style={styles.value}>
            {"*".repeat(profile.password.length)}
          </span>
        </div>
        <div style={styles.detailGroup}>
          <span style={styles.label}>Address</span>
          <span style={styles.value}>{profile.address}</span>
        </div>
        <div style={styles.buttonGroup}>
          <button style={styles.button}><b>EDIT</b></button>
          <button style={{ ...styles.button, ...styles.deleteButton }}><b>DELETE ACCOUNT</b></button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
