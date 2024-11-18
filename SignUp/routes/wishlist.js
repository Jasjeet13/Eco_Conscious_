const express = require('express');
const router = express.Router();
const WishlistModel = require('../models/Wishlist'); 
const authenticateToken = require('../Middlewares/tokenAuthentication');


router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log("Fetching wishlist for user ID:", req.user.id); 
    const wishlistItems = await WishlistModel.find({ userId: req.user.id });
    console.log("Wishlist items fetched:", wishlistItems); 
    res.json(wishlistItems);//back to the client as a JSON response.
  } catch (error) {
    console.error('Error fetching wishlist items:', error); 
    res.status(500).json({ message: 'Server error while fetching wishlist items' });
  }
});


router.post('/add', authenticateToken, async (req, res) => {
  const { productId, name, price, image, description } = req.body;
  try {
    const existingItem = await WishlistModel.findOne({ userId: req.user.id, productId });
    if (existingItem) {
      return res.status(400).json({ message: 'Item already in wishlist' });
    }

    const newWishlistItem = new WishlistModel({
      userId: req.user.id,
      productId,
      name,
      price,
      image,
      description,
    });

    await newWishlistItem.save();
    res.status(201).json({ message: 'Item added to wishlist' });
  } catch (error) {
    console.error('Error adding item to wishlist:', error); 
    res.status(500).json({ message: 'Server error while adding item to wishlist' });
  }
});


router.delete('/remove/:productId', authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id; 
  console.log('Removing item for userId:', userId, 'and productId:', productId); 

  try {
    const deletedItem = await WishlistModel.findOneAndDelete({//mongoose functon filter and delete
      userId: userId,
      productId: productId
    });

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }

    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
    res.status(500).json({ message: 'Server error while removing item from wishlist' });
  }
});

module.exports = router;
