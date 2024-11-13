const mongoose = require('mongoose');

// Define the schema for the product model
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  inStock: Boolean,
  environmentalImpactScore: Number,
  category: String, // Added category field
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // Link to the user who created the product
  },
});

// Create and export the Product model using the schema
module.exports = mongoose.model('Product', productSchema);
