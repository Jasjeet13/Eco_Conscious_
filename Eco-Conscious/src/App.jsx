import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SignUp from "./Components/SignUp";
// import Home from "./components/Home";
// import SignUp_Login from "./Components/SignUp_Login";
// import ProfileDetails from "./Components/ProfileDetails";
// import Navbar from "./Components/Navbar";
import Edit from "./Components/Edit";
// import SignUp from "./Components/SignUp";
// import Main from "./Components/Main";
// import SignUp from "./Components/SignUp";
function App() {
  return (
    // <Router>
    //   <Routes>
    // <Route path="/" element={<SignUp_Login />}
    //     {/* <Route path="/signup" element={<SignUp />} /> */}
    //     {/* <Route path="/" element={<Navbar />} /> */}
    //     <Route path="/" element={<Edit />} />
    //   </Routes>
    // </Router>

    <div>
      <Edit />
    </div>
  );
}

export default App;
