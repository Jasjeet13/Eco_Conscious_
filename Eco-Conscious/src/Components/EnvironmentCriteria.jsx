import React, { useEffect, useState, useRef } from "react";

const EnvironmentCriteria = ({ ecoScore, details }) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [isBoxOpen, setIsBoxOpen] = useState(false); // Track whether the box is open
  const boxRef = useRef(null); // Reference to the message box
  const buttonRef = useRef(null); // Reference to the button

  // Simulate percentage calculation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScore((prev) => {
        if (prev >= ecoScore) {
          clearInterval(interval);
          return ecoScore;
        }
        return prev + 1;
      });
    }, 20); // Speed of animation
    return () => clearInterval(interval);
  }, [ecoScore]);

  // Close the box if user clicks outside the button or box
  const handleClickOutside = (event) => {
    if (
      boxRef.current &&
      !boxRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsBoxOpen(false);
    }
  };

  // Open/Close the box on button click
  const handleButtonClick = () => {
    setIsBoxOpen((prev) => !prev);
  };

  useEffect(() => {
    // Add event listener to handle clicks outside
    document.addEventListener("click", handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{ textAlign: "center", margin: "20px 0", position: "relative" }}
    >
      {/* Circular Button with Progress Outline */}
      <div
        onClick={handleButtonClick} // Toggle box open/close on button click
        ref={buttonRef}
        style={{
          position: "relative",
          width: "90px",
          marginBottom: "35px",
          height: "90px",
          borderRadius: "50%",
          backgroundColor: "#e7f5e1",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {/* Progress Outline */}
        <svg
          width="90"
          height="90"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            transform: "rotate(-90deg)",
          }}
        >
          <circle
            cx="45"
            cy="45"
            r="41"
            stroke="#e7f5e1" // Background circle color
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="45"
            cy="45"
            r="41"
            stroke="#76c893" // Progress circle color
            strokeWidth="8"
            fill="none"
            strokeDasharray="251" // Circumference of the circle
            strokeDashoffset={251 - (251 * currentScore) / 100} // Offset for progress
            style={{ transition: "stroke-dashoffset 0.2s ease" }}
          />
        </svg>
        {/* Text Inside Circle */}
        <div
          style={{
            zIndex: "2",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#76c893",
            textAlign: "center",
          }}
        >
          <div>Eco Score</div>
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            {currentScore}%
          </div>
        </div>
      </div>

      {/* Details Box that appears on click */}
      {isBoxOpen && (
        <div
          ref={boxRef}
          style={{
            position: "absolute",
            top: "140%",
            left: "-355px", // Position it to the left of the button
            transform: "translateY(-50%)", // Center it vertically
            width: "300px",
            backgroundColor: "#ffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 10, // Ensure it's above other content
            textAlign: "left",
            opacity: 1,
            visibility: isBoxOpen ? "visible" : "hidden",
            transition: "visibility 0.2s ease-in-out, opacity 0.2s ease-in-out", // Smooth transition
            border: "2px solid #76c893", // Border for message box
          }}
        >
          {/* Beak-like Outline */}
          <div
            style={{
              position: "absolute",
              left: "100%", // Position the beak at the right edge of the box
              top: "30%",
              transform: "translateY(-50%)",
              height: "2px",
              borderLeft: "20px solid #76c893", // The color of the beak
              borderTop: "15px solid transparent", // Create the beak shape
              borderBottom: "15px solid transparent", // Create the beak shape
            }}
          />

          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#76c893" }}>
            Environmental Criteria
          </h3>
          <div style={{ lineHeight: "1.6", color: "#333" }}>
            <p>
              <strong>Carbon Footprint:</strong> {details.carbonFootprint}
            </p>
            <p>
              <strong>Material Sourcing:</strong> {details.materialSourcing}
            </p>
            <p>
              <strong>Recyclability:</strong> {details.recyclability}
            </p>
            <p>
              <strong>Water Usage:</strong> {details.waterUsage}
            </p>
            <p>
              <strong>Energy Efficiency:</strong> {details.energyEfficiency}
            </p>
            <p>
              <strong>Biodegradability:</strong> {details.biodegradability}
            </p>
            <p>
              <strong>Durability:</strong> {details.durability}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentCriteria;
