import React from "react";

const SignUp_Login = () => {
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
    },
    box: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
    loginBox: {
      backgroundColor: "#f8f8f8",
      padding: "200px",
      boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
    },
    signupBox: {
      backgroundImage:
        'url("https://th.bing.com/th/id/OIP.R6RJRL-qjPMgAizSTVRwowHaG2?w=535&h=495&rs=1&pid=ImgDetMain")', // Replace this with your image URL
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "black",
      flexDirection: "column",
    },
    signupContent: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      flex: 1,
    },
    bottomContent: {
      marginTop: "auto",
    },
    inputGroup: {
      marginBottom: "10px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      width: "100%",
    },
    input: {
      width: "200%",
      padding: "12px",
      borderRadius: "6px",
      border: "1px solid #ddd",
    },
    button: {
      backgroundColor: "#5cb85c",
      padding: "15px 30px",
      border: "none",
      cursor: "pointer",
      fontSize: "20px",
      marginBottom: "20px",
      borderRadius: "30px",
    },
    buttonHover: {
      backgroundColor: "#4cae4c",
    },
    heading: {
      fontSize: "30px",
      fontWeight: "400",
    },
    paragraph: {
      fontSize: "20px",
      fontWeight: "300",
    },
    buttonSubmit: {
      backgroundColor: "#5cb85c",
      color: "black",
      padding: "15px 35px",
      border: "none",
      cursor: "pointer",
      fontSize: "20px",
      marginBottom: "20px",
      borderRadius: "30px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.box, ...styles.loginBox }}>
        <div>
          <h2 style={styles.heading}>Welcome Back :)</h2>
          <form>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="re-password" style={styles.label}>
                Re-Password
              </label>
              <input
                type="password"
                id="re-password"
                name="re-password"
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.buttonSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
      <div style={{ ...styles.box, ...styles.signupBox }}>
        <div style={styles.signupContent}>
          <div style={styles.topContent}>
            <h1 style={styles.heading}>New Here?</h1>
            <p style={styles.paragraph}>
              New to our eco-friendly store? <br></br>Sign up and start making
              sustainable choices!
            </p>
          </div>
          <div style={styles.bottomContent}>
            <button style={styles.button}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp_Login;
