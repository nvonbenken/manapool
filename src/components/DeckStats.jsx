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

  render() {
    const data = Array.from(this.props.deck.values());

    if (!this.props.deck || this.props.deck.size === 0) {
      return (
        <div style={{ flexGrow: 1, padding: '10px' }}>
          <h4>Deck Stats:</h4>
          <div>No cards added to deck.</div>
        </div>
      );
    }

    console.log(data);

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
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="card.cmc" />
          <YAxis allowDecimals={false} padding={{ top: 10 }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#82ca9d" />
        </BarChart>
        <h4>Card Distribution:</h4>
        <h4>Color Distribution:</h4>
        <BarChart
          width={400}
          height={200}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="card.colors" />
          <YAxis allowDecimals={false} padding={{ top: 10 }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#82ca9d" />
        </BarChart>
      </div>
    );
  }
}

export default DeckList;
