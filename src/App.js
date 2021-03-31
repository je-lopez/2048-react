import React, { useState, useEffect } from 'react';

// import BoardStats from './BoardStats';
import { initializeBoard, move } from './utils';

function App() {
  const [board, setBoard] = useState(() => initializeBoard());
  const [gameOver, setGameOver] = useState(false);
  
  
  // on mount, add keydown event listener
  // on dismount, remove event listener
  useEffect(() => {
    function onKeydown({ code }) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) {
        setBoard(prevBoard => {
          const nextBoard = move(prevBoard, code);
  
          return !nextBoard ? prevBoard : nextBoard;
        });
      }
    }

    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, []);

  return (
    <div className="App">
      {board.map((row, rowI) => (
        <div key={rowI} className="row">
          {row.map((col, colI) => (
            <div key={colI} className="col">
              {col === 0 ? '' : col}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
