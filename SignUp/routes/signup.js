const express = require('express');
const router = express.Router();
const validateSignup = require("../Middlewares/validateSignup");
const hashPassword = require("../Middlewares/hashPassword");
const User = require("../models/user");

// Handle signup form submission
router.post('/', validateSignup, hashPassword, async (req, res) => {
  const { username, fullname, email, password, address, phoneNumber } = req.body;

  try {
    // Create a new user
    const user = new User({
      username,
      fullname,
      email,
      password,
      address,
      phoneNumber,
    });

    // Save the user to the database
    await user.save();

    // Respond with a success message
    res.status(200).json({ message: 'Signup successful', email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error signing up' });
  }
});

module.exports = router;
