//Java Script Keys
var twitter = require('twitter');
var spotify = require('node-spotify-api'); 

console.log('this is loaded')

var twitterKeys = new twitter ({
 consumer_key: "Gp0P8ifvjg7Ric9rPyaMvpaNy",
 consumer_secret: "kcLZJ5I1khl6untNih5Mc1Hgn7SiV2XML6OaLa7HMKAuVDnu2n",
 access_token_key: "915747350408286209-xD7z5TfEQmFCT8fT2W4SrjbQZnRW96w",
 access_token_secret: "lxcpYrRd6o279372ZpllikMhDeAortETWUS2u0SBDA8vW",
	
});

var spotifyKeys = new spotify({
 id: "cd94f047138640f1bc92dff1ecc75cd9",
 secret: "679b891f85fb4efab4a3f3c2f04af436",
    
});

 module.exports = {
        twitterKeys: twitterKeys,
        spotifyKeys: spotifyKeys,
 }