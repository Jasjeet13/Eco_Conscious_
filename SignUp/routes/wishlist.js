const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');

router.post('/add', async (req, res) => {
  try {
    const { productId, name, price, image, description } = req.body;
    const existingItem = await Wishlist.findOne({ productId });
    if (existingItem) {
      return res.status(200).json({ message: 'Product already in wishlist' });
    }
    const newWishlistItem = new Wishlist({ productId, name, price, image, description });
    await newWishlistItem.save();
    res.status(201).json({ message: 'Product added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch wishlist items
router.get('/', async (req, res) => {
  try {
    const wishlist = await Wishlist.find();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving wishlist' });
  }
});

// Remove item from wishlist
router.delete('/remove/:id', async (req, res) => {
  try {
    const result = await Wishlist.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;