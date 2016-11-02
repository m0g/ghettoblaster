import React from 'react';

export default class Track extends React.Component {
  play() {
    this.props.setPlay(this.props.track);
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
