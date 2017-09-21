import React, { Component } from 'react';

import '../styles/app.css';
import '../styles/navbar.css';

import SidebarOverlay from './Sidebar';
import DeckCardList from './DeckCardList';
import DeckList from './DeckList';

function CreateCard(card, quantity) {
  this.card = card;
  this.quantity = quantity;
}

class CardLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      deck: new Map(),
      selectedCard: [],
      addedCard: undefined,
      quantity: 1,
    };

    this.handleSelectCard = this.handleSelectCard.bind(this);
  }

  handleSelectCard(selectedCard) {
    this.setState({ selectedCard });
  }

  handleAddCard(card, quantity) {
    const d = this.state.deck;
    let x = d.get(card.name);

    if (x) {
      x.quantity += 1;
    } else {
      x = new CreateCard(card, quantity);
    }

    d.set(card.name, x);
    this.setState({ deck: d });
  }

  handleRemoveCard(card) {
    const d = this.state.deck;
    const x = d.get(card.name);

    if (x) {
      if (x.quantity === 1) {
        d.delete(card.name);
      } else {
        x.quantity -= 1;
        d.set(card.name, x);
      }
    }

    this.setState({ deck: d });
  }

  searchResults(cards) {
    if (!cards) {
      this.setState({ cards: [] });
    } else {
      this.setState({ cards: this.state.cards.concat(cards) });
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 85px)' }}>
        <SidebarOverlay onSearchComplete={this.searchResults.bind(this)} />
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ display: 'flex', width: '75%', flexDirection: 'column' }}>
            <DeckCardList
              style={{ flexGrow: 1, overflow: 'auto' }}
              onCardSelect={selectedCard => this.handleSelectCard(selectedCard)}
              addCard={(selectedCard, quantity) => this.handleAddCard(selectedCard, quantity)}
              removeCard={selectedCard => this.handleRemoveCard(selectedCard)}
              cards={this.state.cards}
              deck={this.state.deck}
            />
          </div>
          <DeckList deck={this.state.deck} />
        </div>
      </div>
    );
  }
}

export default CardLookup;
