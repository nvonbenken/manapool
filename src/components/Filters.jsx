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
    // const colors = [
    //   { value: 'white', label: 'White' },
    //   { value: 'black', label: 'Black' },
    //   { value: 'red', label: 'Red' },
    //   { value: 'green', label: 'Green' },
    //   { value: 'blue', label: 'Blue' },
    // ];

    // const types = [
    //   { value: 'instant', label: 'Instant' },
    //   { value: 'sorcery', label: 'Sorcery' },
    //   { value: 'artifact', label: 'Artifact' },
    //   { value: 'creature', label: 'Creature' },
    //   { value: 'enchantment', label: 'Enchantment' },
    //   { value: 'land', label: 'Land' },
    //   { value: 'plainswalker', label: 'Plainswalker' },
    // ];

    // const rarity = [
    //   { value: 'common', label: 'Common' },
    //   { value: 'uncommon', label: 'Uncommon' },
    //   { value: 'rare', label: 'Rare' },
    //   { value: 'mythic rare', label: 'Mythic Rare' },
    //   { value: 'special', label: 'Special' },
    //   { value: 'basic land', label: 'Basic Land' },
    // ];

    const updateFilters = _.debounce(() => {
      this.updateFilters();
    }, 200);

    return (
      <div>
        <div>
          <div style={{ textAlign: 'left' }}>
            <h4>Cost:</h4>
            <Input
              id="costInput"
              icon="search"
              type="number"
              placeholder="CMC"
              style={{ marginBottom: '10px' }}
              onChange={updateFilters.bind(this)}
            />
            <Accordion inverted>
              <Accordion.Title>
                <Icon name="dropdown" />
                <h4 style={{ display: 'inline' }}>Color</h4>
              </Accordion.Title>
              <Accordion.Content>
                <ul id="colorList" style={{ listStyle: 'none' }}>
                  <li>
                    <input type="checkbox" value="Black" onChange={updateFilters.bind(this)} />
                    <label>Black</label>
                  </li>
                  <li>
                    <input type="checkbox" value="White" onChange={updateFilters.bind(this)} />
                    <label>White</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Green" onChange={updateFilters.bind(this)} />
                    <label>Green</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Blue" onChange={updateFilters.bind(this)} />
                    <label>Blue</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Red" onChange={updateFilters.bind(this)} />
                    <label>Red</label>
                  </li>
                </ul>
              </Accordion.Content>
            </Accordion>
            <Accordion inverted>
              <Accordion.Title>
                <Icon name="dropdown" />
                <h4 style={{ display: 'inline' }}>Type</h4>
              </Accordion.Title>
              <Accordion.Content>
                <ul id="typeList" style={{ listStyle: 'none' }}>
                  <li>
                    <input type="checkbox" value="Instant" onChange={updateFilters.bind(this)} />
                    <label>Instant</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Creature" onChange={updateFilters.bind(this)} />
                    <label>Creature</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Sorcery" onChange={updateFilters.bind(this)} />
                    <label>Sorcery</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Artifact" onChange={updateFilters.bind(this)} />
                    <label>Artifact</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      value="Plainswalker"
                      onChange={updateFilters.bind(this)}
                    />
                    <label>Plainswalker</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      value="Enchantment"
                      onChange={updateFilters.bind(this)}
                    />
                    <label>Enchantment</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Land" onChange={updateFilters.bind(this)} />
                    <label>Land</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Plane" onChange={updateFilters.bind(this)} />
                    <label>Plane</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Phenomenon" onChange={updateFilters.bind(this)} />
                    <label>Phenomenon</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Scheme" onChange={updateFilters.bind(this)} />
                    <label>Scheme</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Tribal" onChange={updateFilters.bind(this)} />
                    <label>Tribal</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Vanguard" onChange={updateFilters.bind(this)} />
                    <label>Vanguard</label>
                  </li>
                </ul>
              </Accordion.Content>
            </Accordion>
            <Accordion inverted>
              <Accordion.Title>
                <Icon name="dropdown" />
                <h4 style={{ display: 'inline' }}>Rarity</h4>
              </Accordion.Title>
              <Accordion.Content>
                <ul id="rarityList" style={{ listStyle: 'none' }}>
                  <li>
                    <input type="checkbox" value="Common" onChange={updateFilters.bind(this)} />
                    <label>Common</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Uncommon" onChange={updateFilters.bind(this)} />
                    <label>Uncommon</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Rare" onChange={updateFilters.bind(this)} />
                    <label>Rare</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      value="Mythic Rare"
                      onChange={updateFilters.bind(this)}
                    />
                    <label>Mythic Rare</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Special" onChange={updateFilters.bind(this)} />
                    <label>Special</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Basic Land" onChange={updateFilters.bind(this)} />
                    <label>Basic Land</label>
                  </li>
                </ul>
              </Accordion.Content>
            </Accordion>
            <Accordion inverted>
              <Accordion.Title>
                <Icon name="dropdown" />
                <h4 style={{ display: 'inline' }}>Legality</h4>
              </Accordion.Title>
              <Accordion.Content>
                <ul id="legalityList" style={{ listStyle: 'none' }}>
                  <li>
                    <input type="checkbox" value="Commander" onChange={updateFilters.bind(this)} />
                    <label>Commander</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Legacy" onChange={updateFilters.bind(this)} />
                    <label>Legacy</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Modern" onChange={updateFilters.bind(this)} />
                    <label>Modern</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Standard" onChange={updateFilters.bind(this)} />
                    <label>Standard</label>
                  </li>
                  <li>
                    <input type="checkbox" value="Vintage" onChange={updateFilters.bind(this)} />
                    <label>Vintage</label>
                  </li>
                </ul>
              </Accordion.Content>
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;
