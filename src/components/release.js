import {ipcRenderer} from 'electron';
import React from 'react';

import Track from './track';

export default class Release extends React.Component {
  constructor(props) {
    super(props);

    this.play = this.play.bind(this);

    this.state = { results: {
      status: false,
      releas3: {}
    }};
  }

  componentDidMount() {
    ipcRenderer.send('get-release-query', this.props.routeParams.id);
    ipcRenderer.on('get-release-result', this.updateResults.bind(this))
  }

  updateResults(e, release) {
    this.setState({ results: { status: true, release }})
  }

  play(track) {
    ipcRenderer.send('play-track', {
      artist: this.state.results.release.title,
      track: track.title
    });
  }

  render() {
    if (this.state.results.status)
      return (
        <div>
          <h1>{this.state.results.release.title} ({this.state.results.release.date})</h1>
          <ul>{this.state.results.release.tracks.map((track) =>
            <Track track={track} setPlay={this.play} />
          )}</ul>
        </div>
      )
    else
      return (
        <div>Loading...</div>
      )
  }
}
