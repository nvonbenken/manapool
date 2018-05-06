import React, { Component } from 'react';
import { Icon, Input } from 'semantic-ui-react';
import mtg from 'mtgsdk';
import { SaveMetadata } from '../api/auth0';

import NavBar from './Navbar';
import '../styles/home.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      loading: false,
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        if (!profile) {
          window.location.href = window.location.origin;
        }
        this.setState({ profile, loading: false });
      });
    } else {
      this.setState({ profile: userProfile, loading: false });
    }
  }

  updateDisplayName = (event) => {
    console.log(event.target);
    const metadata = `{ "user_metadata": ${JSON.stringify(this.state.profile.user_metadata)} }`;
    // SaveMetadata(metadata, this.props);
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <NavBar auth={this.props.auth} />
          <div className="home-container">
            <div>Loading</div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <NavBar auth={this.props.auth} />
        <div className="home-container">
          <img src={this.state.profile.picture} width="200px" alt="profile" />
          <div>
            <Icon name="user" /> {this.state.profile.nickname}
          </div>
          {/* <pre>{JSON.stringify(this.state.profile, null, 2)}</pre> */}
          <div>
            <label>Username:</label>
            <Input
              action={{ content: 'Save', onClick: event => this.updateDisplayName(event) }}
              placeholder={this.state.profile.username}
            />
          </div>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <div style={{ flex: 1 }}>
              <h3>Saved Decks</h3>
              <p>Coming soon!</p>
            </div>
            <div style={{ flex: 1 }}>
              <h3>Favorite Cards</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
