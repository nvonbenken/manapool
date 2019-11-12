import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'normalize.css';
import './styles/index.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
