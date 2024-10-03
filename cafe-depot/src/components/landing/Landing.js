import React, { useState, useEffect } from "react";
import promoBanner from "../../assets/promo-banner.jpg";
import espressoEquipmentImage from "../../assets/espresso-equipment.jpg"
import cafeInteriorImage from "../../assets/cafe-interior.jpg"
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

  const images = [promoBanner, cafeInteriorImage, espressoEquipmentImage];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="landing">
      {/* <img className="promoBanner" src={promoBanner}></img> */}

      <div className="slideshow">
        <img
          className="slideshowImage"
          src={images[currentImageIndex]}
          alt="Promo"
        />
      </div>
      
      <h1>Shop By Category</h1>
      <ul className="categories">
        {categories.names.map((name, index) => (
          <li key={index} className="category">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/shop/category/${name.toLowerCase()}`);
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
