import React from 'react';
import { Accordion, Button } from 'semantic-ui-react';

import '../styles/deckBuilder.css';

const DeckList = ({ deck, auth }) => {
  if (!deck || deck.size === 0) {
    return (
      <div style={{ flexGrow: 1, padding: '10px' }}>
        {auth.isAuthenticated() ? (
          <div>
            <Button disabled>Import</Button> <Button disabled>Load</Button>{' '}
            <Button disabled>Export</Button> <Button disabled>Save</Button>
          </div>
        ) : (
          <p>Please log in to import/export/save decks.</p>
        )}
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
      title: {
        content: (
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
      },
      content: {
        content: (
          <div>
            <div>
              <b>Type:</b> {item.card.type}
            </div>
            <div>
              <b>Color:</b> {item.card.colors ? item.card.colors.join('/') : ''}
            </div>
            <div>
              <b>Cost:</b> {item.card.manaCost}
            </div>
          </div>
        ),
      },
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
      {auth.isAuthenticated() ? (
        <div>
          <Button>Import</Button> <Button>Load</Button> <Button>Export</Button>{' '}
          <Button>Save</Button>
        </div>
      ) : (
        <p>Please log in to import/export/save decks.</p>
      )}
      <h4>Deck List ({cardCount} cards):</h4>
      <ul className="deck-list">
        <Accordion styled panels={panels} />
      </ul>
    </div>
  );
};

export default DeckList;
