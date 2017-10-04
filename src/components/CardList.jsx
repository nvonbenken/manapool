import React from 'react';
import CardListItem from './CardListItem';

import '../styles/cardList.css';
import '../styles/main.css';

const CardList = (props) => {
  const cardItems = Array.from(props.cards.values()).map(card => (
    <CardListItem onCardSelect={props.onCardSelect} key={card.id} card={card} />
  ));

  if (!cardItems || cardItems.length === 0) {
    return (
      <div className="container card-container" style={{ flex: 1 }}>
        <p>To begin, search for a card on the left.</p>
        <p>You can search by card name, or by using the provided filters.</p>
      </div>
    );
  }
  return <div className="card-container card-list">{cardItems}</div>;
};

export default CardList;
