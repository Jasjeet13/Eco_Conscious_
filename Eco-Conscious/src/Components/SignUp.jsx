import React from "react";

const SignUp = () => {
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
    },
    box: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    loginBox: {
      backgroundColor: "#ffffff",
      padding: "60px 80px",
      boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "60%", // Adjusted to make space for two columns
    },
    inputGroupContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
    },
    fullWidthInputGroup: {
      flexBasis: "100%", // Full width for single input fields
      marginBottom: "15px",
      textAlign: "left", // Left-align labels for full-width fields
    },
    halfWidthInputGroup: {
      flexBasis: "48%", // Half width for two inputs in one row
      marginBottom: "15px",
      textAlign: "left",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      fontSize: "14px",
      color: "#333",
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
    halfWidthInput: {
      width: "70%", // Reduced width for half-width inputs
    },
    button: {
      backgroundColor: "#c49b63",
      color: "white",
      padding: "15px 30px",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      borderRadius: "30px",
      marginTop: "30px", // Adjusted for spacing after inputs
      width: "100%",
    },
    heading: {
      fontSize: "35px",
      fontWeight: "500",
      marginBottom: "20px",
    },
  };

  return (
    <>
      <div style={{ ...styles.box, ...styles.loginBox }}>
        <div>
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
                  style={{ ...styles.input, ...styles.halfWidthInput }}
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
                  style={{ ...styles.input, ...styles.halfWidthInput }}
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
                  style={{ ...styles.input, ...styles.halfWidthInput }}
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
                  style={{ ...styles.input, ...styles.halfWidthInput }}
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
    </>
  );
};

export default SignUp;
