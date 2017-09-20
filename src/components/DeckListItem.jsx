import React from 'react';
import { List } from 'semantic-ui-react';

import '../styles/app.css';

const DeckListItem = ({ card, onCardSelect }) => (
  <List.Item onClick={event => onCardSelect(card)} className="deck-list-item">
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <List.Content style={{ flex: 2 }}>{card.name}</List.Content>
      <List.Content style={{ flex: 2 }}>{card.type}</List.Content>
      <List.Content style={{ flex: 2 }}>{card.colors ? card.colors.join('/') : ''}</List.Content>
      <List.Content style={{ flex: 1 }}>{card.cmc}</List.Content>
    </div>
  </List.Item>
);

export default DeckListItem;
