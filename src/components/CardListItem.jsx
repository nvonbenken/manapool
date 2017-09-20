import React from 'react';
import '../styles/app.css';

const CardListItem = ({ card, onCardSelect }) => (
  <div onClick={event => onCardSelect(card)} className="card">
    <div>
      <div>
        <img
          style={{ borderRadius: '10px', width: '223px', height: '310px' }}
          src={card.imageUrl}
          alt=""
        />
      </div>
    </div>
  </div>
);

export default CardListItem;
