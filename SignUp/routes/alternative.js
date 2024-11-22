const express = require("express");
const router = express.Router();
const Product = require("../product");
const authenticateToken = require("../Middlewares/tokenAuthentication");

// Route to fetch alternative products
router.get("/:category/:id", authenticateToken, async (req, res) => {
  const { category, id } = req.params;

  try {
    // Fetch the current product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Use the productType, ecoScore, and category to find alternatives
    const alternatives = await Product.find({
      category, // Match the same category
      _id: { $ne: id }, // Exclude the current product
      productType: product.productType, // Match the same productType
      ecoScore: { $gt: product.ecoScore }, // Match products with a higher ecoScore
    });

    res.json(alternatives); // Return the filtered alternatives
  } catch (error) {
    console.error("Error while fetching alternatives:", error); // Log the error
    res.status(500).json({ message: "Failed to fetch alternatives", error });
  }
});

module.exports = router;
