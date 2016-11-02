import { ipcRenderer } from 'electron';
import React from 'react';

import Track from './track';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '', tracklist: [{ title: '' }] };
  }

  componentDidMount() {
    ipcRenderer.send('ready');

    ipcRenderer.on('test-release', (e, data) => {
      console.log('data', data);
      this.setState(data);
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>{this.state.title}</h1>
        <ul>{this.state.tracklist.map((track) => <Track track={track} />)}</ul>
      </div>
    );
  }
}
