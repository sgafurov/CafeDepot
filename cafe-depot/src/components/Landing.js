import React, { useState } from "react";
import promoBanner from "../assets/promo-banner.jpg";
import "../styles/Landing.css";

export default function Landing() {
  const [categories, setCategories] = useState([
    "Utensils",
    "Cups",
    "Plates",
    "Espresso Machines",
  ]);

  return (
    <div className="landing">
      <img className="promoBanner" src={promoBanner}></img>
      <h1>Shop By Category</h1>
      <ul className="categories">
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}
