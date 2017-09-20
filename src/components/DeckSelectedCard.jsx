import React, { Component } from 'react';
import '../styles/deckBuilder.css';

class DeckSelectedCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card: '',
      quantity: '1',
    };
  }

  onInputChange(quantity) {
    this.setState({
      quantity,
    });
  }

  render() {
    const card = this.props.card;

    if (!card || card.length === 0) {
      return <h4 style={{ flex: 2, padding: '10px' }}>Select a card to begin.</h4>;
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 2,
          padding: '10px',
        }}
      >
        <div className="deck-details">
          <div className="image-container">
            <img src={card.imageUrl} alt="" />
            <a
              href={`http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${card.multiverseid}`}
            >
              View on Wizards.com
            </a>
          </div>
          <div>
            <div>
              <label>
                <strong>Name: </strong>
              </label>
              {card.name}
            </div>
            <div>
              <label>
                <strong>Mana Cost: </strong>
              </label>
              {card.manaCost}
            </div>
            <div>
              <label>
                <strong>Text: </strong>
              </label>
              {card.text}
            </div>
            <div>
              <label>
                <strong>Type: </strong>
              </label>
              {card.type}
            </div>
          </div>
        </div>
        <div />
      </div>
    );
  }
}

export default DeckSelectedCard;
