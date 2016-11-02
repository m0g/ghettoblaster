import request from 'request';
import cheerio from 'cheerio';

export default (search) => {
  let url = `https://www.youtube.com/results?search_query=${encodeURIComponent(search)}`;
  console.log(url);

  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (!error) {
        let $ = cheerio.load(body);
        let firstVideo = $('a.yt-uix-sessionlink.yt-uix-tile-link')[0];
        resolve(firstVideo.attribs.href);
      }
      else
        reject(error);
    });
  });
}
