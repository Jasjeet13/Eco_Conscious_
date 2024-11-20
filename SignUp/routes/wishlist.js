const express = require('express');
const router = express.Router();
const WishlistModel = require('../models/Wishlist'); 
const authenticateToken = require('../Middlewares/tokenAuthentication');

// Route to get the wishlist for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log("Fetching wishlist for user ID:", req.user.id); 
    // Fetch wishlist items for the logged-in user from the database
    const wishlistItems = await WishlistModel.find({ userId: req.user.id });
    console.log("Wishlist items fetched:", wishlistItems); 
    res.json(wishlistItems); // Send the wishlist items as a JSON response
  } catch (error) {
    console.error('Error fetching wishlist items:', error); 
    res.status(500).json({ message: 'Server error while fetching wishlist items' });
  }
});

// Route to add an item to the wishlist
router.post('/add', authenticateToken, async (req, res) => {
  const { productId, name, price, image, description } = req.body;

  // Log the request body to ensure it's being passed correctly
  console.log('Request Body:', req.body);

  try {
    // Check if the item already exists in the wishlist
    const existingItem = await WishlistModel.findOne({ userId: req.user.id, productId });

    if (existingItem) {
      return res.status(400).json({ message: 'Item already in wishlist' });
    }

    // Create a new wishlist item
    const newWishlistItem = new WishlistModel({
      userId: req.user.id,
      productId,
      name,
      price,
      image,
      description,
    });

    // Save the new item to the database
    await newWishlistItem.save();

    // Send a success response with the newly added item
    res.status(201).json({ message: 'Item added to wishlist', item: newWishlistItem });
  } catch (error) {
    console.error('Error adding item to wishlist:', error); 
    res.status(500).json({ message: 'Server error while adding item to wishlist' });
  }
});

// Route to remove an item from the wishlist
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  // Log the user and product info to ensure correct parameters
  console.log('Removing item for userId:', userId, 'and productId:', productId);

  try {
    // Try to find and delete the item from the wishlist
    const deletedItem = await WishlistModel.findOneAndDelete({
      userId: userId,
      productId: productId,
    });

    // If no item was found, return a 404 error
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }

    // Return a success response with the deleted item
    res.status(200).json({ message: 'Item removed from wishlist', item: deletedItem });
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
    res.status(500).json({ message: 'Server error while removing item from wishlist' });
  }
});

module.exports = router;