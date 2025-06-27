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
  const [score, setScore] = useState(0);
  const [blastMap, setBlastMap] = useState([]);

  // Game loop — jalan sekali saat mount
  useEffect(() => {
    const loop = setInterval(() => {
      const matched = findMatches(grid);
      if (matched.length > 0) {
        setBlastMap(matched); // trigger animasi
        setScore((prev) => prev + matched.length * 10);
        setTimeout(() => {
          const newGrid = applyMatches(grid, matched);
          setGrid(newGrid);
          setBlastMap([]);
        }, 300); // beri waktu animasi dulu
      }
    }, 600); // jalankan tiap 600ms

    return () => clearInterval(loop);
  }, [grid]);

  const findMatches = (grid) => {
    const matches = [];
    // Horizontal
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS - 2; col++) {
        const val = grid[row][col];
        if (
          val &&
          val === grid[row][col + 1] &&
          val === grid[row][col + 2]
        ) {
          matches.push([row, col], [row, col + 1], [row, col + 2]);
        }
      }
    }
    // Vertical
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS - 2; row++) {
        const val = grid[row][col];
        if (
          val &&
          val === grid[row + 1][col] &&
          val === grid[row + 2][col]
        ) {
          matches.push([row, col], [row + 1, col], [row + 2, col]);
        }
      }
    }
    return matches;
  };

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
      for (let row = 0; row < emptySpots; row++) {
        newGrid[row][col] = getRandomAvatar();
      }
    }

    return newGrid;
  };

  const isBlasting = (row, col) => {
    return blastMap.some(([r, c]) => r === row && c === col);
  };

  return (
    <div>
      <h2>🧠 Skor: {score}</h2>
      <div className="game-board">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((avatar, colIndex) => (
              <FruitTile
                key={`${rowIndex}-${colIndex}`}
                fruit={avatar}
                isBlasting={isBlasting(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
