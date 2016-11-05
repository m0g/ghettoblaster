import { ipcRenderer } from 'electron';
import React from 'react';
import { Link, hashHistory } from 'react-router';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: {
      status: false,
      artists: []
    }};
  }

  componentDidMount() {
    //ipcRenderer.on('search-artists-result', this.updateResults.bind(this));
    console.log('this.props', this);
  }

  search(e) {
    e.preventDefault();
    console.log(this.refs);
    ipcRenderer.send('search-artists-query', this.refs.query.value);
    window.location.hash = '#/sr';
  }

  //updateResults(e, artists) {
  //  console.log('update results', e, artists);
  //  this.setState({ results: { status: true, artists: artists }})
  //}

  render() {
    let results;

    //if (this.state.results.status)
    //  results = (
    //    <ul>{this.state.results.artists.map((artist) => 
    //      <li><Link to={`/a/${artist.id}`}>{artist.name}</Link></li>
    //    )}</ul>
    //  );

    return (
      <form id="search" onSubmit={this.search.bind(this)}>
        <input type="text" ref="query" placeholder="Type artist name..." />
      </form>
    );
  }
};
