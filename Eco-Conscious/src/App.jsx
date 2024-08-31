import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import ProductProfile from "./Components/ProductProfile";
import Products from "./Components/Products";
// import SignUp_Login from "./Components/SignUp_Login";
// import ProfileDetails from "./Components/ProfileDetails";
// import SignUp from "./Components/SignUp";
// import SignUp from "./Components/SignUp";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<SignUp_Login/>} />
    //     <Route path="/signup" element={<SignUp />} />
    //     <Route path="/home/:id" element={<Home />} />
    //     <Route path="/profile/:id" element={<ProfileDetails />} />
    //     <Route path="/products/:category" element={<ProductList />} />
    //     <Route path="/products/:category/:id" element={<ProductProfile />} />

    //     {/* Add other routes here */}
    //   </Routes>
    // </Router>
    <div>
      {/* <Home /> */}
      {/* <ProductProfile /> */}
      <Home />
    </div>
  );
}

export default App;
