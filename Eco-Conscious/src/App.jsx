<<<<<<< HEAD
import "./App.css";
import SignUp_Login from "./Components/SignUp_Login";
import SignUp from "./Components/SignUp";
// import Login from "./Login";
import ProfileDetails from "./Components/userprofile";
import NewArrivals from "./Components/main";
function App() {
  return (
    <>
      {/* <Signup></Signup>
      <Login></Login> */}
      {/* <SignUp></SignUp> */}
      {/* <SignUp_Login></SignUp_Login> */}
      {/* <SignUpPage></SignUpPage> */}
      <ProfileDetails></ProfileDetails>
      {/* <NewArrivals></NewArrivals> */}
    </>
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Home from './components/Home';
import SignUp_Login from './Components/SignUp_Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp_Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />

        {/* Add other routes here */}
      </Routes>
    </Router>
>>>>>>> 12ec4653b21d8c5d8730b50664df07b0c6d81846
  );
}

export default App;
