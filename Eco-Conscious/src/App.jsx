import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SignUp_Login from "./Components/SignUp_Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import ProfileDetails from "./Components/ProfileDetails";
import ProductProfile from "./Components/ProductProfile";
import ProductList from "./Components/ProductList";
import Edit from "./Components/Edit";
import Footer from "./Components/Footer";
import Wishlist from "./Components/Wishlist";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine if Footer should be displayed
  const showFooter = !(
    currentPath === "/" ||
    currentPath === "/signup" ||
    currentPath.startsWith("/profile/") ||
    currentPath.startsWith("/edit/")
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp_Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products/:category/:id" element={<ProductProfile />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/wishlist" element={<Wishlist />} />

      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
