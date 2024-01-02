import logo from "../assets/cafe-depot-high-res-logo-black-transparent.png";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div>
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
      </div>

      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" width={150} />
      </div>

      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      <div className="icon-container">
        <button className="nav-button">Cart</button>
        <button className="nav-button">Profile</button>
      </div>
    </div>
  );
}
