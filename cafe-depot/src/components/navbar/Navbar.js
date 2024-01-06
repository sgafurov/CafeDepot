import logo from "../../assets/cafe-depot-high-resolution-logo-transparent.png";
import bagIcon from "../../assets/icons/bag.png";
import profileIcon from "../../assets/icons/user.png";
import { Link } from 'react-router-dom';
import "../../styles/Navbar.css";

export default function Navbar() {
  return (
    <div className="outer-navbar">
      <div className="inner-navbar">
        <ul className="nav-links">
          <li className="nav-link">
            <div className="dropdown">
              <button className="dropbtn">Shop⌄</button>
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
                <img src={profileIcon} alt="Logo" className="logo" width={30} />
              </li>
              <li className="nav-link">
                <img src={bagIcon} alt="Logo" className="logo" width={30} />
              </li>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
