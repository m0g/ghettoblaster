//import { ipcRenderer } from 'electron';
import ReactDOM from 'react-dom';
import React from 'react';

import App from './../dist/components/app';

//ipcRenderer.send('ready');

//ipcRenderer.on('test-release', (e, data) => {
//  console.log('data', data);
//});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
