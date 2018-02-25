import React from 'react';
import { Route, Router } from 'react-router-dom';
import ReactGA from 'react-ga';

import Auth from './auth';
import history from './history';

import Callback from './components/Callback';
import Home from './components/Home';
import CardLookup from './components/CardLookup';
import DeckBuilder from './components/DeckBuilder';
import About from './components/About';
import Profile from './components/Profile';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

ReactGA.initialize('UA-114295617-1');

ReactGA.ga('create', 'UA-114295617-1', 'auto');
ReactGA.ga('send', 'pageview');

history.listen((location) => {
  ReactGA.ga('send', 'pageview', location.pathname);
});

const Routes = () => (
  <Router history={history} component={Home}>
    <div>
      <Route exact path="/" render={props => <Home auth={auth} {...props} />} />
      <Route path="/home" render={props => <Home auth={auth} {...props} />} />
      <Route path="/cardlookup" render={props => <CardLookup auth={auth} {...props} />} />
      <Route path="/deckbuilder" render={props => <DeckBuilder auth={auth} {...props} />} />
      <Route path="/about" render={props => <About auth={auth} {...props} />} />
      <Route path="/profile" render={props => <Profile auth={auth} {...props} />} />
      <Route
        path="/callback"
        render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />;
        }}
      />
    </div>
  </Router>
);

export default Routes;
