var fs = require('fs');
var ytdl = require('ytdl-core');
var ogg = require('ogg');
var vorbis = require('vorbis');
var Speaker = require('speaker');
var ffmpeg = require('fluent-ffmpeg');

// Create the Speaker instance
var speaker = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});

export default (videoUri) => {
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

  ytdl.getInfo(`http://www.youtube.com${videoUri}`, function(err, info) {
    info.formats.forEach(function(format) {
      if (format.audioEncoding == 'vorbis' && format.resolution == null)
        ffmpeg(format.url).toFormat('ogg').writeToStream(od);
    });
  });
}
