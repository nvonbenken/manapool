import React from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';

import DeckSelectedCard from './DeckSelectedCard';
import '../styles/deckBuilder.css';

const DeckCardList = (props) => {
  const handleAddCard = function handleAddCard(e, item) {
    e.stopPropagation();
    props.addCard(item, 1);
  };

  const handleRemoveCard = function handleRemoveCard(e, item) {
    e.stopPropagation();
    props.removeCard(item);
  };

  const d = props.deck ? props.deck : new Map();

  const toPanel = (card) => {
    if (d.get(card.name)) {
      return {
        key: card.id,
        title: {
          content: (
            <div className="deck-list-item">
              <div className="deck-list-item-name" style={{ maxWidth: 'calc(100vw - 1500px)' }}>
                {card.name}
              </div>
              <div style={{ width: '150px' }}>{card.type}</div>
              <div style={{ width: '100px' }}>{card.colors ? card.colors.join('/') : ''}</div>
              <div style={{ width: '50px' }}>{card.cmc}</div>
              <div>
                <Button.Group icon>
                  <Button onClick={event => handleAddCard(event, card)}>
                    <Icon name="plus" />
                  </Button>
                  <Button onClick={event => handleRemoveCard(event, card)}>
                    <Icon name="minus" />
                  </Button>
                </Button.Group>
              </div>
            </div>
          ),
        },
        content: { content: <DeckSelectedCard card={card} /> },
      };
    }
    return {
      key: card.id,
      title: {
        content: (
          <div className="deck-list-item">
            <div className="deck-list-item-name" style={{ maxWidth: 'calc(100vw - 1500px)' }}>
              {card.name}
            </div>
            <div style={{ width: '150px' }}>{card.type}</div>
            <div style={{ width: '100px' }}>{card.colors ? card.colors.join('/') : ''}</div>
            <div style={{ width: '50px' }}>{card.cmc}</div>
            <div>
              <Button.Group icon>
                <Button onClick={event => handleAddCard(event, card)}>
                  <Icon name="plus" />
                </Button>
                <Button disabled onClick={event => handleRemoveCard(event, card)}>
                  <Icon name="minus" />
                </Button>
              </Button.Group>
            </div>
          </div>
        ),
      },
      content: { content: <DeckSelectedCard card={card} /> },
    };
  };

  const cardItems = Array.from(props.cards.values()).map(cards => toPanel(cards[0]));

  if (!cardItems || cardItems.length === 0) {
    return (
      <div className="container deck-container">
        <p>To build a deck, use the search on the left to find cards.</p>
        <p>You can add and remove card from your deck as you like.</p>
        <p>The legalities of your deck, as well as the mana curve will update as you go.</p>
      </div>
    );
  }

  return <Accordion styled className="deck-container deck-card-list" panels={cardItems} />;
};

export default DeckCardList;
