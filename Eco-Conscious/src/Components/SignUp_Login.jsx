import React, { useState } from "react";

const SignUp_Login = () => {
  const [error, setError] = useState(""); // State to handle error messages

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Read the response as JSON
        throw new Error(errorData.message); // Use the message from the response
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Assuming the ID is returned as part of the response, use it to navigate to the /home/id route
      const userId = data.id; // Adjust based on your response structure
      window.location.href = `/home/${userId}`;
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message); // Set error message to state
    }
  };

  const handleSignUp = () => {
    // Redirect to the signup route
    window.location.href = `/signup`;
  };

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
    },
    signupBox: {
      backgroundImage:
        'url("https://th.bing.com/th/id/OIP.R6RJRL-qjPMgAizSTVRwowHaG2?w=535&h=495&rs=1&pid=ImgDetMain")', // Replace with your image URL
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
      padding: "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    signupContent: {
      textAlign: "center",
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    inputGroup: {
      marginBottom: "30px",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      fontSize: "14px",
      color: "black",
    },
    input: {
      width: "100%",
      padding: "15px",
      borderRadius: "0px",
      border: "none",
      borderBottom: "1px solid #ccc",
      fontSize: "16px",
      backgroundColor: "transparent",
    },
    button: {
      backgroundColor: "#c49b63",
      color: "white",
      padding: "15px 30px",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      borderRadius: "30px",
      marginBottom: "10px",
    },
    heading: {
      fontSize: "30px",
      fontWeight: "500",
      marginBottom: "20px",
      textAlign: "center",
    },
    paragraph: {
      fontSize: "20px",
      fontWeight: "400",
      marginBottom: "60px",
    },
    buttonSignUp: {
      backgroundColor: "transparent",
      color: "white",
      padding: "15px 30px",
      border: "2px solid white",
      cursor: "pointer",
      fontSize: "18px",
      borderRadius: "30px",
      marginBottom: "20px",
      textAlign: "center",
    },
    error: {
      color: "red",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.box, ...styles.loginBox }}>
        <div>
          <h2 style={styles.heading}>Welcome back :)</h2>
          {error && <div style={styles.error}>{error}</div>}{" "}
          {/* Display error message */}
          <form onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
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
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>
              SIGN IN
            </button>
          </form>
        </div>
      </div>
      <div style={{ ...styles.box, ...styles.signupBox }}>
        <div style={styles.overlay}></div>
        <div style={styles.signupContent}>
          <h1 style={styles.heading}>New here?</h1>
          <p style={styles.paragraph}>
            Sign up and unlock a range of eco-friendly <br></br>products for a
            greener shopping experience!
          </p>
          <button style={styles.buttonSignUp} onClick={handleSignUp}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp_Login;
