import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Landing from "./components/landing/Landing";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import Profile from "./components/user/Profile";
import AdminProfile from "./components/admin/AdminProfile";
import "./App.css";
import ItemsByCategory from "./components/shop/ItemsByCategory";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/shop/:category" element={<ItemsByCategory />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/log-in" element={<LogIn />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/admin-profile" element={<AdminProfile />} />
          {/* <Route path="/product/:productId" component={ProductDetails} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
