import React, { useEffect, useState } from "react"; //importing useEffect and UseEffect hook from react library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //importing FontAwsomeIcons from the fortawesome/react-fontwaesome library
import { faUser } from "@fortawesome/free-solid-svg-icons"; //importing feUser
import { useParams, useNavigate } from "react-router-dom"; //importing useParams and useNavigate from react-router-dom library

/*
userEffect - handles effect after some chages, used while fetching data or manually updating dom,
by default it runs on each 
useState - changes the state of the component, returns two things 1. current state 2. function that updates the state

*/

const ProfileDetails = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        console.error("No token provided");
        navigate("/login"); // Redirect to login if no token is available
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Profile deleted successfully");
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete profile:", errorData.message || errorData);
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

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
      padding: "60px",
      backgroundColor: "#ffffff",
      boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
      //borderRadius: "40px",
    },
    headingContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "10px",
    },
    heading: {
      fontSize: "30px",
      marginLeft: "20px",
      color: "#333",
    },
    icon: {
      fontSize: "32px",
      color: "#333",
      opacity: "0.8",
    },
    detailGroup: {
      marginBottom: "30px",
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #ddd",
      paddingBottom: "10px",
    },
    label: {
      fontSize: "18px",
      color: "#444",
    },
    value: {
      fontSize: "18px",
      color: "#777",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    button: {
      width: "45%",
      height: "60px",
      padding: "15px",
      //backgroundColor:"white",
      backgroundColor: "#ace1af",
      color: "#333",
      border: "none",
      // borderRadius: "30px",
      fontSize: "18px",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.3s ease",
      textAlign: "center",
    },
    buttonHover: {
      backgroundColor: "#007F4E",
      transform: "scale(1.05)",
    },
  };

  return (
    <div style={styles.whole}>
      <div style={styles.container}>
        <div style={styles.headingContainer}>
          <FontAwesomeIcon icon={faUser} style={styles.icon} />
          <h2 style={styles.heading}>Profile Details</h2>
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
          <span style={styles.label}>Address</span>
          <span style={styles.value}>{profile.address}</span>
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={() => navigate(`/edit`)}>EDIT</button>
          <button style={styles.button} onClick={handleDelete}>DELETE ACCOUNT</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
