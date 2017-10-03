import React from 'react';

const About = () => (
  <div className="container">
    <h1>Hello World!</h1>
    <p>This site began as a way to help me learn both React and MtG.</p>
    <p>
      This site is built using React, Redux, Semantic UI, Lodash, Recharts, and a few other
      libraries.
    </p>
    <p>
      Card information is being fetched via the{' '}
      <a href="magicthegathering.io">magicthegathering.io</a> API.
    </p>
    <p>This project was bootstrapped via the create-react-app command.</p>
  </div>
);

export default About;
