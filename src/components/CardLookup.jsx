import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import CardList from './CardList';
import CardDetail from './CardDetail';
import Filters from './Filters';

class CardLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      selectedCard: null,
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.searchResults = this.searchResults.bind(this);
  }

  handleOpenModal(selectedCard) {
    this.setState({ selectedCard });
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  searchResults(cards) {
    if (!cards) {
      this.setState({ cards: [] });
    } else {
      this.setState({ cards: this.state.cards.concat(cards) });
    }
  }

  selectedCard(card) {
    this.setState({ selectedCard: card });
  }

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
