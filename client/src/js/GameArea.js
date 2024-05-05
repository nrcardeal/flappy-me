// GameArea.js
import React, { useState, useEffect } from 'react';
import Pipe from './Pipe';
import Bird from './Bird';
import '../css/GameArea.css';
import Ground from './Ground';
import ScoreDisplay from './ScoreDisplay';
import RatingModal from './RatingModal';
import NameModal from './NameModal';
import { saveRating } from './utils/ratings';

function GameArea() {
  const [pipes, setPipes] = useState([]);
  const [count, setCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  
  const handlePipeExit = () => {
    console.log("Pipe exited");
    setPipes(prevPipes => prevPipes.slice(1)); // Remove the first pipe from the array
    setScore(prevScore => prevScore + 1);
  };
  
  useEffect(() => {
    if (gameOver) return;
    setTimeout(() => {
      setCount(count + 1)
    }, 3000)

    setPipes(prevPipes => [...prevPipes, <Pipe key={count} onExit={handlePipeExit} gameOver={gameOver} />]);
    console.log("Pipe Constructed")

  }, [count, gameOver]); // Include count in the dependency array to trigger the effect when count changes
  

  const handleGameOver = () => {
    setGameOver(true);
    setShowNameModal(true)
  };

  const handleNameSubmit = async (name) => {
    setShowNameModal(false);
    setShowRatingModal(true);
    await saveRating(name, score);
  };


  return (
    <div className="GameArea">
      <Bird onGameOver={handleGameOver} /* onPoint={() => { setScore(prevScore => prevScore + 1); console.log("Point"); }} */ />
      {!gameOver && pipes}
      {/* {gameOver && <div className="GameOverMessage">Game Over</div>} */}
      <Ground />
      <ScoreDisplay score={score} />
      {showNameModal && <NameModal onNameSubmit={handleNameSubmit} />}
      {showRatingModal && <RatingModal />}
    </div>
  );
}

export default GameArea;
