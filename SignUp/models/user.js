const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures that the username is unique in the database
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that the email is unique in the database
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Define a static method to get user profile by email
userSchema.statics.getUserProfileByEmail = async function(email) {
  return this.findOne({ email: email }).exec();
};

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
