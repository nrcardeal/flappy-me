// Pipe.js
import React, { useState, useEffect, useRef } from 'react';
import '../css/Pipe.css';

function Pipe({ onExit, gameOver  }) {

  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState(document.getElementsByClassName('GameArea')[0].clientWidth);

  useEffect(() => {
    console.log("gameOver prop in Pipe:", gameOver);
    if (gameOver) return; // Pause movement if game over

    const movingPipeInterval = setInterval(() => {
      setPosition(prevPosition => prevPosition - 5);
    }, 50);

    return () => clearInterval(movingPipeInterval);
  }, [position, gameOver]);

  useEffect(() => {
    if (position <= -100 && onExit) {
      onExit();
    }
  }, [position, onExit]);
  
  const blankHeight = 175;
  const clientHeight = document.getElementsByClassName('GameArea')[0].clientHeight
  const groundHeight = document.getElementsByClassName('Ground')[0].clientHeight

  useEffect(() => {
    setHeight(Math.floor(Math.random() * (clientHeight - clientHeight*.4 - blankHeight - groundHeight)) + clientHeight*.2);
  }, []);
  
  return (
    <div className="Pipe" style={{ height: `100%`, left: position }}>
      <div className="topPipe" style={{ height: `${height}px` }}><div className='pipeEnd' style={{ top: `${height-20}px` }} /></div>
      <div className="blank" style={{ height: `${blankHeight}px` }}></div>
      <div className="bottomPipe" style={{ height: `calc(100% - ${height}px - ${blankHeight}px)` }}><div className='pipeEnd' style={{ top: 0 }} /></div>
    </div>
  );
}

export default Pipe;
