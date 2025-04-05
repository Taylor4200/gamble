// GameCard.jsx
import React from "react";
import "./GameCard.css";

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.title} className="game-image" />
      <h3>{game.title}</h3>
      <p>{game.description}</p>
      <button>Play Now</button>
    </div>
  );
};

export default GameCard;