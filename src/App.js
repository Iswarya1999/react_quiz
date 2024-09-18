import React, { useState } from 'react';
import Maze from '../src/pages/maze';
import levels from '../src/data/levels.json';
import "./App.css";

const App = () => {
  const [level, setLevel] = useState('easy');
  const [gameStarted, setGameStarted] = useState(false);
  
  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setGameStarted(true);
  };

  const handleBackToHome = () => {
    setGameStarted(false);
    setLevel('easy');
  };

  return (
    <div className="app">
      <h1>Maze Game</h1>
      {!gameStarted ? (
        <div>
          <h2>Select Level</h2>
        <div className="btnContainer">
          <button className="btn" onClick={() => startGame('easy')}>Easy</button>
          <button className="btn" onClick={() => startGame('intermediate')}>Intermediate</button>
          <button className="btn" onClick={() => startGame('hard')}>Hard</button>
        </div>
        </div>
      ) : (
        <Maze level={level} onBackToHome={handleBackToHome} />
      )}
    </div>
  );
};

export default App;
