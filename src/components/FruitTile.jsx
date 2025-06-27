import React from "react";

export default function FruitTile({ fruit, isBlasting, isSelected, onClick }) {
  return (
    <div
      className={`fruit-tile ${isBlasting ? "blast" : ""} ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <img src={`/images/avatars/${fruit}.png`} alt={fruit} />
    </div>
  );
}
