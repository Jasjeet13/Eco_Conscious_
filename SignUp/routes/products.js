const express = require("express");
const router = express.Router();
const Product = require("../product"); // Adjust the path if necessary
const authenticateToken = require("../Middlewares/tokenAuthentication");

// Shuffle function to randomize the order
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// Route to fetch all products (protected by token authentication)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    const shuffledProducts = shuffleArray(products); // Shuffle the products array
    res.json(shuffledProducts); // Send the shuffled products as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to fetch a single product (protected by token authentication)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Fetch product by id
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product); // Send the product as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
