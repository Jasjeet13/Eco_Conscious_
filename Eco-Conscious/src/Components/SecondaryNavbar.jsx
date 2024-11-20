import React from "react";
import "./Styles/SecondaryNavbar.css" ;

const SecondaryNavbar = ({ currentCategory, onSortSelect, onFilterSelect }) => {
  return (
    <div className="navbar">
      <div className="category-container">
        <span className="category">{currentCategory}</span>
      </div>
      <div className="dropdown-container">
        <div className="dropdown-wrapper">
          <label className="label">Sort By:</label>
          <select
            onChange={(e) => onSortSelect(e.target.value)}
            className="dropdown"
          >
            <option value="">Select</option>
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
          </select>
        </div>
        <div className="dropdown-wrapper">
          <label className="label">Filter:</label>
          <select
            onChange={(e) => onFilterSelect(e.target.value)}
            className="dropdown"
          >
            <option value="">Select Environmental Criteria</option>
            <option value="low_carbon_footprint">Low Carbon Footprint</option>
            <option value="material_sourcing_good">
              Material Sourcing: Good
            </option>
            <option value="material_sourcing_better">
              Material Sourcing: Better
            </option>
            <option value="material_sourcing_best">
              Material Sourcing: Best
            </option>
            <option value="high_recyclability">Recyclability: High</option>
            <option value="low_water_usage">Water Usage: Low</option>
            <option value="high_energy_efficiency">Energy Efficiency: High</option>
            <option value="biodegradability_high">Biodegradability: High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SecondaryNavbar;
