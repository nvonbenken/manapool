import React from 'react';
import NavBar from './Navbar';

const About = props => (
  <div>
    <NavBar auth={props.auth} />
    <div className="container">
      <h1>Hello World!</h1>
      <p>This site began as a way to help me learn both React and MtG.</p>
      <p>
        This site is built using React, Semantic UI, Lodash, Recharts, and a few other libraries.
      </p>
      <p>
        Card information is being fetched via the{' '}
        <a href="magicthegathering.io">magicthegathering.io</a> API and card pricing details by{' '}
        <a href="tcgplayer.com">TCGPlayer</a>.
      </p>
    </div>
  </div>
);

export default About;
