import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

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

  render() {
    return (
      <div>
        <NavBar auth={this.props.auth} />
        <div className="container">
          <div className="profile-area">
            <h1>{this.state.profile.name}</h1>
            <div header="Profile">
              <img src={this.state.profile.picture} alt="profile" />
              <div>
                <Icon glyph="user" /> Nickname
                <h3>{this.state.profile.nickname}</h3>
              </div>
              <pre>{JSON.stringify(this.state.profile, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
