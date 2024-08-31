import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Home from './components/Home';
import SignUp_Login from './Components/SignUp_Login';
import ProfileDetails from './Components/ProfileDetails';
import ProductList from './Components/ProductList';
import ProductProfile from './Components/ProductProfile';
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

        {/* Add other routes here */}
      </Routes>
    </Router>
  //   <div>
  //   <Edit />
  // </div>
  );
}

export default App;
