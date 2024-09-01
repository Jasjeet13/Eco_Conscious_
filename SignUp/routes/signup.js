const express = require('express');
const router = express.Router();
const validateSignup = require("../Middlewares/validateSignup");
const hashPassword = require("../Middlewares/hashPassword");
const User = require("../models/user");

// Handle signup form submission
router.post('/', validateSignup, hashPassword, async (req, res) => {
  const { username, fullname, email, password, address, phoneNumber } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      // Check if username is taken
      if (existingUser.username === username) {
        message= 'Username is already taken'
      }
      // Check if email is taken
      if (existingUser.email === email) {
        message = 'Email is already taken'
      }
    }

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

    // Respond with a success message and user ID
    res.status(200).json({ message: 'Signup successful', id: user.id });
  } catch (error) {
    console.error(error);
    // Return a generic error message for any unexpected errors
    res.status(500).json({ message: message});
  }
});

module.exports = router;
