import React from "react";

export default function FruitTile({ fruit, onClick }) {
  return (
    <div className="fruit-tile" onClick={onClick}>
      <img src={`/images/fruits/${fruit}.png`} alt={fruit} />
    </div>
  );
}
