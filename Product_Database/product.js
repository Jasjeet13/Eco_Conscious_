const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String, 
  inStock: Boolean,
  environmentalImpactScore: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;