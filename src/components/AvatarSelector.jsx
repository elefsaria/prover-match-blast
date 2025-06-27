import React, { useState } from "react";

const avatars = [
  "/images/avatars/avatar1.png",
  "/images/avatars/avatar2.png",
  "/images/avatars/avatar3.png",
  "/images/avatars/avatar4.png",
  "/images/avatars/avatar5.png",
];

export default function AvatarSelector({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (avatar) => {
    setSelected(avatar);
    onSelect(avatar);
  };

  return (
    <div className="avatar-selector">
      <h2>Pilih Avatar Kamu 🍓</h2>
      <div className="avatar-list">
        {avatars.map((avatar, i) => (
          <img
            key={i}
            src={avatar}
            alt={`Avatar ${i + 1}`}
            className={`avatar ${selected === avatar ? "selected" : ""}`}
            onClick={() => handleSelect(avatar)}
          />
        ))}
      </div>
    </div>
  );
}
