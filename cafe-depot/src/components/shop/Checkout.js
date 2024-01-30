import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../../styles/Checkout.css";
import { BASE_URL } from "../../constants";
import { json } from "react-router-dom";

export default function Checkout() {
  const userId = useSelector((state) => state.userSlice.userId);
  const firstName = useSelector((state) => state.userSlice.firstName);
  const lastName = useSelector((state) => state.userSlice.lastName);
  const email = useSelector((state) => state.userSlice.email);
  const address = useSelector((state) => state.userSlice.address);
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const total = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        userId: userId,
        orderItems: cartItems,
        total: total,
      };
      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        console.log(response);
      }
    } catch (error) {
      alert("Error creating the Order");
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="checkout-cart-container">
          <div className="checkout-cart-items-container">
            <h2>Your Cart</h2>

            <ul className="checkout-cart-items">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className="checkout-item-info">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-price">${item.price}</span>
                    <span className="checkout-item-quantity">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="checkout-total-price">
              {/* Total: $
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )} */}
              Total: ${total}
            </p>
          </div>

          <form className="checkout-signup-form" onSubmit={handleSubmit}>
            <label>First name:</label>
            <input
              type="text"
              name="firstName"
              defaultValue={firstName}
              onChange={handleChange}
              required
            />
            <label>Last name:</label>
            <input
              type="text"
              name="lastName"
              defaultValue={lastName}
              onChange={handleChange}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              defaultValue={email}
              onChange={handleChange}
              required
            />
            <label>Address:</label>
            <input
              type="text"
              name="address"
              defaultValue={address}
              onChange={handleChange}
              required
            />
            <button type="submit">Purchase</button>
          </form>
        </div>
      )}
    </div>
  );
}
