import { ipcRenderer } from 'electron';
import React from 'react';
import { Link } from 'react-router';

import Track from './track';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: {
      status: false,
      artists: [],
      youtubeResults: []
    }};
  }

  componentDidMount() {
    ipcRenderer.on('search-artists-result', this.updateResults.bind(this));
    ipcRenderer.on('search-youtube-result', this.updateYoutubeResults.bind(this));
  }

  updateResults(e, artists) {
    console.log('update results', e, artists);
    let state = this.state;
    state.status = true;
    state.artists = artists;
    this.setState(state);
  }

  updateYoutubeResults(e, results) {
    let state = this.state;
    state.youtubeResults = results;
    this.setState(state);
  }

  render() {
    let results;

    if (this.state.status)
      return (
        <section id="search-results">
          <h1>Results</h1>

          <div id="mb-results">
            <h2>MusicBrainz</h2>
            <ul>{this.state.artists.map((artist) => 
              <li><Link to={`/a/${artist.id}`}>{artist.name}</Link></li>
            )}</ul>
          </div>

          <div id="yt-results">
            <h2>Youtube</h2>
            <ul>{this.state.youtubeResults.map((item) => 
              <Track track={item} />
            )}</ul>
          </div>
        </section>
      );
    else
      return (
        <div>Loading...</div>
      );
  }
}

