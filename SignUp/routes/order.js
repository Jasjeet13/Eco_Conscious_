const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Order = require('../models/Order');
const authenticateToken = require('../Middlewares/tokenAuthentication');

// Place order endpoint
router.post('/place-order', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming user ID is set from JWT in authenticate middleware
    const cartItems = await Cart.find({ userId });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty!' });
    }

    // Prepare items to include quantity and other details in the order
    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      image: item.productId.image,
    }));

    // Calculate total price
    const totalPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Create the order
    const order = new Order({
      userId,
      items: orderItems,
      totalPrice,
      createdAt: new Date(),
    });

    await order.save();

    // Clear cart after placing the order
    await Cart.deleteMany({ userId }).catch((error) => {
      console.error("Error clearing cart:", error);
    });

    res.status(201).json({ message: 'Order placed successfully!', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order. Please try again.' });
  }
});

// Fetch order details by orderId
router.get('/:orderId', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('items.productId', 'name price image'); // Populate product details (name, price, image)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order data' });
  }
});

router.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  // Query the database to find the product
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch(err => res.status(500).json({ message: 'Error retrieving product', error: err }));
});



module.exports = router;