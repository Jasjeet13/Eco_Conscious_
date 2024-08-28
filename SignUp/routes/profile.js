const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to get the user profile by email
router.get('/:email', async (req, res) => {
  const email = req.params.email;
  console.log(`Received request for user profile with email: ${email}`);

  try {
    // Find the user by email
    const user = await User.getUserProfileByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data as JSON
    res.status(200).json({
      username: user.username,
      fullName: user.fullname,
      email: user.email,
      address: user.address,
      mobileNumber: user.phoneNumber,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching profile details' });
  }
});

module.exports = router;
