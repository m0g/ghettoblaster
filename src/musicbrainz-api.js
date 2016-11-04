import {ipcMain} from 'electron';
import mb from 'musicbrainz';

export default class MusicBrainzApi {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    this.searchArtists = this.searchArtists.bind(this);

    ipcMain.on('search-artists-query', this.searchArtists);
  }

  searchArtists(e, query) {
    //console.log('query', query);
    mb.searchArtists(query, {}, (err, artists) => {
      artists = artists.map((artist) => {
        return { id: artist.id, name: artist.name };
      });
      console.log('artists', artists);

      this.mainWindow.webContents.send('search-artists-result', artists);
    });
  }
}
