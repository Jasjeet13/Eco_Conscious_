import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import SignUp_Login from "./Components/SignUp_Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import ProfileDetails from "./Components/ProfileDetails";
import ProductProfile from "./Components/ProductProfile";
import ProductList from "./Components/ProductList";
import Edit from "./Components/Edit";
import Wishlist from "./Components/Wishlist";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Cart from './Components/Cart';
import Order from './Components/Order';
import OrderHistory from './Components/OrderHistory';
import SearchResults from "./Components/SearchResults";

function App() {
  // Check if the user is authenticated by looking for the token in localStorage
  const token = localStorage.getItem("token");

  // If there's no token, redirect to login page (this will also apply when the user logs out)
  const isAuthenticated = token !== null;

  // Get the current location (this will work now since we're inside Router)
  const location = useLocation();

  return (
    <>
      {/* Conditionally render Navbar */}
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<SignUp_Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfileDetails /> : <Navigate to="/" />}
        />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products/:category/:id" element={<ProductProfile />} />
        <Route path="/edit" element={isAuthenticated ? <Edit /> : <Navigate to="/" />} />
        <Route path="/wishlist" element={isAuthenticated ? <Wishlist />:<Navigate to="/" />} />
        <Route path="/cart" element={isAuthenticated ? <Cart />:<Navigate to="/" />} />
        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/search/:term" element={<SearchResults />} />
        <Route path="/order-history"  element={isAuthenticated ? <OrderHistory /> : <Navigate to="/" />}/>

      </Routes>

      {/* Conditionally render Footer */}
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

// Wrapping the entire app with Router
const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
