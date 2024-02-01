import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./store/userSlice";
import { BASE_URL } from "./constants";
import Navbar from "./components/navbar/Navbar";
import Landing from "./components/landing/Landing";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import Profile from "./components/user/Profile";
import AdminProfile from "./components/admin/AdminProfile";
import ItemsByCategory from "./components/shop/ItemsByCategory";
import Cart from "./components/shop/Cart";
import Checkout from "./components/shop/Checkout";
import "./App.css";

function App() {
  let dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        getUserData(firebaseUser.email);
        console.log("firebaseUser is logged in: ", firebaseUser);
      } else {
        // User is signed out
        console.log("firebaseUser is logged out");
        setUser(null);
      }
    });
  }, []);

  const getUserData = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/${email}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const fetchedUser = await response.json();
        console.log("fetched user in App.js: ", fetchedUser);
        dispatch(setUserInfo(fetchedUser));
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      console.error("Error fetching user from db in App.js: ", error.message);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/shop/:category" element={<ItemsByCategory />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/log-in" element={<LogIn />} />
          {/* <Route exact path="/cart" element={<Cart />} /> */}
          <Route
            exact
            path="/checkout"
            element={user ? <Checkout /> : <Landing />}
          />
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
