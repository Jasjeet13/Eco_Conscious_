const express = require('express');
const router = express.Router();
const User = require('../models/user'); 

// PUT route to update user details
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, fullName, email, address, phoneNumber } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, fullName, email, address, phoneNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
