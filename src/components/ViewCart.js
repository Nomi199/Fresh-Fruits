


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-page">
      

      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="enpty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image || "https://via.placeholder.com/60"} alt={item.title} />

                <div className="cart-info">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <p>$ {item.price} / kg</p>

                  <div className="cart-qty">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>

                <div className="cart-price">
                  $ {item.price * item.quantity}
                </div>

                <button className="remove-btn" onClick={() => removeItem(item.id)}>❌</button>
              </div>
            ))}
          </div>

          <hr />
          <div className="cart-footer">
            <h3>Total: $ {getTotalPrice().toFixed(2)}</h3>
            <div>
            <button className="clear-btn" onClick={clearCart}>🧹 Clear Cart</button>
            <Link to="/Checkout">
            <button className="checkout-button">
               🧾 Proceed to Checkout
            </button>
            </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewCart;
