import React from 'react';
import CardListItem from './CardListItem';

import '../styles/cardList.css';
import '../styles/main.css';

const CardList = (props) => {
  const cardItems = props.cards.map(card => (
    <CardListItem onCardSelect={props.onCardSelect} key={card.id} card={card} />
  ));

  if (!cardItems || cardItems.length === 0) {
    return (
      <div className="container" style={{ flex: 1 }}>
        <p>To begin, search for a card on the left.</p>
        <p>You can search by card name, or by using the provided filters.</p>
      </div>
    );
  }
  return <div className="card-list">{cardItems}</div>;
};

export default CardList;
