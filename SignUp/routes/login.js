const express = require('express');
const router = express.Router();
const validateLogin = require("../Middlewares/validateLogin");
const comparePassword = require("../Middlewares/comparePassword");
const User = require("../models/user");



// Handle login form submission
router.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', id: user._id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;
