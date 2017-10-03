import React from 'react';
import { Accordion, Button } from 'semantic-ui-react';

import '../styles/deckBuilder.css';

const DeckList = ({ deck }) => {
  if (!deck || deck.size === 0) {
    return (
      <div style={{ flexGrow: 1, padding: '10px' }}>
        <Button disabled>Import</Button>
        <h4>Deck List:</h4>
        <div>No cards added.</div>
      </div>
    );
  }

  let cardCount = 0;

  const toPanel = function toPanel(item) {
    cardCount += parseInt(item.quantity, 10);
    return {
      key: item.card.id,
      title: (
        <div
          style={{
            display: 'inline-flex',
            width: 'calc(100% - 30px)',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', width: '100%' }}>
            <div
              style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: 'calc(100% - 50px)',
              }}
            >
              {item.card.name}
            </div>
            <div>(x{item.quantity})</div>
          </div>
        </div>
      ),
      content: (
        <div>
          <div>{item.card.type}</div>
          <div>{item.card.colors ? item.card.colors.join('/') : ''}</div>
          <div>{item.card.manaCost}</div>
        </div>
      ),
    };
  };

  const panels = Array.from(deck.values()).map(toPanel);

  return (
    <div
      style={{
        flexGrow: 1,
        padding: '10px',
        overflow: 'auto',
      }}
    >
      <Button disabled>Import</Button>
      <Button disabled>Export</Button>
      <h4>Deck List ({cardCount} cards):</h4>
      <ul className="deck-list">
        <Accordion styled panels={panels} />
      </ul>
    </div>
  );
};

export default DeckList;
