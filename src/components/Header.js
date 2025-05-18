import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  // Get cart count from localStorage
  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  // Clear cart function
  const clearCart = () => {
    localStorage.removeItem("cart");
    getCartCount(); // Immediately update cart count
    window.dispatchEvent(new Event("storage")); // Notify all tabs/components
  };

  // Listen to storage changes (e.g., after adding/removing items)
  useEffect(() => {
    getCartCount();

    const handleStorage = () => {
      getCartCount();
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <header className="header">
      <div className="veiw1">
        <div>
          <img src="/NR_Logo11.png" alt="Logo" className="logo1" />
        </div>

        <Link to="/view-cart" style={{ position: "relative" }}>
          <button className="view">🛒 View Cart</button>
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "4px 8px",
                fontSize: "12px",
                marginTop: "20px"
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
      <div className="logo3">
      <div className="login1">
        <Link to="./Login">
          <button className="login">Login</button>
        </Link>
      </div>

      <div>
        <img src="/logoG.jpg" alt="Logo" className="logo2" />
      </div>
      </div>
    </header>
  );
};

export default Header;
