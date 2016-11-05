import { ipcRenderer } from 'electron';
import React from 'react';

export default class Track extends React.Component {
  play() {
    if (this.props.track.hasOwnProperty('href'))
      ipcRenderer.send('play-track', {
        href: this.props.track.href,
        track: this.props.track.title
      });

    else
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
