import React, { useEffect, useState } from "react";

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
      backgroundColor:"#e2f1f9",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    //   backgroundImage:
        // 'url("https://img.freepik.com/premium-photo/metal-shopping-cart-grey-background-black-friday-sale-concept-banner_427957-3952.jpg://images.pexels.com/photos/5632396/pexels-photo-5632396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' // You can replace this with your background color or image
    },
    container: {
      width: "800px", // Increased width
      margin: "0 auto",
      height:"450px",
      padding: "20px",
      backgroundColor: "#ffffff",
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    },
    heading: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "20px",
      textAlign: "center",
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
    button: {
      display: "block",
      width: "200px",
      padding: "12px",
      backgroundColor: "#9dd2ec",
      color: "black",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      textAlign: "center",
      margin: "20px auto 0 auto", // Center the button
    },
  };

  return (
    <div style={styles.whole}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Profile Details</h2>
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
          <span style={styles.value}>{"*".repeat(profile.password.length)}</span>
        </div>
        <div style={styles.detailGroup}>
          <span style={styles.label}>Address</span>
          <span style={styles.value}>{profile.address}</span>
        </div>
        <button style={styles.button}>EDIT</button>
      </div>
    </div>
  );
};

export default ProfileDetails;
