// ScoreDisplay.js
import React from 'react';
import '../css/ScoreDisplay.css'

function ScoreDisplay({ score }) {
  return (
    <div className="ScoreDisplay">
      <span>{score}</span>
    </div>
  );
}

export default ScoreDisplay;
