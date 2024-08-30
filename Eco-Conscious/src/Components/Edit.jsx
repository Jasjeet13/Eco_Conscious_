import React from "react";

const Edit = () => {
  const styles = {
    mainbox: {
      backgroundColor: "#f5f1eb",
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    loginBox: {
      padding: "5px 40px",
      boxShadow: "5px 0 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "50%",
      borderRadius: "20px",
      backgroundColor: "#ffffff",
    },
    inputGroupContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "5px",
    },
    fullWidthInputGroup: {
      flexBasis: "90%",
      marginBottom: "15px",
      textAlign: "left",
    },
    halfWidthInputGroup: {
      flexBasis: "49%",
      marginBottom: "20px",
      textAlign: "left",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      fontSize: "14px",
    },
    input: {
      padding: "10px",
      width: "100%",
      borderRadius: "0px",
      border: "none",
      borderBottom: "1px solid #ccc",
      fontSize: "16px",
      backgroundColor: "transparent",
    },
    input2: {
      padding: "10px",
      width: "82%",
      borderRadius: "0px",
      border: "none",
      borderBottom: "1px solid #ccc",
      fontSize: "16px",
      backgroundColor: "transparent",
    },
    button: {
      backgroundColor: "#c49b63",
      color: "white",
      padding: "15px",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      borderRadius: "30px",
      marginTop: "30px",
      width: "25%",
    },
    heading: {
      fontSize: "28px",
      fontWeight: "500",
      marginBottom: "30px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.mainbox}>
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>Edit Details</h2>
        <form>
          <div style={styles.inputGroupContainer}>
            <div style={styles.halfWidthInputGroup}>
              <label htmlFor="username" style={styles.label}>
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                name="username"
                style={styles.input2} // Adjusted to match the underline length
              />
            </div>
            <div style={styles.halfWidthInputGroup}>
              <label htmlFor="fullname" style={styles.label}>
                FULL NAME
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                style={styles.input2} // Adjusted to match the underline length
              />
            </div>
            <div style={styles.fullWidthInputGroup}>
              <label htmlFor="email" style={styles.label}>
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                style={styles.input}
              />
            </div>
            <div style={styles.fullWidthInputGroup}>
              <label htmlFor="address" style={styles.label}>
                ADDRESS
              </label>
              <input
                type="text"
                id="address"
                name="address"
                style={styles.input}
              />
            </div>
            <div style={styles.fullWidthInputGroup}>
              <label htmlFor="phoneNumber" style={styles.label}>
                PHONE NUMBER
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                style={styles.input}
              />
            </div>
          </div>
          <button type="submit" style={styles.button}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
