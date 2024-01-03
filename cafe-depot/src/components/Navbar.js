import logo from "../assets/cafe-depot-high-resolution-logo-transparent.png";
import bagIcon from "../assets/icons/bag.png";
import profileIcon from "../assets/icons/user.png";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <div className="outer-navbar">
      <div className="inner-navbar">
        <ul className="nav-links">
          <li className="nav-link">
            <div className="dropdown">
              <button className="dropbtn">Shop⌄</button>
              <div className="dropdown-content">
                <a href="#">Utensils</a>
                <a href="#">Cups</a>
                <a href="#">Plates</a>
                <a href="#">Espresso Machines</a>
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
          <img src={logo} alt="Logo" className="logo" width={150} />
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
