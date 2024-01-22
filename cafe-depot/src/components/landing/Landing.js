import React, { useState } from "react";
import promoBanner from "../../assets/promo-banner.jpg";
import utensilsImage from "../../assets/products/utensils.jpg";
import cupsImage from "../../assets/products/cups-no-background.png";
import platesImage from "../../assets/products/plates.jpg";
import espressoMachineImage from "../../assets/products/espresso-machine.jpeg";
import { useNavigate } from "react-router-dom";
import "../../styles/Landing.css";

export default function Landing() {
  let navigate = useNavigate();
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
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/shop/${name.toLowerCase()}`);
              }}
            >
              <p>{name}</p>
              <img src={categories.imagePaths[index]} width={200} alt={name} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
