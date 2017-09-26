import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/app.css';

const Footer = () => (
  <footer className="app-footer">
    <a href="#">Github</a>
    <a href="#">Contact</a>
    <Link to="/About">About</Link>
  </footer>
);

export default Footer;
