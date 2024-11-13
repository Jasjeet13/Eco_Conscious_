const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const validateLogin = require("../Middlewares/validateLogin");
const comparePassword = require("../Middlewares/comparePassword");
const User = require("../models/user");
const dotenv = require('dotenv');
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;;

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

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send token in the response body instead of using cookies
    res.status(200).json({
      message: 'Login successful',
      token: token,  // Include the token in the response body
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;