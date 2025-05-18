import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use ReactDOM.createRoot for React 18+
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Dashboard from './Dashboard';
// import Login from './components/Login';
// import Signup from './components/SignUp';
// // import Header from './Header';
// // import Sidebar from './Sidebar'


// import reportWebVitals from './reportWebVitals';
// // import ProfilePage from './MyProfile';
// // import Product from './Product';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
    
//    <Router>
//     {/* <Header />
//     */}
//     {/* <Sidebar /> */}
//       <Routes>
//         {/* Define routes for each component */}
        
//         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//         {/* <Route path="/ProfilePage" element={<ProfilePage />} />
//         <Route path="/Product" element={< Product/>} /> */}
//         {/* <Route path="/Sidebar" element={< Sidebar/>} /> */}

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </Router>
    
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
