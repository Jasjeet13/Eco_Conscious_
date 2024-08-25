const mongoose = require('mongoose');
const axios = require('axios');
const { faker } = require('@faker-js/faker');
const Product = require("./product");

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  async function seedProducts() {
    try {
      // Clear the existing products in the database
      await Product.deleteMany({});
      
      // Fetch data from Fake Store API
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data;
      
      // Generate additional fake products
      const numberOfAdditionalProducts = 80; 
      const additionalProducts = generateFakeProducts(numberOfAdditionalProducts);
  
      // Combine API data with additional fake products
      const allProducts = [...products, ...additionalProducts];
      
      // Add extra fields (e.g., inStock, environmentalImpactScore) to each product
      const productsWithExtras = allProducts.map((product) => ({
        name: product.title || faker.commerce.productName(),
        description: product.description || faker.commerce.productDescription(),
        price: product.price || faker.commerce.price(),
        category: product.category || faker.commerce.department(),
        image: product.image || faker.image.imageUrl(),
        inStock: Math.random() < 0.7, // Randomly set inStock as true or false
        environmentalImpactScore: Math.floor(Math.random() * 100) + 1, // Random score between 1 and 100
      }));
      
      // Insert products into MongoDB
      await Product.insertMany(productsWithExtras);
      
      console.log('Database seeded with products from Fake Store API and additional fake products');
    } catch (err) {
      console.error('Error seeding products:', err);
    } finally {
      mongoose.connection.close();
    }
  }

  // Function to generate additional fake products
  function generateFakeProducts(numProducts) {
    const products = [];
    for (let i = 0; i < numProducts; i++) {
      products.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        image: faker.image.imageUrl(),
        inStock: Math.random() < 0.7, // Randomly set inStock as true or false
        environmentalImpactScore: Math.floor(Math.random() * 100) + 1, // Random score between 1 and 100
      });
    }
    return products;
  }
  
  seedProducts();