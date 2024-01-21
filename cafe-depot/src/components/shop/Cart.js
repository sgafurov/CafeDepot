import React, { useEffect, useState } from "react";
import "../../styles/Cart.css";

export default function Cart({ onClose, cartItems, onRemoveItem }) {
  //   const handleCheckout=()=>{
  //   }
  const [showCart, setShowCart] = useState(true);

  return (
    <>
      {showCart && (
        <div className="cart-container">
          <h2>Your Cart</h2>
          <label
            className="close-cart-btn"
            onClick={() => {
              setShowCart(false);
              if (cartItems) {
                onClose();
              }
            }}
          >
            Close
          </label>
          {!cartItems ? ( // cartItems.length === 0
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div className="item-info">
                      <span className="item-name">{item.product.name}</span>
                      <span className="item-price">${item.product.price}</span>
                      <span className="item-quantity">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <p className="total-price">
                Total: $
                {cartItems.reduce(
                  (total, item) => total + (item.product.price * item.quantity),
                  0
                )}
              </p>
              <button
                className="clear-cart-btn"
                // onClick={() => {
                //   handleCheckout();
                // }}
              >
                Checkout
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
