import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import '../styles/cardList.css';

const CardListItem = ({ onCardSelect, cardArr }) => (
  <div onClick={event => onCardSelect(cardArr)} className="card">
    <div>
      <div>
        <ProgressiveImage src={cardArr[0].imageUrl} placeholder="../images/card_back-min.jpg">
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
