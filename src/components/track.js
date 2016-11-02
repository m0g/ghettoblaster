import React from 'react';

export default class Track extends React.Component {
  play() {
  }

  render() {
    return (
      <li>
        <span>{this.props.track.title}</span>
        <button onClick={this.play.bind(this)}>play</button>
      </li>
    );
  }
}
