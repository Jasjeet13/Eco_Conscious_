import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const id = responseData.id;
        console.log("Id received:", id);
        navigate("/home");
      } else {
        const responseData = await response.json();
        setError(responseData.message || "Signup failed");
      }
    } catch (error) {
      setError("Error during signup");
      console.error("Error during signup:", error);
    }
  };

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
      padding: "40px",
      boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "100%",
      maxWidth: "600px",
      //borderRadius: "8px",
      backgroundColor: "#ffffff",
    },
    inputGroupContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "20px",
    },
    halfWidthInputGroupContainer: {
      display: "flex",
      gap: "20px",
      width: "100%",
    },
    fullWidthInputGroup: {
      flexBasis: "100%",
      marginBottom: "20px",
      textAlign: "left",
      borderBottom: "1px solid #ccc",
    },
    halfWidthInputGroup: {
      flex: "1",
      textAlign: "left",
      borderBottom: "1px solid #ccc",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontSize: "16px",
      color: "#444",
    },
    input: {
      width: "100%",
      padding: "10px 0",
      fontSize: "16px",
      
      borderRadius: "0",
      border: "none",
      backgroundColor: "transparent",
      color: "#333",
    },
    button: {
      backgroundColor: "#007F4E",
      color: "white",
      padding: "15px",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      //borderRadius: "8px",
      width: "100%",
      maxWidth: "200px",
      marginTop: "10px",
      transition: "background-color 0.3s ease, transform 0.3s ease",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "530",
      marginTop:"0px",
      marginBottom: "29px",
      textAlign: "center",
      color: "#333",
    },
  };

  return (
    <div style={styles.mainbox}>
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>Sign Up</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.halfWidthInputGroupContainer}>
            <div style={styles.halfWidthInputGroup}>
              <label htmlFor="username" style={styles.label}>
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                style={styles.input}
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
                style={styles.input}
              />
            </div>
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
          <div style={styles.halfWidthInputGroupContainer}>
            <div style={styles.halfWidthInputGroup}>
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
            <div style={styles.halfWidthInputGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                style={styles.input}
              />
            </div>
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
          <button type="submit" style={styles.button}>
            SIGN UP
          </button>
        </form>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .halfWidthInputGroupContainer {
            flex-direction: column;
          }

          .loginBox {
            padding: 20px;
          }

          .heading {
            font-size: 20px;
          }

          .label,
          .input {
            font-size: 16px;
          }

          .button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .heading {
            font-size: 18px;
          }

          .label,
          .input {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default SignUp;
