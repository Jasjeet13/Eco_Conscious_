const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting profile with id: ${req.params.id}`);
  try {
    const deletedProfile = await User.findByIdAndDelete(id);
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting profile', error });
  }
});

module.exports = router;
