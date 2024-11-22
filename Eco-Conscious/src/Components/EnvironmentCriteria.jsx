import React, { useEffect, useState } from "react";

const EnvironmentCriteria = ({ ecoScore, details }) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      {/* Circular Button with Progress Outline */}
      <div
        onClick={openModal}
        style={{
          position: "relative",
          width: "90px", // Reduced by 25% from 120px to 90px
          height: "90px", // Reduced by 25% from 120px to 90px
          borderRadius: "50%",
          backgroundColor: "#ffffff",
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
            transform: "rotate(-90deg)", // Start progress from the top
          }}
        >
          <circle
            cx="45"
            cy="45"
            r="40"
            stroke="#eeeeee" // Background circle color
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="45"
            cy="45"
            r="40"
            stroke="#76c893" // Progress circle color
            strokeWidth="8"
            fill="none"
            strokeDasharray="251" // Circumference of the circle: 2 * π * radius (2 * π * 40)
            strokeDashoffset={251 - (251 * currentScore) / 100} // Offset for progress
            style={{ transition: "stroke-dashoffset 0.2s ease" }}
          />
        </svg>
        {/* Text Inside Circle */}
        <div
          style={{
            zIndex: "2",
            fontSize: "12px", // Reduced font size slightly for smaller button
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

      {/* Modal for Details */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: "1000",
            width: "80%",
            maxWidth: "500px",
            textAlign: "left",
          }}
        >
          <h2 style={{ margin: "0 0 10px 0", color: "#76c893" }}>
            Environmental Criteria
          </h2>
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
          <button
            onClick={closeModal}
            style={{
              backgroundColor: "#76c893",
              color: "white",
              padding: "10px 15px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
              float: "right",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#5da77a")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#76c893")}
          >
            Close
          </button>
        </div>
      )}

      {/* Overlay */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "999",
          }}
        ></div>
      )}
    </div>
  );
};

export default EnvironmentCriteria;

