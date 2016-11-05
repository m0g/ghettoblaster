import { ipcRenderer } from 'electron';
import React from 'react';
import { Link } from 'react-router';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: {
      status: false,
      artists: []
    }};
  }

  componentDidMount() {
    ipcRenderer.on('search-artists-result', this.updateResults.bind(this));
    console.log('this.props', this.props);
  }

  updateResults(e, artists) {
    console.log('update results', e, artists);
    this.setState({ results: { status: true, artists: artists }})
  }

  render() {
    let results;

    if (this.state.results.status)
      return (
        <ul>{this.state.results.artists.map((artist) => 
          <li><Link to={`/a/${artist.id}`}>{artist.name}</Link></li>
        )}</ul>
      );
    else
      return (
        <div>Loading...</div>
      );
  }
}

