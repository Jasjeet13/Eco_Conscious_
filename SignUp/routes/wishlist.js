// routes/wishlist.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');

// Add item to wishlist if not already present
router.post('/add', async (req, res) => {
  try {
    const { productId, name, price, image, description } = req.body;

    // Check if the item is already in the wishlist
    const existingItem = await Wishlist.findOne({ productId });
    if (existingItem) {
      return res.status(200).json({ message: 'Product already in wishlist' });
    }

    // If not present, add the new item
    const newWishlistItem = new Wishlist({ productId, name, price, image, description });
    await newWishlistItem.save();
    res.status(201).json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all wishlist items
router.get('/', async (req, res) => {
  try {
    const wishlist = await Wishlist.find();
    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving wishlist' });
  }
});

// Remove item from wishlist
router.delete('/remove/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Wishlist.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports=router;