import React from "react";

const SignUp = () => {
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
      backgroundColor: "#ffffff", // Add a background color to make the box visible
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
      width: "100%", // Default for full-width inputs
      borderRadius: "0px",
      border: "none",
      borderBottom: "1px solid #ccc",
      fontSize: "16px",
      backgroundColor: "transparent",
    },
    input2: {
      padding: "10px",
      width: "82%", // Default for full-width inputs
      borderRadius: "0px",
      border: "none",
      borderBottom: "1px solid #ccc",
      fontSize: "16px",
      backgroundColor: "transparent",
    },
    halfWidthInput: {
      width: "70%", // Reduced width for half-width inputs
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
        <h2 style={styles.heading}>Sign Up</h2>
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
                required
                style={styles.input2}
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
                required
                style={styles.input2}
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
                required
                style={styles.input}
              />
            </div>
            <div style={styles.halfWidthInputGroup}>
              <label htmlFor="password" style={styles.label}>
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                style={styles.input2}
              />
            </div>
            <div style={styles.halfWidthInputGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                style={styles.input2}
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
                required
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
                required
                style={styles.input}
              />
            </div>
          </div>
          <button type="submit" style={styles.button}>
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
