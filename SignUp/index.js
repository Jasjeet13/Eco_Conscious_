const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const signupRouter = require("./routes/signup"); 
const loginRouter = require("./routes/login");
const profileRouter = require("./routes/profile")
const productsRouter = require('./routes/products');
const editRouter = require("./routes/edit")
const deleteRouter = require("./routes/delete");
const errorHandler = require("./Middlewares/errorHandler");
const cors = require('cors');

const app = express();
const port = 3000;


// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
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

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/api/profile', profileRouter);
app.use('/api/products', productsRouter);
app.use('/api/edit',editRouter);
app.use('/api/delete',deleteRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
