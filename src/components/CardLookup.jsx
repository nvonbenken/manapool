import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import CardList from './CardList';
import CardDetail from './CardDetail';
import Filters from './Filters';

class CardLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: new Map(),
      selectedCard: null,
      showModal: false,
    };
  }

  handleOpenModal = (selectedCard) => {
    this.setState({ selectedCard });
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  searchResults = (cards) => {
    if (!cards) {
      this.setState({ cards: new Map() });
    } else {
      this.setState({ cards: new Map([...this.state.cards, ...cards]) });
    }
  };

  selectedCard = (card) => {
    this.setState({ selectedCard: card });
  };

  render() {
    return (
      <div style={{ display: 'flex', flex: 1 }}>
        <Filters onSearchComplete={this.searchResults} />
        <CardList
          onCardSelect={selectedCard => this.handleOpenModal(selectedCard)}
          cards={this.state.cards}
        />
        <Modal open={this.state.showModal} onClose={this.handleCloseModal} closeIcon>
          <Modal.Header>Card Details</Modal.Header>
          <Modal.Content>
            <CardDetail card={this.state.selectedCard} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default CardLookup;
