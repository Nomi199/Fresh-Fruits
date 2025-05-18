import React from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import AddProductButton from "../components/AddProductButton";
import ProductTable from "../components/ProductTable";
import Header from "../components/Header";
import UsersTable from "../components/UsersTable"
import HomePage from "./HomePage"
import "./Dashboard.css"; // Ensure styles are applied

const Dashboard = () => {
  return (
    <div className="dashboard">
      <HomePage />
      <UsersTable />
      <Header /> {/* ✅ Make sure it's at the top */}

      <div className="main-content">
        <Sidebar /> {/* Sidebar remains on the side */}

        <div className="content-area">
          <div className="top-bar">
            {/* <SearchBar /> */}
            <AddProduct />
          </div>
          <h2>All Products</h2>
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
