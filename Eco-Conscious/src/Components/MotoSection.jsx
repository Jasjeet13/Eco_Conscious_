import React from "react";
import { FaLeaf, FaRecycle } from "react-icons/fa";
import "./Styles/MotoSection.css"

const MotoSection = () => {
  return (
    <div className="container">
      <div className="backgroundOverlay"></div>
      <div className="content">
        <div className="textContainer">
          <h2 className="heading">Our Commitment to Sustainability</h2>
          <p className="description">
            At Eco-Conscious, we are dedicated to promoting a greener future by
            offering sustainable products and practices. Join us in making a
            positive impact on the planet.
          </p>
          <button className="button_moto">Learn More</button>
        </div>
        <div className="iconContainer">
          <FaLeaf className="icon" />
          <FaRecycle className="icon" />
        </div>
      </div>
    </div>
  );
};

export default MotoSection;
