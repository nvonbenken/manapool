import React, { Component } from 'react';
import { Menu, Image, Dropdown, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo from '../images/logo.svg';
import '../styles/navbar.css';

export default class NavBar extends Component {
  state = { activeItem: 'Home' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted style={{ margin: 0, borderRadius: 0 }}>
        <Menu.Item header style={{ width: '235px' }}>
          <Image src={logo} style={{ height: '20px', marginRight: '5px' }} />
          ManaPool
        </Menu.Item>
        <Link to="/">
          <Menu.Item name="Home" active={activeItem === 'Home'} onClick={this.handleItemClick} />
        </Link>
        <Link to="/cardlookup">
          <Menu.Item
            name="Card Lookup"
            active={activeItem === 'Card Lookup'}
            onClick={this.handleItemClick}
          />
        </Link>
        <Link to="/deckbuilder">
          <Menu.Item
            name="Deck Builder"
            active={activeItem === 'Deck Builder'}
            onClick={this.handleItemClick}
          />
        </Link>
        <Dropdown item simple text="Login">
          <Dropdown.Menu style={{ padding: '10px' }}>
            <Form>
              <Form.Field>
                <label>Username</label>
                <input placeholder="username" />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder="password" />
              </Form.Field>
              <div className="loginLink">
                <a href="#">Forgot password?</a>
              </div>
              <div className="loginLink">
                <a href="#">New? Create an account!</a>
              </div>
              <Button type="submit">
                <Link to="/implicit/callback" />
                Login
              </Button>
            </Form>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}
