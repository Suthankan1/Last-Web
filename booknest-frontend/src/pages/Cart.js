import React, { useState } from "react";
import "../styles/Cart.css";

const TAX_RATE = 0.08;

const initialCartItems = [
  {
    id: 1,
    title: "Kitchen princess",
    author: "David Flanagan",
    price: 29.99,
    image:
      "/assets/book5.jpg",
  },
  {
    id: 2,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    price: 35.99,
    image:
      "https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
  },
  {
    id: 3,
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author:
      "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    price: 49.99,
    image:
      "https://m.media-amazon.com/images/I/51szD9HC9pL._SX395_BO1,204,203,200_.jpg",
  },
];

const Cart = () => {
  const [cart, setCart] = useState(initialCartItems);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    alert("Thank you for your purchase! Redirecting to checkout...");
    // Add checkout logic here (redirect to payment etc)
  };

  const handleContinueShopping = () => {
    window.location.href = "/books";
  };

  return (
    <div className="container">
      <header>
        <h1>My BookNest Cart</h1>
      </header>

      <div className="cart-container">
        <section className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button
                className="continue-shopping"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="item-image"
                />
                <div className="item-details">
                  <div className="item-title">{item.title}</div>
                  <div className="item-author">{item.author}</div>
                  <div className="item-price">${item.price.toFixed(2)}</div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </section>

        <section className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax (8%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-item summary-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </section>
      </div>
    </div>
  );
};

export default Cart;
