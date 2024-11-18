import React, { useState } from "react";

const EnvironmentCriteria = ({ ecoScore, details }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={{ cursor: "pointer" }} onClick={toggleDetails}>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        Eco Score: {ecoScore}
      </p>
      {showDetails && (
        <div style={{ marginTop: "10px", lineHeight: "1.6", color: "#555" }}>
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
      )}
    </div>
  );
};

export default EnvironmentCriteria;
