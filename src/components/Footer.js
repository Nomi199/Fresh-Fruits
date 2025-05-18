// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About Section */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We deliver fresh, organic, and naturally ripened fruits straight from the farm to your doorstep. Quality and health are our top priorities.</p>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: support@freshfruits.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Location: California, USA</li>
          </ul>
        </div>

        {/* Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section">
          <h3>Stay Updated</h3>
          <p>Subscribe to get the latest offers and fruit news:</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; 2025 FreshFruits. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
