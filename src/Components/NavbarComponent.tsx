// Navbar.jsx
import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">YourLogo</div>
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li><a href="/public">Home</a></li>
        <li><a href="/games">Games</a></li>
        <li><a href="/promotions">Promotions</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
      <div className="hamburger" onClick={() => setMenuOpen(!isMenuOpen)}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;