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
  const { search, category } = req.query; // Get search and category from query params

  try {
    let query = {}; // Initial empty query

    // If category is provided, filter by category
    if (category) {
      query.category = category;
    }

    // If search term is provided, filter by product name
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Fetch products based on the query filters
    const products = await Product.find(query);

    // Shuffle the products array to randomize the order
    const shuffledProducts = shuffleArray(products);

    // Send the shuffled products as a JSON response
    res.json(shuffledProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to fetch a single product (protected by token authentication)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Fetch product by ID
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product); // Send the product as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
