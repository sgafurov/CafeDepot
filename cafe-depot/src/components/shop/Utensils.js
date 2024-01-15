import { useState } from "react";
import utensilsImage from "../../assets/products/utensils.jpg";
import "../../styles/Utensils.css";

export default function Utensils() {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // get all utensils from DB and map out the utensils in boxes
  return (
      <div className="products-list">
        <ul className="utensils-list">
          {/*map through each utensil, create a li element with an onClick event that calls*/}
          {/*addToCart(utensil) passing it the current utensil*/}
          <li className="utensil-item">
            <div>
              <img src={utensilsImage} width={200} alt={"utensils"} />
              <div className="details-text">
                <p className="title">
                  Metal utensils pack (50 forks, 50 spoons, 50 knives)
                </p>
                <p className="price">$10</p>
              </div>
              <div className="quantity-controls">
                <button onClick={decreaseQuantity}>-</button>
                <p>{quantity}</p>
                <button onClick={increaseQuantity}>+</button>
              </div>

              <button className="add-to-cart">Add to Cart</button>
            </div>
          </li>
        </ul>
      </div>
  );
}
