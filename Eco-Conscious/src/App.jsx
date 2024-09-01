import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp_Login from "./Components/SignUp_Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import ProfileDetails from "./Components/ProfileDetails";
import ProductProfile from "./Components/ProductProfile";
import ProductList from "./Components/ProductList";
import Edit from "./Components/Edit";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp_Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products/:category/:id" element={<ProductProfile />} />
        <Route path="/edit/:id" element={<Edit/>}></Route>

        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
