import React, { Component } from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo from '../images/logo.svg';
import '../styles/navbar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
    };
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated()) {
      this.setState({ profile: {} });
      const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
        });
      } else {
        this.setState({ profile: userProfile });
      }
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  // calls the login method in authentication service
  login = () => {
    this.props.auth.login();
  };
  // calls the logout method in authentication service
  logout = () => {
    this.props.auth.logout();
  };

  render() {
    // Use this to show either login or user profile links on navbar.
    const { isAuthenticated } = this.props.auth;
    return (
      <Menu inverted style={{ margin: 0, borderRadius: 0 }}>
        <Menu.Item header style={{ width: '235px' }}>
          <Image src={logo} style={{ height: '20px', marginRight: '5px' }} />
          ManaPool
        </Menu.Item>
        <Menu.Item name="Home" onClick={this.handleItemClick} as={Link} to="/" />
        <Menu.Item name="Card Lookup" onClick={this.handleItemClick} as={Link} to="/cardlookup" />
        <Menu.Item name="Deck Builder" onClick={this.handleItemClick} as={Link} to="/deckbuilder" />
        {isAuthenticated() ? (
          <Dropdown item text={this.state.profile.nickname}>
            <Dropdown.Menu style={{ padding: '10px' }}>
              <Dropdown.Item as={Link} to="/profile" text="Edit Profile" />
              <Dropdown.Item onClick={this.logout} text="Logout" />
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Menu.Item name="Login" onClick={this.login} />
        )}
      </Menu>
    );
  }
}

export default NavBar;
