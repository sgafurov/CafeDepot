import { useSelector } from "react-redux";
import "../../styles/Checkout.css";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cartSlice.cartItems);

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
              Total: $
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </p>
          </div>

          <form className="checkout-signup-form">
            <label>First name:</label>
            <input type="text" name="firstName" required />
            <label>Last name:</label>
            <input type="text" name="lastName" required />
            <label>Email:</label>
            <input type="email" name="email" required />
            <label>Address:</label>
            <input type="text" name="address" required />
            <button type="submit">Purchase</button>
          </form>
        </div>
      )}
    </div>
  );
}
