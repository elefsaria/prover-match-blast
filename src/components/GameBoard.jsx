import React, { useState, useEffect } from "react";
import FruitTile from "./FruitTile";

const avatarTypes = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5"];

function getRandomAvatar() {
  return avatarTypes[Math.floor(Math.random() * avatarTypes.length)];
}

export default function GameBoard() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const rows = 6;
    const cols = 6;
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, getRandomAvatar)
    );
    setGrid(newGrid);
  }, []);

  const handleAvatarClick = (rowIndex, colIndex) => {
    console.log("Clicked:", rowIndex, colIndex);
    // TODO: Tambahkan logika match/blast avatar di sini
  };

  return (
    <div className="game-board">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((avatar, colIndex) => (
            <FruitTile
              key={`${rowIndex}-${colIndex}`}
              fruit={avatar}
              onClick={() => handleAvatarClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
