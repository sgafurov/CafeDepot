import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { logOutUser } from "../../store/userSlice";
import logo from "../../assets/cafe-depot-high-resolution-logo-transparent.png";
import bagIcon from "../../assets/icons/bag.png";
import profileIcon from "../../assets/icons/user.png";
import logOutIcon from "../../assets/icons/log-out.png";
import clipboardIcon from "../../assets/icons/clipboard.png";
import Cart from "../shop/Cart";
import Search from "./Search";
import "../../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userSlice.isLoggedIn);
  const email = useSelector((state) => state.userSlice.email);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logOutUser());
      console.log("User logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="outer-navbar">
      <div className="inner-navbar">
        <ul className="nav-links">
          <li className="nav-link">
            <div className="dropdown">
              <button className="dropbtn">Shop</button>
              <div className="dropdown-content">
                <Link to="/shop/category/utensils">Utensils</Link>
                <Link to="/shop/category/cups">Cups</Link>
                <Link to="/shop/category/plates">Plates</Link>
                <Link to="/shop/category/espresso-machines">
                  Espresso Machines
                </Link>
              </div>
            </div>
          </li>
          <li className="nav-link">
            <a href="">About Us</a>
          </li>
          <li className="nav-link">
            <a href="">Contact</a>
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
              <Search />
            </div>
          </li>
          <li className="nav-link">
            <div className="icon-container">
              <li className="nav-link">
                <Link to={isLoggedIn ? "/profile" : "/sign-up"}>
                  <img
                    src={profileIcon}
                    alt="Profile"
                    className="logo"
                    width={30}
                  />
                </Link>
              </li>

              {isLoggedIn && (
                <li className="nav-link">
                  <Link to={"/admin-profile"}>
                    <img
                      src={clipboardIcon}
                      alt="Clipboard"
                      className="logo"
                      width={30}
                    />
                  </Link>
                </li>
              )}

              <li className="nav-link">
                <Link onClick={toggleCart}>
                  <img src={bagIcon} alt="Cart" className="logo" width={30} />
                </Link>
              </li>
              {showCart && (
                <div className="cart-component">
                  <Cart showCart={showCart} onClose={toggleCart} />
                </div>
              )}
              {isLoggedIn && (
                <li className="nav-link">
                  <img
                    src={logOutIcon}
                    alt="Logout"
                    className="logo"
                    width={30}
                    onClick={handleLogout}
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
