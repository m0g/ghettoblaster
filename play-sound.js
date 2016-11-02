//const youtubedl = require('youtube-dl');
var fs = require('fs');
var ytdl = require('ytdl-core');
var ogg = require('ogg');
var vorbis = require('vorbis');
var Speaker = require('speaker');

// Create the Speaker instance
var speaker = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});
const uri = '2DMEUhqB_t4';

//const video = youtubedl(uri, ['--format=251']);

//video.on('info', function(info) {
//  console.log('Download started');
//});

//video.pipe(function(stream) {
//});

var od = new ogg.Decoder();
od.on('stream', function (stream) {
  var vd = new vorbis.Decoder();

  // the "format" event contains the raw PCM format
  vd.on('format', function (format) {
    // send the raw PCM data to stdout
    vd.pipe(speaker);
  });

  // an "error" event will get emitted if the stream is not a Vorbis stream
  // (i.e. it could be a Theora video stream instead)
  vd.on('error', function (err) {
    // maybe try another decoder...
  });

  stream.pipe(vd);
});

fs.createReadStream(`${__dirname}/audio.ogg`).pipe(od);

//ytdl(`http://www.youtube.com/watch?v=${uri}`, { filter: function(format) {
//  console.log(format.audioEncoding, format.audioBitrate, format.container, format.resolution);
//  return (format.audioEncoding == 'vorbis' && format.resolution == null);
//}})
//  //.pipe(ogg);
//  .pipe(fs.createWriteStream('audio.webm'));
