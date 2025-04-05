// GamesPage.jsx
import React, { useState } from "react";
import GameCard from "./GameCard";
import "./GamesPage.css";

const GamesPage = ({ games }) => {
  const [filter, setFilter] = useState("all");

  const filteredGames = games.filter((game) =>
    filter === "all" ? true : game.type === filter
  );

  return (
    <div className="games-page">
      <div className="filters">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="slots">Slots</option>
          <option value="table">Table Games</option>
        </select>
      </div>
      <div className="game-grid">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GamesPage;