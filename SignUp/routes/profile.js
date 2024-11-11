const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Route to get the user profile by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`Received request for user profile with id: ${id}`); //for debugging only

  try {
    // Find the user by id, this function is defined in the User.js model
    const user = await User.getUserProfileById(id); //returns json object

    if (!user) {
      return res.status(404).json({ message: "User not found", id: user.id });
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
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching profile details" });
  }
});

module.exports = router;
