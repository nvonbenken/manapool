import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import CardLookup from './CardLookup';
import DeckBuilder from './DeckBuilder';
import About from './About';

import '../styles/main.css';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/cardlookup" component={CardLookup} />
      <Route path="/deckbuilder" component={DeckBuilder} />
      <Route path="/about" component={About} />
    </Switch>
  </main>
);

export default Main;
