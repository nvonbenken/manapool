import _ from 'lodash';
import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

import '../styles/filters.css';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      cmc: '',
      cards: [],
      colors: [],
      types: [],
      rarity: [],
      legality: [],
      page: 1,
      visible: true,
    };

    this.handleScroll = this.handleScroll.bind(this, this.state.page, this.state.cards);
  }

  componentDidMount() {
    window.addEventListener('scroll', _.throttle(this.handleScroll, 300));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', _.throttle(this.handleScroll, 300));
  }

  onTermChange = (term) => {
    this.resetSearch();
    this.setState({ term }, _.debounce(this.cardSearch, 300));
  };

  onCmcChange = (cmc) => {
    this.resetSearch();
    this.setState({ cmc }, _.debounce(this.cardSearch, 300));
  };

  handleScroll = () => {
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );

    const pixelsFromWindowBottomToBottom = 0 + docHeight - window.scrollY - window.innerHeight;

    if (pixelsFromWindowBottomToBottom < 200) {
      this.setState({ page: this.state.page + 1 });
      this.setState({
        cards: this.state.cards + this.cardSearch(),
      });
    }
  };

  resetSearch = () => {
    this.setState({ page: 1 });
    this.setState({ cards: [] });
    this.props.onSearchComplete('');
  };

  cardSearch = () => {
    fetch(
      `https://api.magicthegathering.io/v1/cards?contains=imageUrl&pageSize=28&page=${this.state
        .page}&name=${this.state.term}&colors=${this.state.colors.join(
        '|',
      )}&types=${this.state.types.join('|')}&rarity=${this.state.rarity.join('|')}&cmc=${this.state
        .cmc}&gameFormat=${this.state.legality.join('|')}`,
    )
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          cards: this.state.cards.concat(responseJson.cards),
        });
        this.props.onSearchComplete(responseJson.cards);
      });
  };

  render() {
    const colors = [
      { key: 'white', value: 'white', text: 'White' },
      { key: 'black', value: 'black', text: 'Black' },
      { key: 'red', value: 'red', text: 'Red' },
      { key: 'green', value: 'green', text: 'Green' },
      { key: 'blue', value: 'blue', text: 'Blue' },
    ];

    const types = [
      { key: 'instant', value: 'instant', text: 'Instant' },
      { key: 'sorcery', value: 'sorcery', text: 'Sorcery' },
      { key: 'artifact', value: 'artifact', text: 'Artifact' },
      { key: 'creature', value: 'creature', text: 'Creature' },
      { key: 'enchantment', value: 'enchantment', text: 'Enchantment' },
      { key: 'land', value: 'land', text: 'Land' },
      { key: 'plainswalker', value: 'plainswalker', text: 'Plainswalker' },
      { key: 'plane', value: 'plane', text: 'Plane' },
      { key: 'phenomenon', value: 'phenomenon', text: 'Phenomenon' },
      { key: 'scheme', value: 'scheme', text: 'Scheme' },
      { key: 'tribal', value: 'tribal', text: 'Tribal' },
      { key: 'vanguard', value: 'vanguard', text: 'Vanguard' },
    ];

    const rarity = [
      { key: 'common', value: 'common', text: 'Common' },
      { key: 'uncommon', value: 'uncommon', text: 'Uncommon' },
      { key: 'rare', value: 'rare', text: 'Rare' },
      { key: 'mythic rare', value: 'mythic rare', text: 'Mythic Rare' },
      { key: 'special', value: 'special', text: 'Special' },
      { key: 'basic land', value: 'basic land', text: 'Basic Land' },
    ];

    const legality = [
      { key: 'commander', value: 'commander', text: 'Commander' },
      { key: 'legacy', value: 'legacy', text: 'Legacy' },
      { key: 'modern', value: 'modern', text: 'Modern' },
      { key: 'standard', value: 'standard', text: 'Standard' },
      { key: 'vintage', value: 'vintage', text: 'Vintage' },
    ];

    return (
      <div className="filters">
        <label>Name:</label>
        <Input
          icon="search"
          value={this.state.term}
          onChange={event => this.onTermChange(event.target.value)}
          placeholder="Card Name"
        />
        <label>Cost:</label>
        <Input
          icon="search"
          value={this.state.cmc}
          onChange={event => this.onCmcChange(event.target.value)}
          placeholder="CMC"
          type="number"
        />
        <label>Colors:</label>
        <Dropdown
          placeholder="Colors"
          multiple
          selection
          options={colors}
          onChange={(e, data) => {
            this.setState({ colors: data.value }, this.cardSearch);
          }}
        />
        <label>Types:</label>
        <Dropdown
          placeholder="Types"
          multiple
          selection
          options={types}
          onChange={(e, data) => {
            this.setState({ types: data.value }, this.cardSearch);
          }}
        />
        <label>Rarity:</label>
        <Dropdown
          placeholder="Rarity"
          multiple
          selection
          options={rarity}
          onChange={(e, data) => {
            this.setState({ rarity: data.value }, this.cardSearch);
          }}
        />
        <label>Legality:</label>
        <Dropdown
          placeholder="Legality"
          multiple
          selection
          options={legality}
          onChange={(e, data) => {
            this.setState({ legality: data.value }, this.cardSearch);
          }}
        />
      </div>
    );
  }
}

export default Filters;
