import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import { useSelector } from "react-redux";
import "../../styles/Cart.css";

export default function Cart({ showCart, onClose }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const cartItems = useSelector((state) => state.cartSlice.cartItems);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      {showCart && (
        <div className="cart-container">
          <h2>Your Cart</h2>
          <label
            className="close-cart-btn"
            onClick={() => {
              onClose();
            }}
          >
            Close
          </label>
          {!cartItems ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">${item.price}</span>
                      <span className="item-quantity">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <p className="total-price">
                Total: $
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </p>
              {cartItems.length > 0 && (
                <button
                  className="checkout-btn"
                  onClick={() => {
                    handleCheckout();
                  }}
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
