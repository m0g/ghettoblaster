import {ipcMain} from 'electron';
import request from 'request';
import cheerio from 'cheerio';

export default class YoutubeApi {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;

    ipcMain.on('search-artists-query', this.search.bind(this));
  }

  search(e, search) {
    let url = `https://www.youtube.com/results?search_query=${encodeURIComponent(search)}`;

    request(url, (error, response, body) => {
      if (!error) {
        let $ = cheerio.load(body);
        var results = [];

        $('.yt-lockup-video a.yt-uix-tile-link').each((i, elem) => {
          console.log(elem);
          results.push({ href: elem.attribs.href, title: elem.attribs.title });
        });

        this.mainWindow.webContents.send('search-youtube-result', results);
      }
    });
  }
}

