import React, { useEffect, useState } from "react";
import "../../styles/Cart.css";

export default function Cart({ onClose, cartItems, onRemoveItem }) {
  //   const handleCheckout=()=>{
  //   }
  const [showCart, setShowCart] = useState(true);

  const handleRemoveItem = (itemId) => {
    if (onRemoveItem) {
      onRemoveItem(itemId);
    }
  };

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
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.product.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <p className="total-price">
                Total: $
                {cartItems.reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )}
              </p>
              {cartItems.length>0 && (
                <button
                  className="checkout-btn"
                  // onClick={() => {
                  //   handleCheckout();
                  // }}
                >
                  Checkout
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
