// models/wishlist.js
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    price: Number,
    image: String,
    description: String, // Ensure this line is here
  });
  
module.exports = mongoose.model('Wishlist', wishlistSchema);
