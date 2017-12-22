import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Tab } from 'semantic-ui-react';

import '../styles/app.css';
import '../styles/main.css';
import '../styles/navbar.css';
import '../styles/deckBuilder.css';

import NavBar from './Navbar';
import DeckCardList from './DeckCardList';
import DeckList from './DeckList';
import DeckStats from './DeckStats';
import Filters from './Filters';

function CreateCard(card, quantity) {
  this.card = card;
  this.quantity = quantity;
}

class CardLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: new Map(),
      deck: new Map(),
      selectedCard: [],
      addedCard: undefined,
      quantity: 1,
      deckListVisible: false,
      showTab: false,
    };
  }

  componentWillMount() {
    // Check cache for deck
    const cacheResults = sessionStorage.getItem('deck');

    if (cacheResults) {
      this.setState({ deck: new Map(JSON.parse(cacheResults)) });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    sessionStorage.setItem('deck', JSON.stringify(Array.from(this.state.deck.entries())));
  }

  toggleVisibility = () => this.setState({ deckListVisible: !this.state.deckListVisible });

  handleSelectCard = (selectedCard) => {
    this.setState({ selectedCard });
  };

  handleAddCard = (card, quantity) => {
    const d = this.state.deck;
    let x = d.get(card.name);

    if (x) {
      x.quantity += 1;
    } else {
      x = new CreateCard(card, quantity);
    }

    d.set(card.name, x);
    this.setState({ deck: d });
    sessionStorage.setItem('deck', JSON.stringify(Array.from(this.state.deck.entries())));
  };

  handleRemoveCard = (card) => {
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
    sessionStorage.setItem('deck', JSON.stringify(Array.from(this.state.deck.entries())));
  };

  searchResults = (cards) => {
    if (!cards) {
      this.setState({ cards: new Map() });
    } else {
      this.setState({ cards });
    }
  };

  updateDimensions = () => {
    if (window.innerWidth >= 1024) {
      this.setState({ showTab: false });
    } else {
      this.setState({ showTab: true });
    }
  };

  render() {
    const visible = this.state.deckListVisible;

    const panes = [
      { menuItem: 'Deck', render: () => <DeckList deck={this.state.deck} /> },
      { menuItem: 'Stats', render: () => <DeckStats deck={this.state.deck} /> },
    ];

    return (
      <div>
        <NavBar auth={this.props.auth} />
        {this.state.showTab ? (
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
                  <Filters onSearchComplete={this.searchResults} />
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
        ) : (
          <div style={{ display: 'flex', flex: 1 }}>
            <Filters onSearchComplete={this.searchResults} />
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
        )}
      </div>
    );

    // if (!this.state.showTab) {
    //   return (
    //     <div style={{ display: 'flex', flex: 1 }}>
    //       <Filters onSearchComplete={this.searchResults} />
    //       <DeckCardList
    //         style={{ flexGrow: 1, overflow: 'auto' }}
    //         onCardSelect={selectedCard => this.handleSelectCard(selectedCard)}
    //         addCard={(selectedCard, quantity) => this.handleAddCard(selectedCard, quantity)}
    //         removeCard={selectedCard => this.handleRemoveCard(selectedCard)}
    //         cards={this.state.cards}
    //         deck={this.state.deck}
    //       />
    //       <div style={{ width: '30%', minWidth: '350px' }}>
    //         <Tab panes={panes} />
    //       </div>
    //     </div>
    //   );
    // }

    // return (
    //   <div style={{ width: '100%' }}>
    //     <Sidebar.Pushable as={Segment} style={{ border: 0, borderRadius: 0 }}>
    //       <Sidebar
    //         as={Menu}
    //         animation="overlay"
    //         direction="right"
    //         visible={visible}
    //         icon="labeled"
    //         vertical
    //         className="test"
    //       >
    //         <Button
    //           onClick={this.toggleVisibility}
    //           style={{
    //             left: '-54px',
    //             top: '50px',
    //             transform: 'rotate(-90deg)',
    //             position: 'absolute',
    //             borderRadius: '0px',
    //           }}
    //         >
    //           Deck
    //         </Button>
    //         <Tab panes={panes} />
    //       </Sidebar>
    //       <Sidebar.Pusher>
    //         <div style={{ display: 'flex', flex: 1 }}>
    //           <Filters onSearchComplete={this.searchResults} />
    //           <DeckCardList
    //             style={{ flexGrow: 1, overflow: 'auto' }}
    //             onCardSelect={selectedCard => this.handleSelectCard(selectedCard)}
    //             addCard={(selectedCard, quantity) => this.handleAddCard(selectedCard, quantity)}
    //             removeCard={selectedCard => this.handleRemoveCard(selectedCard)}
    //             cards={this.state.cards}
    //             deck={this.state.deck}
    //           />
    //         </div>
    //       </Sidebar.Pusher>
    //     </Sidebar.Pushable>
    //   </div>
  }
}

export default CardLookup;
