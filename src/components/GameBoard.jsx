import React, { useState, useEffect } from "react";
import FruitTile from "./FruitTile";

const avatarTypes = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5"];
const ROWS = 6;
const COLS = 6;

function getRandomAvatar() {
  return avatarTypes[Math.floor(Math.random() * avatarTypes.length)];
}

function generateInitialGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, getRandomAvatar)
  );
}

export default function GameBoard() {
  const [grid, setGrid] = useState(generateInitialGrid());

  // Cek apakah ada match-3 di grid
  useEffect(() => {
    const interval = setInterval(() => {
      const matched = findMatches(grid);
      if (matched.length > 0) {
        const newGrid = applyMatches(grid, matched);
        setGrid(newGrid);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [grid]);

  // Cari posisi yang cocok secara horizontal dan vertikal
  const findMatches = (grid) => {
    const matches = [];

    // Horizontal
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS - 2; col++) {
        const val = grid[row][col];
        if (val && val === grid[row][col + 1] && val === grid[row][col + 2]) {
          matches.push([row, col], [row, col + 1], [row, col + 2]);
        }
      }
    }

    // Vertical
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS - 2; row++) {
        const val = grid[row][col];
        if (val && val === grid[row + 1][col] && val === grid[row + 2][col]) {
          matches.push([row, col], [row + 1, col], [row + 2, col]);
        }
      }
    }

    return matches;
  };

  // Ledakkan yang cocok dan geser ke bawah
  const applyMatches = (grid, matches) => {
    const newGrid = grid.map((row) => [...row]);

    for (const [row, col] of matches) {
      newGrid[row][col] = null;
    }

    // Geser ke bawah
    for (let col = 0; col < COLS; col++) {
      let emptySpots = 0;
      for (let row = ROWS - 1; row >= 0; row--) {
        if (newGrid[row][col] === null) {
          emptySpots++;
        } else if (emptySpots > 0) {
          newGrid[row + emptySpots][col] = newGrid[row][col];
          newGrid[row][col] = null;
        }
      }

      // Isi atas dengan avatar baru
      for (let row = 0; row < emptySpots; row++) {
        newGrid[row][col] = getRandomAvatar();
      }
    }

    return newGrid;
  };

  return (
    <div className="game-board">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((avatar, colIndex) => (
            <FruitTile
              key={`${rowIndex}-${colIndex}`}
              fruit={avatar}
              onClick={() => {}}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
