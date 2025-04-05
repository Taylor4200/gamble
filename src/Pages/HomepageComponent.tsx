// Homepage.jsx
import React from "react";
import "./Homepage.css"; // Add necessary styling
import GameCarousel from "./GameCarousel";

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to [Your Gambling Website]</h1>
          <button className="cta-button">Start Playing</button>
        </div>
      </div>

      {/* Popular Games Carousel */}
      <div className="carousel-container">
        <h2>Popular Games</h2>
        <GameCarousel />
      </div>
    </div>
  );
};

export default Homepage;