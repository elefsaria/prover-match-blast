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
  const [selectedTile, setSelectedTile] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTileClick = (row, col) => {
    if (isAnimating) return;

    if (!selectedTile) {
      setSelectedTile({ row, col });
    } else {
      const { row: r1, col: c1 } = selectedTile;
      const r2 = row, c2 = col;

      // Hanya boleh swap tetangga
      const isAdjacent = Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
      if (!isAdjacent) {
        setSelectedTile(null);
        return;
      }

      const newGrid = grid.map((row) => [...row]);
      [newGrid[r1][c1], newGrid[r2][c2]] = [newGrid[r2][c2], newGrid[r1][c1]];
      const matched = findMatches(newGrid);

      if (matched.length > 0) {
        setGrid(newGrid);
        setSelectedTile(null);
      } else {
        // Tidak valid, kembalikan
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
          setSelectedTile(null);
        }, 300);
      }
    }
  };

  // Game loop: ledak dan isi ulang
  useEffect(() => {
    const loop = setInterval(() => {
      const matched = findMatches(grid);
      if (matched.length > 0) {
        setIsAnimating(true);
        setBlastMap(matched);
        setScore((prev) => prev + matched.length * 10);
        setTimeout(() => {
          const newGrid = applyMatches(grid, matched);
          setGrid(newGrid);
          setBlastMap([]);
          setIsAnimating(false);
        }, 300);
      }
    }, 500);

    return () => clearInterval(loop);
  }, [grid]);

  const findMatches = (grid) => {
    const matches = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS - 2; col++) {
        const val = grid[row][col];
        if (val && val === grid[row][col + 1] && val === grid[row][col + 2]) {
          matches.push([row, col], [row, col + 1], [row, col + 2]);
        }
      }
    }

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

  const applyMatches = (grid, matches) => {
    const newGrid = grid.map((row) => [...row]);

    for (const [row, col] of matches) {
      newGrid[row][col] = null;
    }

    for (let col = 0; col < COLS; col++) {
      let empty = 0;
      for (let row = ROWS - 1; row >= 0; row--) {
        if (newGrid[row][col] === null) {
          empty++;
        } else if (empty > 0) {
          newGrid[row + empty][col] = newGrid[row][col];
          newGrid[row][col] = null;
        }
      }
      for (let row = 0; row < empty; row++) {
        newGrid[row][col] = getRandomAvatar();
      }
    }

    return newGrid;
  };

  const isBlasting = (row, col) =>
    blastMap.some(([r, c]) => r === row && c === col);

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
                isSelected={
                  selectedTile &&
                  selectedTile.row === rowIndex &&
                  selectedTile.col === colIndex
                }
                onClick={() => handleTileClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
