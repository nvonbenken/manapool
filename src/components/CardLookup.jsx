import React, { Component } from "react";
import { Modal } from "semantic-ui-react";

import NavBar from "./Navbar";
import CardList from "./CardList";
import CardDetail from "./CardDetail";
import Filters from "./Filters";
import Footer from "./Footer";
import { GetAccessToken } from "../api/tcgPlayer.js";

import "../styles/main.css";

class CardLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: new Map(),
      selectedCard: null,
      showModal: false,
      tcgAccessToken: null
    };

    this.getAccessToken();
  }

  getAccessToken = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.tcgplayer.com/token",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        },
        method: "POST",
        body:
          "grant_type=client_credentials&client_id=0A436DDE-5EB7-4B14-881B-3971A625B541&client_secret=62EF4907-FD23-445A-A586-0581DDBE4CB3"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ tcgAccessToken: responseJson.access_token });
      });
  };

  handleOpenModal = selectedCard => {
    this.setState({ selectedCard });
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  searchResults = cards => {
    if (!cards) {
      this.setState({ cards: new Map() });
    } else {
      this.setState({ cards });
    }
  };

  render() {
    GetAccessToken().then(response => console.log(response));
    return (
      <div className="wrapper">
        <NavBar auth={this.props.auth} />
        <div style={{ flex: 1 }}>
          <Filters onSearchComplete={this.searchResults} />
          <CardList
            onCardSelect={selectedCard => this.handleOpenModal(selectedCard)}
            cards={this.state.cards}
          />
          <Modal
            open={this.state.showModal}
            onClose={this.handleCloseModal}
            closeIcon
          >
            <Modal.Header>Card Details</Modal.Header>
            <Modal.Content>
              <CardDetail
                cardArr={this.state.selectedCard}
                accessToken={this.state.tcgAccessToken}
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
