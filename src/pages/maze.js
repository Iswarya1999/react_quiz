import React, { useState, useEffect } from 'react';
import './maze.css';
import levels from '../data/levels.json';

const Maze = ({ level, onBackToHome }) => {
  const mazeData = levels[level];
  const [maze, setMaze] = useState(mazeData.maze);
  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  const [timer, setTimer] = useState(mazeData.timer);
  const [gameStatus, setGameStatus] = useState('idle');
  const [successfulMoves, setSuccessfulMoves] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState('😃'); // Default emoji
  let countdown;

  useEffect(() => {
    if (gameStatus === 'idle') {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 0) {
            clearInterval(countdown);
            setGameStatus('lost');
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    }
    if (gameStatus === 'won') {
      setCurrentEmoji('🥳'); // Reset to default emoji after 2 seconds
    }
    
    return () => clearInterval(countdown);
  }, [gameStatus]);

  const resetEmoji = () => {
    if (gameStatus !== 'won') {
      setCurrentEmoji('😃'); // Reset to default emoji after 2 seconds
    }
  };

  const movePlayer = (direction) => {
    const [x, y] = playerPosition;
    let newPosition = [...playerPosition];

    if (direction === 'up' && x > 0) newPosition[0]--;
    if (direction === 'down' && x < maze.length - 1) newPosition[0]++;
    if (direction === 'left' && y > 0) newPosition[1]--;
    if (direction === 'right' && y < maze[0].length - 1) newPosition[1]++;

    const newCell = maze[newPosition[0]][newPosition[1]];
    if (newCell !== '🔳') {
      setPlayerPosition(newPosition);
      setSuccessfulMoves((prev) => {
        const newCount = prev + 1;

        if (newCell === '🏆') {
          setGameStatus('won');
          setCurrentEmoji('🥳'); // Winning emoji stays
          clearInterval(countdown);
          return 0; // Reset successful moves counter
        } else if (newCount >= 4) {
          setCurrentEmoji('🤩'); // Emoji for 4 successful moves
          setTimeout(resetEmoji, 1000); // Reset after 1 seconds
          return 0; // Reset successful moves counter after showing emoji
        } else {
          return newCount; // Increment successful moves
        }
      });
    } else {
      setCurrentEmoji('😥'); // Emoji for hitting a wall
      setTimeout(resetEmoji, 1000); // Reset after 1 seconds
      setSuccessfulMoves(0); // Reset successful moves on hitting a wall
    }
  };

  const handleKeyDown = (e) => {
    if (gameStatus === 'won' || gameStatus === 'lost') return;

    const directionMap = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
    };

    const direction = directionMap[e.key];
    if (direction) {
      movePlayer(direction);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, gameStatus]);

  const handleEndGame = () => {
    setGameStatus('ended');
    clearInterval(countdown);
    onBackToHome();
  };
  return (
    <div className="maze">
      <h2>Timer: {timer} seconds</h2>
      <div className="maze-grid">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cell, colIndex) => {
              const isPlayer = rowIndex === playerPosition[0] && colIndex === playerPosition[1];
              const cellClass = cell === '.' ? 'cell-open' : cell === '🔳' ? 'cell-wall' : cell === '🚪' ? 'cell-start' : 'cell-exit';

              // Always show the door at the starting position
              const displayCell = (rowIndex === 0 && colIndex === 0) ? '🚪' : (cell === '🏆' ? '🏆' : cell);
              
              return (
                <span key={colIndex} className={`maze-cell ${cellClass}`}>
                  {isPlayer ? currentEmoji : displayCell}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      {gameStatus === 'won' && (
        <div>
          <h2>🎉 You Won! 🎉</h2>
          <button className='btn' onClick={onBackToHome}>Back to Home</button>
        </div>
      )}
      {gameStatus === 'lost' && (
        <div>
          <h2>😢 You Lost! 😢</h2>
          <button className='btn' onClick={onBackToHome}>Back to Home</button>
        </div>
      )}
      {gameStatus === 'idle' && (
        <div>
          <h2></h2>
          <button className='btn' onClick={handleEndGame}>Quit Game</button>
        </div>
      )}
    </div>
  );
};

export default Maze;
