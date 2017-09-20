import React from 'react';
import { Table, Divider } from 'semantic-ui-react';

import '../styles/cardDetail.css';

const CardDetail = ({ card }) => {
  if (!card) {
    return <div>Loading...</div>;
  }

  let rulings = null;

  if (typeof card.rulings === 'undefined') {
    rulings = (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rulings</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>No rulings found.</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  } else {
    rulings = (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">Rulings</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Ruling</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {card.rulings.map(item => (
            <Table.Row key={item.multiverseid}>
              <Table.Cell style={{ width: '100px' }}>{item.date}</Table.Cell>
              <Table.Cell>{item.text}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  let legalities = null;

  if (typeof card.legalities === 'undefined') {
    legalities = (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Legalities</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>No legalities found..</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  } else {
    legalities = (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">Legalities</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Format</Table.HeaderCell>
            <Table.HeaderCell>Legality</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {card.legalities.map(item => (
            <Table.Row key={item.multiverseid}>
              <Table.Cell style={{ width: '100px' }}>{item.format}</Table.Cell>
              <Table.Cell>{item.legality}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  return (
    <div>
      <div className="details">
        <div className="image-container">
          <img src={card.imageUrl} alt="Loading..." />
          <a
            href={`http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${card.multiverseid}`}
          >
            View on Wizards.com
          </a>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
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
              <strong>Type: </strong>
            </label>
            {card.type}
          </div>
          <div>
            <label>
              <strong>Color: </strong>
            </label>
            {card.colors}
          </div>
          <div>
            <label>
              <strong>Rarity: </strong>
            </label>
            {card.rarity}
          </div>
          <div>
            <label>
              <strong>Set: </strong>
            </label>
            {card.setName}
          </div>
          <div>
            <label>
              <strong>Text: </strong>
            </label>
            {card.text}
          </div>
          <div>
            <label>
              <strong>Flavor: </strong>
            </label>
            {card.flavor}
          </div>
          <div>
            <label>
              <strong>Artist: </strong>
            </label>
            {card.artist}
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ paddingRight: '10px' }}>{legalities}</div>
          <div>{rulings}</div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
