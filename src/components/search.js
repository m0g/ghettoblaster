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
    console.log('this.props', this);
  }

  search(e) {
    e.preventDefault();
    console.log(this.refs);
    ipcRenderer.send('search-artists-query', this.refs.query.value);
    window.location.hash = '#/sr';
  }

  render() {
    let results;

    return (
      <form id="search" onSubmit={this.search.bind(this)}>
        <input type="text" ref="query" placeholder="Type artist name..." />
      </form>
    );
  }
};
