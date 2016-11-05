import {ipcMain} from 'electron';
import mb from 'musicbrainz';
import request from 'request';
import os from 'os';

const mbUrl = 'http://musicbrainz.org/ws/2';
const userAgent = `node-musicbrainz/0.2.4 (node/${process.version}; ${os.type()}/${os.release()})`;

export default class MusicBrainzApi {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;

    //this.searchArtists = this.searchArtists.bind(this);

    ipcMain.on('search-artists-query', this.searchArtists.bind(this));
    ipcMain.on('get-artist-query', this.getArtist.bind(this))
    ipcMain.on('get-release-query', this.getRelease.bind(this))
  }

  searchArtists(e, query) {
    mb.searchArtists(query, {}, (err, artists) => {
      artists = artists.map((artist) => {
        return { id: artist.id, name: artist.name };
      });
      //console.log('artists', artists);

      this.mainWindow.webContents.send('search-artists-result', artists);
    });
  }

  getArtist(e, artistId) {
    //console.log('artist id', artistId);

    mb.lookupArtist(artistId, ['releases'], (err, data) => {
      let artist = {
        id: data.id,
        name: data.name,
        releases: data.releases.map((release) => {
          return {
            id: release.id,
            title: release.title,
            date: release.date
          };
        })
      };

      this.mainWindow.webContents.send('get-artist-result', artist);

      //console.log(data);
    });
  }

  getRelease(e, releaseId) {
    let options = {
      url: `${mbUrl}/release/${releaseId}?inc=recordings&fmt=json`,
      headers: {
        'User-Agent': userAgent
      }
    };

    request(options, (err, res, body) => {
      let data = JSON.parse(body);
      console.log(data);

      let release = {
        id: data.id,
        title: data.title,
        date: data.date,
        tracks: data.media[0].tracks.map((track) => {
          return {
            id: track.id,
            number: track.number,
            title: track.title,
            length: track.length
          };
        })
      };

      this.mainWindow.webContents.send('get-release-result', release);
    });
  }
}
