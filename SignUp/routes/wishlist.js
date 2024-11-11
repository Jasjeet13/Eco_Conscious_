// routes/wishlist.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');

router.post('/add', async (req, res) => {
  try {
    const { productId, name, price, image, description } = req.body;
    const newWishlistItem = new Wishlist({ productId, name, price, image, description });
    await newWishlistItem.save();
    res.json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
    try {
      const wishlist = await Wishlist.find(); // Fetch data from MongoDB
      res.json(wishlist); // Ensure JSON is returned
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving wishlist' });
    }
  });
  
  router.delete('/remove/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Wishlist.findByIdAndDelete(id); // Remove item by ID
      if (!result) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item removed from wishlist' });
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
