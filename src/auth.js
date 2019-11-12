import auth0 from 'auth0-js';

import history from './history';

export default class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: 'manapool.auth0.com',
    clientID: 'k2ESU1CaH-HUgYjzEv43MEBHHJcc2_lv',
    redirectUri:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/callback'
        : 'https://manapool.org/callback',
    audience: 'https://manapool.auth0.com/api/v2/',
    responseType: 'token id_token',
    scope: 'openid profile email update:current_user_metadata',
  });

  userProfile;

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    history.replace('/home');
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  };

  setSession = (authResult) => {
    console.log(authResult);
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    history.replace('/home');
  };

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  };

  getProfile(cb) {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        console.log(profile);
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }
}
