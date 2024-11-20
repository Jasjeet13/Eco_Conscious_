import React from "react";

const SecondaryNavbar = ({ currentCategory, onSortSelect, onFilterSelect }) => {
  return (
    <div style={styles.navbar}>
      <div style={styles.left}>
        <span style={styles.category}>{currentCategory}</span>
      </div>
      <div style={styles.right}>
      <select onChange={(e) => onSortSelect(e.target.value)} style={styles.dropdown}>
          <option value="">Sort By</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
        </select>
        <select onChange={(e) => onFilterSelect(e.target.value)} style={styles.dropdown}>
          <option value="">Filter by Environmental Criteria</option>
          <option value="low_carbon_footprint">Low Carbon Footprint</option>
          <option value="material_sourcing_good">Material Sourcing: Good</option>
          <option value="material_sourcing_better">Material Sourcing: Better</option>
          <option value="material_sourcing_best">Material Sourcing: Best</option>
          <option value="high_recyclability">Recyclability: High</option>
          <option value="low_water_usage">Water Usage: Low</option>
          <option value="high_energy_efficiency">Energy Efficiency: High</option>
          <option value="biodegradability_high">Biodegradability: High</option>
        </select>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#f8f8f8",
    borderBottom: "1px solid #ddd",
    margin:"85px 0px 10px 70px",
  },
  left: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  right: {
    display: "flex",
    gap: "15px",
  },
  dropdown: {
    padding: "8px",
    fontSize: "16px",
  },
  category: {
    fontWeight: "bold",
    fontSize: "22px",
    margin:"0px 0px 0px 40px",
  },
};

export default SecondaryNavbar;
