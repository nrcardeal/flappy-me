import React, { useState, useEffect } from 'react';
import { getRatings } from './utils/ratings';
import '../css/RatingModal.css'

const RatingModal = () => {
  const [ratings, setRatings] = useState([]);
  const emojis = ['👑','💸','🤩','🥳','😝','👌','👍','😈','🤷🏻‍♂️','😂'];

  useEffect(() => {
    const fetchRatings = async () => {
      const data = await getRatings();
      setRatings(data);
    };
    fetchRatings();
  });

  return (
    <div className="RatingModal">
      <div className='Title'>
        <h2>👑Top 10👑</h2>
      </div>
      <div className='RatingList'>
        {ratings.sort((a, b) => b.score - a.score).slice(0,10).map((user, index) => (
          <div className='element' key={index}>
            <span className='emoji'>{emojis[index]}</span>
            <span className='name'>{user.name}</span>
            <span className='score'>{user.score}</span>
          </div>
        ))}
      </div>
      <div className='RetryButton'>
        <button className='button' onClick={() => window.location.reload()}>
          Tentar Novamente!
        </button>
      </div>
    </div>
  );
};

export default RatingModal;