import React from "react";

export default function FruitTile({ fruit, isBlasting }) {
  return (
    <div className={`fruit-tile ${isBlasting ? "blast" : ""}`}>
      <img src={`/images/avatars/${fruit}.png`} alt={fruit} />
    </div>
  );
}
