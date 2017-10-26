import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import '../styles/cardList.css';

const CardListItem = ({ card, onCardSelect }) => (
  <div onClick={event => onCardSelect(card)} className="card">
    <div>
      <div>
        <ProgressiveImage src={card.imageUrl}>
          {src => (
            <img
              src={src}
              alt=""
              style={{ borderRadius: '10px', width: '223px', height: '310px' }}
            />
          )}
        </ProgressiveImage>
      </div>
    </div>
  </div>
);

export default CardListItem;
