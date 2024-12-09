const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Order = require('../models/Order');
const authenticateToken = require('../Middlewares/tokenAuthentication');
const User = require("../models/user"); // Import the User model
const nodemailer = require("nodemailer"); // Import Nodemailer

// Place order endpoint
router.post('/place-order', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch cart items for the user
    const cartItems = await Cart.find({ userId }).populate('productId', 'name price image'); // Populate to get product details

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty!" });
    }

    // Prepare order items
    const orderItems = cartItems.map((item) => ({
      productId: item.productId._id,
      productName: item.productId.name, // Include product name
      quantity: item.quantity,
      price: item.productId.price,
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

    // Clear the cart
    await Cart.deleteMany({ userId }).catch((error) => {
      console.error("Error clearing cart:", error);
    });

    // Fetch user details
    const user = await User.findById(userId); // Fetch user's email
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jasjeet13.saini@gmail.com", // Your email
        pass: "isqa qbwy lrjc jfsr", // Your app-specific password
      },
    });

    // Email content
    const mailOptions = {
      from: `"EcoConscious" <jasjeet13.saini@gmail.com>`, // Sender's email
      to: user.email, // Recipient's email
      subject: "Order Confirmation",
      html: `
        <h3>Order Confirmation</h3>
        <p>Thank you for your order!</p>
        <h4>Order Details:</h4>
        <ul>
          ${orderItems
            .map(
              (item) =>
                `<li>Product: ${item.productName}</li><li>Quantity: ${item.quantity}</li><li>Price: $${item.price}</li>`
            )
            .join("")}
        </ul>
        <p><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</p>
      `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order. Please try again.' });
  }
});



router.get("/:orderId", authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "items.productId",
      "name price image"
    ); 

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Error fetching order data" });
  }
});

router.post("/buy-now", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity, price, image } = req.body;

    const orderItems = [
      {
        productId,
        quantity,
        price,
        image, // Include the image from the request body
      },
    ];

    const totalPrice = price * quantity;

    const order = new Order({
      userId,
      items: orderItems,
      totalPrice,
      createdAt: new Date(),
    });

    await order.save();

    // Get user details (e.g., email) from the database
    const user = await User.findById(userId); // Use the correct model name
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use the email service of your choice
      auth: {
        user: "jasjeet13.saini@gmail.com", // Your email
        pass: "isqa qbwy lrjc jfsr", // Your email password or app-specific password
      },
    });

    // Email content
    const mailOptions = {
      from: `"EcoConscious" <${process.env.EMAIL}>`, // Sender's email
      to: user.email, // Recipient's email (user's email)
      subject: "Order Confirmation",
      html: `
        <h3>Order Confirmation</h3>
        <p>Thank you for your order!</p>
        <h4>Order Details:</h4>
        <ul>
          ${orderItems
            .map(
              (item) =>
                `<li>Product ID: ${item.productId}</li><li>Quantity: ${item.quantity}</li><li>Price: $${item.price}</li>`
            )
            .join("")}
        </ul>
        <p><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</p>
      `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order. Please try again." });
  }
});

module.exports = router;