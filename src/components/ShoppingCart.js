



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { ToastContainer, toast } from 'react-toastify';

// const ShoppingCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);

//   // Fetch products from Firestore
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     const fetchProducts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "documents"));
//         const products = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCartItems(products);
//       } catch (error) {
//         console.error("Error fetching products: ", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Update cart count from localStorage
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     const updateCartCount = () => {
//       const cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const count = cart.reduce((sum, item) => sum + item.quantity, 0);
//       setCartCount(count);
//     };

//     updateCartCount();
//     window.addEventListener("storage", updateCartCount);
//     return () => window.removeEventListener("storage", updateCartCount);
//   }, []);

//   // Add to Cart Function
//   const addToCart = (product) => {
//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

//     const existingItem = existingCart.find((item) => item.id === product.id);

//     let updatedCart;
//     if (existingItem) {
//       updatedCart = existingCart.map((item) =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//     } else {
//       updatedCart = [...existingCart, { ...product, quantity: 1 }];

//     }
    
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     setCartCount((prev) => prev + 1); // update cart count
//     window.dispatchEvent(new Event("storage")); // sync across tabs
//     toast.success(`${product.title} added to cart!`, {
//       className: 'my-toast',
//     });  };

//   return (
//     <div>
//       <ToastContainer position="top-right" autoClose={2000} />
      

//       <div className="shopping-cart">
//         <h1>My products</h1>
//         <div className="cart-items">
//           {cartItems.length === 0 ? (
//             <p>No products found</p>
//           ) : (
//             cartItems.map((product) => (
//               <div className="cart-card" key={product.id}>
//                 <Link to={`/ProductDescription/${product.id}`}>
//               <div >
//                 <img
//                   src={product.image || "placeholder.jpg"}
//                   alt={product.title}
//                   className="cart-image"
//                 />
//                 <h3>{product.title}</h3>
//                 <p>{product.description}</p>
//                 <p>
//                   <strong>Price:</strong> ${product.price}
//                 </p>
//                 </div>
//                 </Link>
//                 <div>
//                 <button
//                   className="button-cart"
//                   onClick={() => addToCart(product)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingCart;




import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "documents"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(products);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount((prev) => prev + 1);
    window.dispatchEvent(new Event("storage"));
    toast.success(`${product.title} added to cart!`, {
      className: 'my-toast',
    });
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="shopping-cart">
        <h1>My Products</h1>
        <div className="cart-items">
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
              <p className="loader-text">Loading products...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="loader-container">
              <div className="loader"></div>
              <p className="loader-text">No products found</p>
            </div>
          ) : (
            cartItems.map((product) => (
              <div className="cart-card" key={product.id}>
                <Link to={`/ProductDescription/${product.id}`}>
                  <div>
                    <img
                      src={product.image || "placeholder.jpg"}
                      alt={product.title}
                      className="cart-image"
                    />
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                  </div>
                </Link>
                <div>
                  <button
                    className="button-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
