




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../firebase"; // Adjust path if needed
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const Checkout = () => {
//   const [cart, setCart] = useState([]);
//   const [shipping, setShipping] = useState({
//     name: "",
//     address: "",
//     email: "",
//     phone: "",
//     country: "Canada",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const handleChange = (e) => {
//     setShipping({ ...shipping, [e.target.name]: e.target.value });
//   };

//   const getTotal = () => {
//     return cart
//       .reduce((total, item) => total + item.price * item.quantity, 0)
//       .toFixed(2);
//   };

//   const handleCheckout = async () => {
//     const orderData = {
//       shipping,
//       cart,
//       total: getTotal(),
//       createdAt: Timestamp.now(),
//       paymentStatus: "Paid",
//     };

//     toast.success("Order placed successfully!");

//     try {
//       await addDoc(collection(db, "orders"), orderData);
//       toast.success("Order placed successfully!");
//       window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 scrolls up
//       localStorage.removeItem("cart");
//       navigate("/");
//     } catch (err) {
//       console.error("Error saving order:", err);
//       toast.error("Failed to place order. Please try again.");
//     }
    
    
//   };

//   return (
    
//     <div className="checkout-wrapper" style={{ display: "flex", justifyContent: "center", padding: "2rem", background: "#f3f3f3" }}>
//             <ToastContainer position="top-right" autoClose={5000} hideProgressBar />

//       <div className="checkout-container" style={{ display: "flex", width: "80%", maxWidth: "1000px", background: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        
//         {/* LEFT SIDE */}
//         <div className="checkout-left" style={{ flex: 1, marginRight: "2rem" }}>
//           <h2 style={{ marginBottom: "1rem" }}>CHECKOUT</h2>

//           <label>Delivery Country</label>
//           <select name="country" value={shipping.country} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}>
//             <option value="Pakistan">Pakistan</option>
//             <option value="Canada">Canada</option>
//             <option value="USA">USA</option>
//             <option value="UK">UK</option>
//           </select>

//           <label>Email Address</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="you@example.com"
//             value={shipping.email}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
//           />

//           <label>Full Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={shipping.name}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
//           />

//           <label>Phone Number</label>
//           <input
//             type="tel"
//             name="phone"
//             placeholder="+92 334 567890"
//             value={shipping.phone}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
//           />

//           <label>Address</label>
//           <input
//             type="text"
//             name="address"
//             placeholder="Shipping Address"
//             value={shipping.address}
//             onChange={handleChange} 
//             style={{ width: "100%", padding: "0.5rem", marginBottom: "1.5rem" }}
//           />

//           <button
//             className="place-order-btn"
//             onClick={handleCheckout}
//             style={{
//               width: "100%",
//               padding: "0.75rem",
//               backgroundColor: "#4CAF50",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontWeight: "bold",
//             }}
//           >
//             PLACE ORDER
//           </button>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="checkout-right" style={{ flex: 1, backgroundColor: "#fafafa", padding: "1rem", borderRadius: "8px" }}>
//           <img
//             src="/logoG.jpg"
//             alt="Payment Logo"
//             className="payment-logo"
//             style={{ width: "80px", marginBottom: "1rem" }}
//           />
//           <h3>Your Order</h3>
//           <div className="order-summary">
//             {cart.map((item) => (
//               <div key={item.id} className="order-item" style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
//                 <p>{item.title} x {item.quantity}</p>
//                 <p>${(item.price * item.quantity).toFixed(2)}</p>
//               </div>
//             ))}
//             <div className="order-total" style={{ marginTop: "1rem", fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
//               <span>Total to Pay:</span>
//               <span>${getTotal()}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    country: "Canada",
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const getTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    const orderData = {
      shipping,
      cart,
      total: getTotal(),
      createdAt: Timestamp.now(),
      paymentStatus: "Paid",
    };

    toast.success("Order placed successfully!");

    try {
      await addDoc(collection(db, "orders"), orderData);
      toast.success("Order placed successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Clear the cart and notify header
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("storage")); // 👈 updates cart count in header

      navigate("/");
    } catch (err) {
      console.error("Error saving order:", err);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-wrapper" style={{ display: "flex", justifyContent: "center", padding: "2rem", background: "#f3f3f3" }}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      <div className="checkout-container" style={{ display: "flex", width: "80%", maxWidth: "1000px", background: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        
        {/* LEFT SIDE */}
        <div className="checkout-left" style={{ flex: 1, marginRight: "2rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>CHECKOUT</h2>

          <label>Delivery Country</label>
          <select name="country" value={shipping.country} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}>
            <option value="Pakistan">Pakistan</option>
            <option value="Canada">Canada</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={shipping.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shipping.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="+92 334 567890"
            value={shipping.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={shipping.address}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1.5rem" }}
          />
        <Link to="/categories">
          <button
            className="place-order-btn"
            onClick={handleCheckout}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            PLACE ORDER
          </button>
          </Link>
        </div>
        

        {/* RIGHT SIDE */}
        <div className="checkout-right" style={{ flex: 1, backgroundColor: "#fafafa", padding: "1rem", borderRadius: "8px" }}>
          <img
            src="/logoG.jpg"
            alt="Payment Logo"
            className="payment-logo"
            style={{ width: "80px", marginBottom: "1rem" }}
          />
          <h3>Your Order</h3>
          <div className="order-summary">
            {cart.map((item) => (
              <div key={item.id} className="order-item" style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <p>{item.title} x {item.quantity}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="order-total" style={{ marginTop: "1rem", fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
              <span>Total to Pay:</span>
              <span>${getTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
