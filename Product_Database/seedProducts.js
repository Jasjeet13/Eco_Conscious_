const mongoose = require('./db');
const Product = require('./product');
const axios = require('axios');

// Array of categories you want to filter
const desiredCategories = ["men's clothing", "women's clothing", "beauty", "shoes"];

// Map of Fake Store API categories to your categories (if needed)
const categoryMap = {
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
  "beauty": "Beauty", 
  "shoes": "Shoes"
};

const fetchAndSeedProducts = async () => {
  try {
    // Fetch products from the Fake Store API
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    // Clear the existing products in the database
    await Product.deleteMany({});
    console.log('Cleared the existing products.');

    // Filter and format the products based on the desired categories
    const filteredProducts = products
      .filter(product => desiredCategories.includes(product.category))
      .map(product => ({
        name: product.title,
        description: product.description,
        price: product.price,
        category: categoryMap[product.category] || product.category,
        image: product.image,
        inStock: true, // Assuming all products are in stock
        environmentalImpactScore: Math.floor(Math.random() * 100) + 1, // Random score between 1 and 100
      }));

    // Insert the filtered products into the database
    await Product.insertMany(filteredProducts);
    console.log(`Inserted ${filteredProducts.length} products into the database.`);

    // Close the MongoDB connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error fetching or seeding products:', err);
    mongoose.connection.close();
  }
};

fetchAndSeedProducts();
