import React, { useState } from "react";
import promoBanner from "../../assets/promo-banner.jpg";
import utensilsImage from "../../assets/products/utensils.jpg";
import cupsImage from "../../assets/products/cups.jpg";
import platesImage from "../../assets/products/plates.jpg";
import espressoMachineImage from "../../assets/products/espresso-machine.jpeg";
import "../../styles/Landing.css";

export default function Landing() {
  const [categories, setCategories] = useState({
    names: ["Utensils", "Cups", "Plates", "Espresso Machines"],
    imagePaths: [utensilsImage, cupsImage, platesImage, espressoMachineImage],
  });

  return (
    <div className="landing">
      <img className="promoBanner" src={promoBanner}></img>
      <h1>Shop By Category</h1>
      <ul className="categories">
        {categories.names.map((name, index) => (
          <li key={index} className="category">
            <div>
              <p>{name}</p>
              <img src={categories.imagePaths[index]} width={200} alt={name}/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
