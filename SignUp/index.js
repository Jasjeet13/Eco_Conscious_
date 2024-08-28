const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const signupRouter = require('./routes/signup'); 
const loginRouter = require("./routes/login");
const errorHandler = require("./Middlewares/errorHandler");
const cors = require('cors');

const app = express();
const port = 3000;


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST' , 'PUT' , 'PATCH' , 'DELETE'], 
  credentials: true,
}));

app.options('*', cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Support JSON-encoded bodies
app.use(express.static('public')); // Serve static files

// Use the signup router
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
