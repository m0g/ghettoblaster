import ReactDOM from 'react-dom';
import React from 'react';
import { Router, hashHistory } from 'react-router';


import routes from './../dist/routes';

//ipcRenderer.send('ready');

//ipcRenderer.on('test-release', (e, data) => {
//  console.log('data', data);
//});

ReactDOM.render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('root')
);
