import {ipcRenderer} from 'electron';
import React from 'react';
import {Link} from 'react-router';

export default class Artist extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: {
      status: false,
      artist: {}
    }};
  }

  componentDidMount() {
    ipcRenderer.send('get-artist-query', this.props.routeParams.id);
    ipcRenderer.on('get-artist-result', this.updateResults.bind(this))
  }

  updateResults(e, artist) {
    console.log('update results', e, artist);
    this.setState({ results: { status: true, artist }})
  }


  render() {
    if (this.state.results.status)
      return (
        <div>
          <h1>{this.state.results.artist.name}</h1>
          <ul>{this.state.results.artist.releases.map((release) =>
            <li>
              <Link to={`/r/${release.id}`}>{release.title} ({release.date})</Link>
              <p>{release.id}</p>
            </li>
          )}</ul>
        </div>
      )
    else
      return (
        <div>Loading...</div>
      )
  }
}
