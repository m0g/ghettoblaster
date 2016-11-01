//const youtubedl = require('youtube-dl');
var fs = require('fs');
var ytdl = require('ytdl-core');

const uri = 'o8yiYCHMAlM';

//const video = youtubedl(uri, ['--format=251']);

//video.on('info', function(info) {
//  console.log('Download started');
//});

//video.pipe(function(stream) {
//});
ytdl(`http://www.youtube.com/watch?v=${uri}`, { filter: 'audioonly', filter: function(format) {
  console.log(format.audioEncoding, format.audioBitrate);
  return (format.audioEncoding == 'vorbis');
}})
  .pipe(fs.createWriteStream('video.flv'));
