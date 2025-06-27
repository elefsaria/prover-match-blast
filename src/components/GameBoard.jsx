import React, { useState, useEffect } from "react";
import FruitTile from "./FruitTile";

const fruitTypes = ["apple", "grape", "avocado", "lemon", "strawberry"];

function getRandomFruit() {
  return fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
}

export default function GameBoard() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const rows = 6;
    const cols = 6;
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, getRandomFruit)
    );
    setGrid(newGrid);
  }, []);

  const handleFruitClick = (rowIndex, colIndex) => {
    console.log("Clicked:", rowIndex, colIndex);
    // TODO: Tambahkan logika untuk match/blast buah di sini
  };

  return (
    <div className="game-board">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((fruit, colIndex) => (
            <FruitTile
              key={`${rowIndex}-${colIndex}`}
              fruit={fruit}
              onClick={() => handleFruitClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
