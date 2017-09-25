import React, { Component } from 'react';
import { Accordion, Button } from 'semantic-ui-react';

class DeckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  render() {
    console.log(this.props.deck);

    if (!this.props.deck || this.props.deck.size === 0) {
      return (
        <div style={{ flexGrow: 1, padding: '10px' }}>
          <h4>Deck Stats:</h4>
          <div>No cards added to deck.</div>
        </div>
      );
    }

    return (
      <div
        style={{
          flexGrow: 1,
          padding: '10px',
          overflow: 'auto',
        }}
      >
        <h4>Deck Stats</h4>
      </div>
    );
  }
}

export default DeckList;
