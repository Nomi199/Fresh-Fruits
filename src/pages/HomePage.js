import React from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <h1>Fresh Organic Fruits</h1>
        <p>Delivering fresh and organic fruits to your doorstep.</p>

        <Link to="/ShoppingCart">
        <button className="btn">Shop Now</button>         
         </Link>
       
      </header>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-container">
          <div className="service-box">
            <h3>Fresh Fruits</h3>
            <p>Handpicked, farm-fresh fruits delivered to you.</p>
          </div>
          <div className="service-box">
            <h3>Organic Farming</h3>
            <p>We use natural methods to grow healthy fruits.</p>
          </div>
          <div className="service-box">
            <h3>Fast Delivery</h3>
            <p>Quick delivery to keep your fruits fresh.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>We are passionate about providing fresh and organic fruits directly from farms to your table.</p>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact Us</h2>
        <button className="btn">Get in Touch</button>
      </section>
    </div>
  );
};

export default HomePage;
