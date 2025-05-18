

import React from "react";
import { FaHome, FaBox, FaShoppingCart, FaLeaf, FaUser, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/HomePage">
            <FaHome className="icon" /> 
          </Link>
        </li>
        <li>
          <Link to="/AddProduct">
            <FaBox className="icon" /> 
          </Link>
        </li>
        <li>
          <Link to="/ShoppingCart">
            <FaShoppingCart className="icon" /> 
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <FaLeaf className="icon" /> 
          </Link>
        </li>
        <li>
        <Link to="/UsersTable"> 
            <FaUsers className="icon" />  {/* User Data Icon */}
          </Link>
        </li>
        <li>
          <Link to="/ProfilePage">
            <FaUser className="icon" /> 
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <FaSignOutAlt className="icon" /> 
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

