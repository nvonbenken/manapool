import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Tab } from 'semantic-ui-react';

import '../styles/app.css';
import '../styles/main.css';
import '../styles/navbar.css';
import '../styles/deckBuilder.css';

import DeckCardList from './DeckCardList';
import DeckList from './DeckList';
import DeckStats from './DeckStats';
import NewFilters from './NewFilters';

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
      deckListVisible: false,
    };

    this.handleSelectCard = this.handleSelectCard.bind(this);
    this.toggleVisibility = () => this.setState({ deckListVisible: !this.state.deckListVisible });
    this.searchResults = this.searchResults.bind(this);
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

  updateDimensions() {
    if (window.innerWidth >= 1024) {
      this.setState({ showTab: false });
    } else {
      this.setState({ showTab: true });
    }
  }

  render() {
    const visible = this.state.deckListVisible;

    const panes = [
      { menuItem: 'Deck', render: () => <DeckList deck={this.state.deck} /> },
      { menuItem: 'Stats', render: () => <DeckStats deck={this.state.deck} /> },
    ];

    if (!this.state.showTab) {
      return (
        <div style={{ display: 'flex', flex: 1 }}>
          <NewFilters onSearchComplete={this.searchResults} />
          <DeckCardList
            style={{ flexGrow: 1, overflow: 'auto' }}
            onCardSelect={selectedCard => this.handleSelectCard(selectedCard)}
            addCard={(selectedCard, quantity) => this.handleAddCard(selectedCard, quantity)}
            removeCard={selectedCard => this.handleRemoveCard(selectedCard)}
            cards={this.state.cards}
            deck={this.state.deck}
          />
          <div style={{ width: '30%', minWidth: '350px' }}>
            <Tab panes={panes} />
          </div>
        </div>
      );
    }

    return (
      <div style={{ width: '100%' }}>
        <Sidebar.Pushable as={Segment} style={{ border: 0, borderRadius: 0 }}>
          <Sidebar
            as={Menu}
            animation="overlay"
            direction="right"
            visible={visible}
            icon="labeled"
            vertical
            className="test"
          >
            <Button
              onClick={this.toggleVisibility}
              style={{
                left: '-54px',
                top: '50px',
                transform: 'rotate(-90deg)',
                position: 'absolute',
                borderRadius: '0px',
              }}
            >
              Deck
            </Button>
            <Tab panes={panes} />
          </Sidebar>
          <Sidebar.Pusher>
            <div style={{ display: 'flex', flex: 1 }}>
              <NewFilters onSearchComplete={this.searchResults} />
              <DeckCardList
                style={{ flexGrow: 1, overflow: 'auto' }}
                onCardSelect={selectedCard => this.handleSelectCard(selectedCard)}
                addCard={(selectedCard, quantity) => this.handleAddCard(selectedCard, quantity)}
                removeCard={selectedCard => this.handleRemoveCard(selectedCard)}
                cards={this.state.cards}
                deck={this.state.deck}
              />
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default CardLookup;
