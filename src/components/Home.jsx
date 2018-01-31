import React from 'react';

import NavBar from './Navbar';
import '../styles/home.css';

const Home = props => (
  <div>
    <NavBar auth={props.auth} />
    <div className="home-container">
      <h1>Welcome to ManaPool!</h1>
      <p>
        This site provides the functionality to look up cards you may be interested in based on a
        number of available filters. It also allows you to create a deck, which is broken down by a
        few statistics with more coming soon! You can also opt to create an account in order to save
        decks and load them on your next visit.
      </p>
      <p>
        In the future I plan to expand the filters and statistics further, while making the site
        more useful for you! If you have any suggestions or discover a bug, please tell me about it{' '}
        <a href="https://bitbucket.org/nvonbenken/manapool/issues/new">here.</a>
      </p>
    </div>
  </div>
);

export default Home;
