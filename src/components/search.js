import { ipcRenderer } from 'electron';
import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: {
      status: false,
      artists: []
    }};
  }

  componentDidMount() {
    ipcRenderer.on('search-artists-result', this.updateResults.bind(this));
  }

  search(e) {
    e.preventDefault();
    console.log(this.refs);
    ipcRenderer.send('search-artists-query', this.refs.query.value);
  }

  updateResults(e, artists) {
    console.log('update results', e, artists);
    this.setState({ results: { status: true, artists: artists }})
  }

  render() {
    let results;

    if (this.state.results.status)
      results = (
        <ul>{this.state.results.artists.map((artist) => 
          <li>{artist.name}</li>
        )}</ul>
      );

    return (
      <div>
        <form id="search-artists" onSubmit={this.search.bind(this)}>
          <input type="text" ref="query" placeholder="Type artist name..." />
          <input type="submit" value="search" />
        </form>
        {results}
      </div>
    );
  }
};
