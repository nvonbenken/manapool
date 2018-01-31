import React, { Component } from 'react';
import { Icon, Input } from 'semantic-ui-react';

import NavBar from './Navbar';
import '../styles/home.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
    };
  }

  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        if (!profile) {
          window.location.href = window.location.origin;
        }
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    return (
      <div>
        <NavBar auth={this.props.auth} />
        <div className="home-container">
          <img src={this.state.profile.picture} width="200px" alt="profile" />
          <div>
            <Icon name="user" /> {this.state.profile.nickname}
          </div>
          {/* <pre>{JSON.stringify(this.state.profile, null, 2)}</pre>
          <div>
            <label>Username:</label>
            <Input
              action={{ content: 'Edit', onClick: () => console.log('test') }}
              placeholder={this.state.profile.username}
            />
          </div> */}
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <div style={{ flex: 1 }}>
              <h3>Saved Decks</h3>
              <p>Coming soon!</p>
            </div>
            <div style={{ flex: 1 }}>
              <h3>Favorited Cards</h3>
              <p>Coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
