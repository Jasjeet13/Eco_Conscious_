const mongoose = require("mongoose");

// Define the schema for the product model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  inStock: { type: Boolean, required: true },

  //strings will be  like [high, medium, low]
  //numbers will be in %age and score basis
  carbonFootprint: { type: Number, required: true },
  materialSourcing: { type: String, required: true },
  recyclability: { type: Number, required: true },
  waterUsage: { type: String, required: true },
  energyEfficiency: { type: String, required: true },
  biodegradability: { type: Number, required: true },
  durability: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
