const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require("./user"); // User model
const validateSignup = require("./Middlewares/validateSignup");
const validateLogin = require("./Middlewares/validateLogin");
const hashPassword = require("./Middlewares/hashPassword");
const comparePassword = require("./Middlewares/comparePassword");
const errorHandler1 = require("./Middlewares/errorHandler1"); 
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

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Handle login form submission
app.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    // Compare the password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Incorrect password');
    }

    res.send('Login successful');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error logging in');
  }
});

// Error handling middleware
app.use(errorHandler);
app.use(errorHandler1);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});