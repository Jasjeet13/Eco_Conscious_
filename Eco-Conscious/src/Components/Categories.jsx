import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Categories.css"; 

const Categories = () => {
  const navigate = useNavigate();
  const navigateToCategory = (category) => navigate(`/products/${category}`);

  return (
    <>
      <div className="outer_container">
        <h1>Shop By Categories</h1>

        <div className="categoriesContainer">
          <div
            className="categoryBox firstCategoryBox"
            style={{ backgroundImage: "url(/box1.png)" }} // Use direct path
          >
            <button
              className="button_categories"
              onClick={() => navigateToCategory("Clothing")}
            >
              Shop Now
            </button>
          </div>
          <div className="categoryBox secondCategoryBox">
            <div
              className="secondBoxChild1"
              style={{ backgroundImage: "url(/box2.png)" }} // Use direct path
            >
              <button
                className="button1"
                onClick={() => navigateToCategory("Beauty Products")}
              >
                Explore
              </button>
            </div>
            <div
              className="secondBoxChild2"
              style={{ backgroundImage: "url(/box3.png)" }} // Use direct path
            >
              <button
                className="button1"
                onClick={() => navigateToCategory("Bags")}
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        <div className="categoriesContainer">
          <div
            className="categoryBox secondCategoryBox1"
            id="categoryBox4"
            style={{ backgroundImage: "url(/box4.png)" }} // Use direct path
          ></div>
          <div
            className="categoryBox firstCategoryBox1"
            style={{ backgroundImage: "url(/box5.png)" }} // Use direct path
          >
            <button
              className="button_categories"
              onClick={() => navigateToCategory("Footwear")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
