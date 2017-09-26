import React, { Component } from 'react';
import { Accordion, Button } from 'semantic-ui-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class DeckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  getManaCurveData(deck) {
    const curveData = new Map();
    let q = 0;
    deck.map((card) => {
      const x = curveData.get(card.card.cmc);
      if (x) {
        q = x.quantity + card.quantity;
      } else {
        q = card.quantity;
      }

      curveData.set(card.card.cmc, { cost: card.card.cmc, quantity: q });
    });
    return Array.from(curveData.values()).sort((a, b) => a.cost - b.cost);
  }

  getCardTypeData(deck) {
    const typeData = new Map();
    let q = 0;
    deck.map((card) => {
      const t = card.card.type.includes('Creature') ? 'Creature' : card.card.type;
      console.log(t);
      const x = typeData.get(t);
      if (x) {
        q = x.quantity + card.quantity;
      } else {
        q = card.quantity;
      }

      typeData.set(t, { type: t, quantity: q });
    });
    return Array.from(typeData.values());
  }

  getColorData(deck) {
    const colorData = new Map();
    let q = 0;
    deck.map((card) => {
      const x = colorData.get(card.card.colors ? card.card.colors.join('/') : '');
      if (x) {
        q = x.quantity + card.quantity;
      } else {
        q = card.quantity;
      }

      colorData.set(card.card.colors ? card.card.colors.join('/') : '', {
        color: card.card.colors ? card.card.colors.join('/') : '',
        quantity: q,
      });
    });

    return Array.from(colorData.values());
  }

  render() {
    const data = Array.from(this.props.deck.values());
    console.log(data);
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
        <h4>Mana Curve:</h4>
        <BarChart
          width={400}
          height={200}
          data={this.getManaCurveData(data)}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="cost" />
          <YAxis allowDecimals={false} padding={{ top: 10 }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="quantity" fill="#82ca9d" />
        </BarChart>

        <h4>Card Distribution:</h4>
        <BarChart
          width={400}
          height={200}
          data={this.getCardTypeData(data)}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="type" />
          <YAxis allowDecimals={false} padding={{ top: 10 }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="quantity" fill="#82ca9d" />
        </BarChart>

        <h4>Color Distribution:</h4>
        <BarChart
          width={400}
          height={200}
          data={this.getColorData(data)}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="color" />
          <YAxis allowDecimals={false} padding={{ top: 10 }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="quantity" fill="#82ca9d" />
        </BarChart>
      </div>
    );
  }
}

export default DeckList;
