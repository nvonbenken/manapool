import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo from '../images/logo.svg';
import '../styles/navbar.css';

export default class NavBar extends Component {
  state = { activeItem: 'Home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted style={{ margin: 0, borderRadius: 0 }}>
        <Menu.Item header style={{ width: '235px' }}>
          <Image src={logo} style={{ height: '20px', marginRight: '5px' }} />
          ManaPool
        </Menu.Item>
        <Menu.Item name="Home" active={activeItem === 'Home'} onClick={this.handleItemClick}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item
          name="Card Lookup"
          active={activeItem === 'Card Lookup'}
          onClick={this.handleItemClick}
        >
          <Link to="/cardlookup">Card Lookup</Link>
        </Menu.Item>
        <Menu.Item
          name="Deck Builder"
          active={activeItem === 'Deck Builder'}
          onClick={this.handleItemClick}
        >
          <Link to="/deckbuilder">Deck Builder</Link>
        </Menu.Item>
        <Menu.Item
          name="Login"
          position="right"
          active={activeItem === 'Login'}
          onClick={this.handleItemClick}
        >
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
