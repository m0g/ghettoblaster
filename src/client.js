import ReactDOM from 'react-dom';
import React from 'react';
import { Router, hashHistory } from 'react-router';

import routes from './../dist/routes';

ReactDOM.render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('root')
);
