const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const profileRouter = require("./routes/profile");
const productsRouter = require("./routes/products");
const editRouter = require("./routes/edit");
const deleteRouter = require("./routes/delete");
const wishlistRouter = require("./routes/wishlist");
const cartRouter = require("./routes/cart");
const orderRoutes = require("./routes/order");
const orderhistoryRoutes = require("./routes/orderhistory");
const bestProductRouter = require("./routes/bestProduct");

const errorHandler = require("./Middlewares/errorHandler");
const searchRouter = require("./routes/search");
const alternativeRouter = require("./routes/alternative");
const authenticateToken = require("./Middlewares/tokenAuthentication");

dotenv.config();

const app = express();
const port = process.env.PORT || process.env.PORT || 3000;


mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB Connection Error:", error.message));


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));


app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/api/profile", authenticateToken, profileRouter);
app.use("/api/products", authenticateToken, productsRouter);
app.use("/api/edit", authenticateToken, editRouter);
app.use("/api/delete", authenticateToken, deleteRouter);
app.use("/api/wishlist", authenticateToken, wishlistRouter);
app.use("/api/cart", authenticateToken, cartRouter); 
app.use("/api/order", authenticateToken, orderRoutes);
app.use("/api/search", searchRouter);
app.use("/api/alternatives", alternativeRouter);
app.use("/api/order-history", authenticateToken, orderhistoryRoutes);
app.use("/api/bestproduct", authenticateToken, bestProductRouter);


app.use(errorHandler);


app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
