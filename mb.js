var mb = require('musicbrainz');

mb.searchArtists('The White Stripes', {}, function(err, artists){
    console.log(artists[0].name);
});
