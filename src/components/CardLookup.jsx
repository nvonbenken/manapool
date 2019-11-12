import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import NavBar from './Navbar';
import CardList from './CardList';
import CardDetail from './CardDetail';
import Filters from './Filters';
import Footer from './Footer';
import { GetAccessToken } from '../api/tcgPlayer';

import '../styles/main.css';

class CardLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: new Map(),
      selectedCard: null,
      showModal: false,
      tcgAccessToken: null,
    };

    GetAccessToken().then(response => this.setState({ tcgAccessToken: response }));
  }

  handleOpenModal = (selectedCard) => {
    this.setState({ selectedCard, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  searchResults = (cards) => {
    if (!cards) {
      this.setState({ cards: new Map() });
    } else {
      this.setState({ cards });
    }
  };
  render() {
    return (
      <div className="wrapper">
        <NavBar auth={this.props.auth} />
        <div style={{ flex: 1 }}>
          <Filters onSearchComplete={this.searchResults} />
          <CardList
            onCardSelect={selectedCard => this.handleOpenModal(selectedCard)}
            cards={this.state.cards}
          />
          <Modal open={this.state.showModal} onClose={this.handleCloseModal} closeIcon>
            <Modal.Header>Card Details</Modal.Header>
            <Modal.Content>
              <CardDetail
                cardArr={this.state.selectedCard}
                accessToken={this.state.tcgAccessToken}
                auth={this.props.auth}
              />
            </Modal.Content>
          </Modal>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CardLookup;
