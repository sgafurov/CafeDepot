import React from "react";
import cafeInteriorImage from "../assets/cafe-interior.jpg"
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Welcome to Cafe Depot, your one-stop shop for all the supplies coffee
        shops need to run smoothly. From the essentials like plates and utensils
        to specialty equipment like espresso machines, we've got you covered.
      </p>
      <img
        src={cafeInteriorImage}
        alt="Cafe Depot showcasing coffee shop equipment"
        className="about-us-image"
      />
      <p>
        Our mission is to support cafes across the globe by providing a wide
        range of products and exceptional customer service. Whether you're
        starting a new business or upgrading your current setup, Cafe Depot is
        here to help make your coffee shop a success.
      </p>
    </div>
  );
}
