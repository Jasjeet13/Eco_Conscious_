import React from "react";
import "./Styles/SecondaryNavbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SecondaryNavbar = ({ currentCategory, onSortSelect, onFilterSelect }) => {
  return (
    <div className="secondary-navbar-container">
      {/* Category Name on the Left */}
      <div className="category-name">{currentCategory}</div>

      {/* Sort and Filter on the Right */}
      <div className="action-buttons">
        {/* Sort Dropdown */}
        <div
          className="secondary-navbar-menu"
          onMouseEnter={() => document.querySelector(".sort-menu").classList.add("visible")}
          onMouseLeave={() => document.querySelector(".sort-menu").classList.remove("visible")}
        >
          <div className="menu-button">Sort By
          <FontAwesomeIcon icon={faChevronDown}/>
          </div>
          <div className="dropdown-menu sort-menu">
            <div className="dropdown-item" onClick={() => onSortSelect("price_low_high")}>
              Price: Low to High
            </div>
            <div className="dropdown-item" onClick={() => onSortSelect("price_high_low")}>
              Price: High to Low
            </div>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div
          className="secondary-navbar-menu"
          onMouseEnter={() => document.querySelector(".filter-menu").classList.add("visible")}
          onMouseLeave={() => document.querySelector(".filter-menu").classList.remove("visible")}
        >
          <div className="menu-button">Filter By
          <FontAwesomeIcon icon={faChevronDown}/>
          </div>
          <div className="dropdown-menu filter-menu">
            <div className="dropdown-item" onClick={() => onFilterSelect("low_carbon_footprint")}>
              Low Carbon Footprint
            </div>
            <div className="dropdown-item" onClick={() => onFilterSelect("material_sourcing_good")}>
              Material Sourcing: Good
            </div>
            <div className="dropdown-item" onClick={() => onFilterSelect("material_sourcing_better")}>
              Material Sourcing: Better
            </div>
            <div className="dropdown-item" onClick={() => onFilterSelect("material_sourcing_best")}>
              Material Sourcing: Best
            </div>
            <div className="dropdown-item" onClick={() => onFilterSelect("high_recyclability")}>
              High Recyclability
            </div>
            <div className="dropdown-item" onClick={() => onFilterSelect("low_water_usage")}>
              Low Water Usage
            </div>
            <div className="dropdown-item" onClick={() => onFilterSelect("high_energy_efficiency")}>
              High Energy Efficiency
            </div>
            <div className="dropdown-item" onClick={() => onFilterSelect("high_biodegradability")}>
              High Biodegradability
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryNavbar;
