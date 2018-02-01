import React from 'react';

import NavBar from './Navbar';
import Footer from './Footer';
import '../styles/home.css';
import '../styles/main.css';

const Home = props => (
  <div className="wrapper">
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
        more useful for you! I'm also planning to get a more funtional mobile version of the site
        completed soon, so look out for that.
      </p>
      <p>
        If you have any suggestions or discover a bug, please tell me about it{' '}
        <a href="https://bitbucket.org/nvonbenken/manapool/issues/new">here.</a>
      </p>
    </div>
    <Footer />
  </div>
);

export default Home;
