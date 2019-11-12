import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/app.css';

const Footer = () => (
  <footer className="app-footer">
    <Link to="/about">About</Link>
    <a href="https://bitbucket.org/nvonbenken/manapool/issues/new">Found an issue?</a>
    <a href="https://ko-fi.com/nvonbenken">Donate</a>
  </footer>
);

export default Footer;
