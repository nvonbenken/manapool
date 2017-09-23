import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Input, Accordion, Icon } from 'semantic-ui-react';

import '../styles/filters.css';

class Filters extends Component {
  static propTypes = {
    onFilterChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      filters: [],
    };

    this.updateFilters = this.updateFilters.bind(this);
  }

  getColors() {
    const elements = document.getElementById('colorList').querySelectorAll('input:checked');
    const values = Array.prototype.map.call(elements, (el, i) => el.value);
    return values.join('|');
  }

  getTypes() {
    const elements = document.getElementById('typeList').querySelectorAll('input:checked');
    const values = Array.prototype.map.call(elements, (el, i) => el.value);
    return values.join('|');
  }

  getRarity() {
    const elements = document.getElementById('rarityList').querySelectorAll('input:checked');
    const values = Array.prototype.map.call(elements, (el, i) => el.value);
    return values.join('|');
  }

  getLegality() {
    const elements = document.getElementById('legalityList').querySelectorAll('input:checked');
    const values = Array.prototype.map.call(elements, (el, i) => el.value);
    return values.join('|');
  }

  getCost() {
    return document.getElementById('costInput').value;
  }

  updateFilters() {
    const colors = this.getColors();
    const types = this.getTypes();
    const rarity = this.getRarity();
    const cost = this.getCost();
    const legality = this.getLegality();
    this.setState({ filters: [colors, types, rarity, cost, legality] });
    this.props.onFilterChange([colors, types, rarity, cost, legality]);
  }

  render() {
    const colors = [
      { value: 'white', label: 'White' },
      { value: 'black', label: 'Black' },
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue' },
    ];

    const types = [
      { value: 'instant', label: 'Instant' },
      { value: 'sorcery', label: 'Sorcery' },
      { value: 'artifact', label: 'Artifact' },
      { value: 'creature', label: 'Creature' },
      { value: 'enchantment', label: 'Enchantment' },
      { value: 'land', label: 'Land' },
      { value: 'plainswalker', label: 'Plainswalker' },
      { value: 'plane', label: 'Plane' },
      { value: 'phenomenon', label: 'Phenomenon' },
      { value: 'scheme', label: 'Scheme' },
      { value: 'tribal', label: 'Tribal' },
      { value: 'vanguard', label: 'Vanguard' },
    ];

    const rarity = [
      { value: 'common', label: 'Common' },
      { value: 'uncommon', label: 'Uncommon' },
      { value: 'rare', label: 'Rare' },
      { value: 'mythic rare', label: 'Mythic Rare' },
      { value: 'special', label: 'Special' },
      { value: 'basic land', label: 'Basic Land' },
    ];

    const legality = [
      { value: 'commander', label: 'Commander' },
      { value: 'legacy', label: 'Legacy' },
      { value: 'modern', label: 'Modern' },
      { value: 'standard', label: 'Standard' },
      { value: 'vintage', label: 'Vintage' },
    ];

    return (
      <div>
        <div style={{ textAlign: 'left' }}>
          <h4>Cost:</h4>
          <Input
            id="costInput"
            icon="search"
            type="number"
            placeholder="CMC"
            style={{ marginBottom: '10px' }}
            onChange={_.debounce(this.updateFilters, 300)}
          />
          <Accordion inverted>
            <Accordion.Title style={{ paddingBottom: 0 }}>
              <Icon name="dropdown" />
              <h4 style={{ display: 'inline' }}>Color</h4>
            </Accordion.Title>
            <Accordion.Content>
              <ul id="colorList" style={{ listStyle: 'none', margin: 0 }}>
                {colors.map(color => (
                  <li>
                    <input type="checkbox" value={color.value} onChange={this.updateFilters} />
                    <label>{color.label}</label>
                  </li>
                ))}
              </ul>
            </Accordion.Content>
          </Accordion>
          <Accordion inverted>
            <Accordion.Title style={{ paddingBottom: 0 }}>
              <Icon name="dropdown" />
              <h4 style={{ display: 'inline' }}>Type</h4>
            </Accordion.Title>
            <Accordion.Content>
              <ul id="typeList" style={{ listStyle: 'none', margin: 0 }}>
                {types.map(type => (
                  <li>
                    <input type="checkbox" value={type.value} onChange={this.updateFilters} />
                    <label>{type.label}</label>
                  </li>
                ))}
              </ul>
            </Accordion.Content>
          </Accordion>
          <Accordion inverted>
            <Accordion.Title style={{ paddingBottom: 0 }}>
              <Icon name="dropdown" />
              <h4 style={{ display: 'inline' }}>Rarity</h4>
            </Accordion.Title>
            <Accordion.Content>
              <ul id="rarityList" style={{ listStyle: 'none', margin: 0 }}>
                {rarity.map(rare => (
                  <li>
                    <input type="checkbox" value={rare.value} onChange={this.updateFilters} />
                    <label>{rare.value}</label>
                  </li>
                ))}
              </ul>
            </Accordion.Content>
          </Accordion>
          <Accordion inverted>
            <Accordion.Title style={{ paddingBottom: 0 }}>
              <Icon name="dropdown" />
              <h4 style={{ display: 'inline' }}>Legality</h4>
            </Accordion.Title>
            <Accordion.Content>
              <ul id="legalityList" style={{ listStyle: 'none', margin: 0 }}>
                {legality.map(legal => (
                  <li>
                    <input type="checkbox" value={legal.value} onChange={this.updateFilters} />
                    <label>{legal.label}</label>
                  </li>
                ))}
              </ul>
            </Accordion.Content>
          </Accordion>
        </div>
      </div>
    );
  }
}

export default Filters;
