const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Order = require("../models/Order");
const authenticateToken = require("../Middlewares/tokenAuthentication");

router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity, price, fromCart } = req.body;

    let orderItems = [];
    let totalPrice = 0;

    if (fromCart) {
      const cartItems = await Cart.find({ userId });

      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Your cart is empty!" });
      }

      orderItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        image: item.productId.image,
      }));

      totalPrice = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      await Cart.deleteMany({ userId }).catch((error) => {
        console.error("Error clearing cart:", error);
      });
    } else {
      orderItems = [
        {
          productId,
          quantity,
          price,
          image: req.body.image,
        },
      ];
      totalPrice = price * quantity;
    }

    const order = new Order({
      userId,
      items: orderItems,
      totalPrice,
      createdAt: new Date(),
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order. Please try again." });
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

module.exports = router;