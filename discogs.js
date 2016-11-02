var Discogs = require('disconnect').Client;

var db = new Discogs().database();
db.getRelease(350618, function(err, data){
    console.log(data);
});
