import { ipcRenderer } from 'electron';
import React from 'react';

import Track from './track';
import Search from './search';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.play = this.play.bind(this);

    this.state = { 
      title: '', 
      artists: [{ name: '' }],
      tracklist: [{ title: '' }] 
    };
  }

  componentDidMount() {
    ipcRenderer.send('ready');

    ipcRenderer.on('test-release', (e, data) => {
      console.log('data', data);
      this.setState(data);
    });
  }

  play(track) {
    ipcRenderer.send('play-track', {
      artist: this.state.artists[0].name,
      track: track.title
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Search />
      </div>
    );
  }
}
