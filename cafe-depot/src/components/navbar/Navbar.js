import { useState, useEffect } from "react";
import logo from "../../assets/cafe-depot-high-resolution-logo-transparent.png";
import bagIcon from "../../assets/icons/bag.png";
import profileIcon from "../../assets/icons/user.png";
import logOutIcon from "../../assets/icons/log-out.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../store/userSlice";
import Cart from "../shop/Cart";
import "../../styles/Navbar.css";


export default function Navbar() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.userSlice.isLoggedIn);
  const email = useSelector((state) => state.userSlice.email);

  const [showCart, setShowCart] = useState(false); // Move showCart state to Navbar

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
                {/* if user is not logged in, display sign up page. if they are, display profile page (or admin page if they are dev) */}
                <Link
                  to={
                    !isLoggedIn
                      ? "/sign-up"
                      : isLoggedIn && email === "dev@gmail.com"
                      ? "/admin-profile"
                      : "/profile"
                  }
                >
                  <img
                    src={profileIcon}
                    alt="Logo"
                    className="logo"
                    width={30}
                  />
                </Link>
              </li>
              <li className="nav-link">
                <Link onClick={toggleCart}>
                  {/* <Link to="/cart" onClick={toggleCart}> */}
                  <img src={bagIcon} alt="Logo" className="logo" width={30} />
                </Link>
              </li>
              {/* Pass toggleCart function as a prop to Cart component */}
              {showCart && (
                <div className="cart-component">
                  <Cart showCart={showCart} onClose={toggleCart} />
                </div>
              )}

              {isLoggedIn && (
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
