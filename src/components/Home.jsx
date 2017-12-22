import React from 'react';

import NavBar from './Navbar';
import '../styles/home.css';

const Home = props => (
  <div>
    <NavBar auth={props.auth} />
    <div className="container">
      <h1>Welcome to ManaPool!</h1>
      <p>Site under construction, more content coming soon.</p>
      <p>
        Check out the functional <a href="/cardlookup">Card Lookup</a> tool.
      </p>
      <p>
        The <a href="/deckbuilder">Deck Builder</a> is also mostly complete.
      </p>
    </div>
  </div>
);

export default Home;
