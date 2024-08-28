import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";

const ProfileDetails = () => {
  const { email } = useParams();
  console.log(`email received in ProfileDetails: ${email}`);

  // State to store the profile details
  const [profile, setProfile] = useState(null);

  // Fetch profile details from the backend when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) {
        console.error('No email provided');
        return;
      }
    
      try {
        const encodedEmail = encodeURIComponent(email);
        const response = await fetch(`http://localhost:3000/api/profile/${encodedEmail}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched profile data:', data);

          setProfile(data); 
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };    

    fetchProfile();
  }, [email]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const styles = {
    whole: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundImage: "",
    },
    container: {
      width: "800px",
      margin: "0 auto",
      height: "450px",
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
      marginLeft: "10px",
    },
    icon: {
      fontSize: "24px",
      paddingRight: "10px",
      opacity: "0.7"
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
      width: "calc(50% - 10px)",
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
      backgroundColor: "#c49b63",
      marginLeft: "20px",
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
          <span style={styles.value}>{profile.username || 'N/A'}</span>
        </div>
        <div style={styles.detailGroup}>
          <span style={styles.label}>Full Name</span>
          <span style={styles.value}>{profile.fullName || 'N/A'}</span>
        </div>
        <div style={styles.detailGroup}>
          <span style={styles.label}>Mobile Number</span>
          <span style={styles.value}>{profile.mobileNumber || 'N/A'}</span>
        </div>
        <div style={styles.detailGroup}>
          <span style={styles.label}>Email ID</span>
          <span style={styles.value}>{profile.email || 'N/A'}</span>
        </div>
        {/* <div style={styles.detailGroup}>
          <span style={styles.label}>Password</span>
          <span style={styles.value}>
            {profile.password ? "*".repeat(profile.password.length) : 'N/A'}
          </span>
        </div> */}
        <div style={styles.detailGroup}>
          <span style={styles.label}>Address</span>
          <span style={styles.value}>{profile.address || 'N/A'}</span>
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
