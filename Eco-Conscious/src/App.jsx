import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Home from './components/Home';
import SignUp_Login from './Components/SignUp_Login';
import ProfileDetails from './Components/ProfileDetails';
import Edit from './Components/Edit';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp_Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/:id" element={<Home />} /> 
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/edit/:id" element={<Edit />} />

        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
