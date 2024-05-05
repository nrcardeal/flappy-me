// Bird.js
import React, { useState, useEffect } from 'react';
import '../css/Bird.css'

function Bird({ onGameOver, onPoint }) {
  const [position, setPosition] = useState({ x: 50, y: 300 }); // Initial position
  const [velocity, setVelocity] = useState(0); // Initial velocity
  const [jumping, setJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  useEffect(() => {
    const jump = () => {
      if (!jumping) {
        setJumping(true);
        setVelocity(10); // Apply initial velocity when jumping
      }
    }
    setTimeout(() => {
      if (gameOver) return;
      if (!jumping) {
        setVelocity(vel => vel - 1); // Apply gravity to increase velocity
      }
      setPosition(prevPosition => ({ ...prevPosition, y: prevPosition.y - velocity })); // Update position based on velocity
    }, 50); // Adjust the interval as needed
    

    const handleKeyPress = (event) => {
      if (event.code === 'Space' && !gameOver) {
        event.preventDefault();
        jump();
      }
    };
    
    const handleTouch = () => {
      jump()
    }
    
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchstart', handleTouch);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [jumping, gameOver, velocity]);
  
  useEffect(() => {
    setJumping(false);
    if (position.y <= 0) { // Bird reaches peak of jump
      setVelocity(0); // Reset velocity
    }
  }, [position]);
  
  const isColliding = (colliderBox) => {
    const birdBox = document.getElementsByClassName('Bird')[0].getBoundingClientRect();
    
    return birdBox.right > colliderBox.left &&
    birdBox.left < colliderBox.right &&
    birdBox.bottom > colliderBox.top &&
    birdBox.top < colliderBox.bottom
  }
  
  const isOutsideOfGameArea = () => {
    const outBound = document.getElementsByClassName('GameArea')[0].getBoundingClientRect()
    const birdBox = document.getElementsByClassName('Bird')[0].getBoundingClientRect();
    
    const isOutside =  birdBox.left < outBound.left ||
    birdBox.right > outBound.right ||
    birdBox.top < outBound.top ||
    birdBox.bottom > outBound.bottom
    
    return isOutside
  }
  
  useEffect(() => {
    if(gameOver) return;
    const GameOver = (reason) => {
      if (reason) console.log(reason)
      setGameOver(true)
      setVelocity(0)
      onGameOver()
    }
    const checkCollisions = () => {
      if (isOutsideOfGameArea()) return GameOver("Bird is Outside Game Area");
      
      const ground = document.getElementsByClassName('Ground')[0].getBoundingClientRect()
      if (isColliding(ground)) GameOver("Collided with the Ground")
      
      const pipes = [...document.getElementsByClassName('topPipe'), ...document.getElementsByClassName('bottomPipe')];
      for (let pipe of pipes) {
        const pipeBox = pipe.getBoundingClientRect();
        if (isColliding(pipeBox)) {
          return GameOver("Collided with pipe"); // Collision detected, trigger game over
        }
      }
    };

    const checkPoint = () => {
      const pipe = document.getElementsByClassName('Pipe')[0].getBoundingClientRect();
      const birdBox = document.getElementsByClassName('Bird')[0].getBoundingClientRect();
      if (birdBox.left > pipe.right && onPoint) 
        return onPoint();
    }

    const collisionInterval = setInterval(() => {
      checkCollisions();
      checkPoint();
    }, 50);

    return () => clearInterval(collisionInterval);
  }, [onGameOver, gameOver, onPoint]);

  return <div className="Bird" style={{ top: position.y, left: position.x }}></div>;
}

export default Bird;
