import { useState, useEffect } from "react";
import logo from "../../assets/cafe-depot-high-resolution-logo-transparent.png";
import bagIcon from "../../assets/icons/bag.png";
import profileIcon from "../../assets/icons/user.png";
import logOutIcon from "../../assets/icons/log-out.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import "../../styles/Navbar.css";

export default function Navbar() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        console.log("user is logged in");
      } else {
        // User is signed out
        console.log("user is logged out");
        setUser(null);
      }
    });
  }, []);
  return (
    <div className="outer-navbar">
      <div className="inner-navbar">
        <ul className="nav-links">
          <li className="nav-link">
            <div className="dropdown">
              <button className="dropbtn">Shop⌄</button>
              <div className="dropdown-content">
                {/* <p
                  onClick={() => {
                    goToLink("utensils");
                  }}
                >
                  Utensils
                </p>
                <p
                  onClick={() => {
                    goToLink("cups");
                  }}
                >
                  Cups
                </p> */}
                <Link to="/shop/utensils">Utensils</Link>
                <Link to="/shop/cups">Cups</Link>
                <Link to="/shop/plates">Plates</Link>
                <Link to="/shop/espresso-machines">Espresso Machines</Link>
              </div>
            </div>
          </li>
          <li className="nav-link">
            <a href="">Trending</a>
          </li>
          <li className="nav-link">
            <a href="">Brands</a>
          </li>
        </ul>

        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" width={150} />
          </Link>
        </div>

        <ul className="nav-links">
          <li className="nav-link">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for a product"
                className="search-bar"
              />
            </div>
          </li>
          <li className="nav-link">
            <div className="icon-container">
              <li className="nav-link">
                <Link to="/sign-up">
                  <img
                    src={profileIcon}
                    alt="Logo"
                    className="logo"
                    width={30}
                  />
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/cart">
                  <img src={bagIcon} alt="Logo" className="logo" width={30} />
                </Link>
              </li>
              {user && (
                <li className="nav-link">
                  <img
                    src={logOutIcon}
                    alt="Logo"
                    className="logo"
                    width={30}
                    onClick={() => {
                      handleLogout();
                    }}
                  />
                </li>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
