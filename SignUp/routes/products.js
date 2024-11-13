const express = require('express');
const router = express.Router();
const Product = require('../product'); // Adjust the path as necessary
const authenticateToken = require("../Middlewares/tokenAuthentication");

router.get('/', authenticateToken, async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.json(products); // Send the products as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to fetch a single product (protected by token authentication)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Fetch product by id
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product); // Send the product as a JSON response
    console.log(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;