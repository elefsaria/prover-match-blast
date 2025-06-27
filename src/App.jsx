import React, { useState } from 'react';
import AvatarSelector from './components/AvatarSelector';
import GameBoard from './components/GameBoard';

function App() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  return (
    <div className="app">
      <h1>🍇 Prover Match Blast 🍋</h1>
      {!selectedAvatar ? (
        <AvatarSelector onSelect={setSelectedAvatar} />
      ) : (
        <>
          <img src={selectedAvatar} alt="Avatar" className="avatar-in-game" />
          <GameBoard />
        </>
      )}
    </div>
  );
}

export default App;
