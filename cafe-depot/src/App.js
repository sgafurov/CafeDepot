import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Landing from "./components/landing/Landing";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import Profile from "./components/user/Profile";
import AdminProfile from "./components/admin/AdminProfile";
import "./App.css";
import ItemsByCategory from "./components/shop/ItemsByCategory";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user);
        console.log("user is logged in");
        // ...
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/shop/:category" element={<ItemsByCategory />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/log-in" element={<LogIn />} />
          <Route
            exact
            path="/profile"
            element={user ? <Profile /> : <Landing />}
          />
          <Route
            exact
            path="/admin-profile"
            element={user ? <AdminProfile /> : <Landing />}
          />
          {/* <Route path="/product/:productId" component={ProductDetails} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
