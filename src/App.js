// import React from "react";
// import Sidebar from "./components/Sidebar";
// // import SearchBar from "./components/SearchBar";
// import AddProduct from "./components/AddProduct";
// import ProductTable from "./components/ProductTable";
// import Header from "./components/Header";
// import "./index.css"; // Import CSS file here


// const App = () => {
//   return (
//     <div>
//       <Header /> {/* ✅ Make sure it's at the top */}
    
//     <div style={{ display: "flex" }}>
          

//       <Sidebar />
//       <div style={{ flex: 1, padding: "16px" }}>
//         {/* <SearchBar /> */}
//         <AddProduct />
//         <ProductTable />
//       </div>
//     </div>
//     </div>
//   );
// };
// console.log("nomi");

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddProduct from "./components/AddProduct";
import ProductTable from "./components/ProductTable";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage"
import UsersTable from "./components/UsersTable"
import ProfilePage from "./components/Profile"
import ShoppingCart from "./components/ShoppingCart"
import SearchBar from "./components/SearchBar"
import ViewCart from "./components/ViewCart"
import Checkout from "./components/Checkout"
import OrdersPage from "./components/OrdersPage"
import ProductDescription from "./components/ProductDescription"
import Footer from "./components/Footer"
import "./index.css"; // Import CSS file here
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const App = () => {
  return (
    <Router>
      <Header />
      

      <div style={{ display: "flex" }}>
        <Sidebar />

        

        <div style={{ flex: 1, padding: "16px" }}>


          <Routes>
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/ShoppingCart" element={<h1>  <ShoppingCart /> </h1>} />
            <Route path="/categories" element={<h1><OrdersPage /></h1>} />
            <Route path="/UsersTable" element={<UsersTable />} />

            <Route path="/ProfilePage" element={<h1><ProfilePage /></h1>} />
            <Route path="/logout" element={<h1>Logging Out...</h1>} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/view-cart" element={<ViewCart />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/ProductDescription/:id" element={<ProductDescription />} />

          </Routes>
          
          
        </div>
        
      </div>
      <Footer />
    </Router>
  );
};

export default App;

