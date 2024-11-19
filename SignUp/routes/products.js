const express = require("express");
const router = express.Router();
const Product = require("../product");
const authenticateToken = require("../Middlewares/tokenAuthentication");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

router.get("/", authenticateToken, async (req, res) => {
  const { search, category } = req.query;

  try {
    let query = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query);

    const shuffledProducts = shuffleArray(products);

    res.json(shuffledProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/related", authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const relatedProducts = await Product.find({
      category: product.category, // Match by category
      _id: { $ne: product._id }, // Exclude the current product
    }).limit(3); // Limit to 3 alternatives

    res.json(relatedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
