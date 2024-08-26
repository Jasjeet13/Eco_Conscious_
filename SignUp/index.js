const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require("./user"); // User model
const validateSignup = require("./Middlewares/validateSignup");
const hashPassword = require("./Middlewares/hashPassword");
const errorHandler = require("./Middlewares/errorHandler");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// Serve the signup page
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// Handle form submission
app.post('/signup', validateSignup, hashPassword, async (req, res) => {
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

    res.send('Signup successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error signing up');
  }
});

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});