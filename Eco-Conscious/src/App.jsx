<<<<<<< HEAD
import "./App.css";
<<<<<<< HEAD
// import SignUp_Login from "./Components/SignUp_Login";
// import Login from "./Login";
// import ProfileDetails from "./Components/ProfileDetails";
// import SignUp from "./Components/SignUp";
import NewArrivals from "./Components/navbar";
=======
import SignUp_Login from "./Components/SignUp_Login";
import SignUp from "./Components/SignUp";
// import Login from "./Login";
import ProfileDetails from "./Components/userprofile";
import NewArrivals from "./Components/main";
>>>>>>> 117c8f6274d0e1fb1e639b966a602e015d12e392
function App() {
  return (
    <>
      {/* <Signup></Signup>
      <Login></Login> */}
      {/* <SignUp></SignUp> */}
      {/* <SignUp_Login></SignUp_Login> */}
<<<<<<< HEAD
      {/* <SignUp></SignUp> */}
      {/* <ProfileDetails></ProfileDetails> */}
      <NewArrivals></NewArrivals>
=======
      {/* <SignUpPage></SignUpPage> */}
      <ProfileDetails></ProfileDetails>
      {/* <NewArrivals></NewArrivals> */}
>>>>>>> 117c8f6274d0e1fb1e639b966a602e015d12e392
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
