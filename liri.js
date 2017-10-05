//Grab data from keys.js
var keys = require('./keys.js');
var request = require('request');
var client = keys.twitterKeys;
var fs = require('fs');
//Stored argument's array
var nodeArgv = process.argv;
var command = process.argv[2];
var spotifyClient = keys.spotifyKeys;

//console.log(client);
///movie or song

var x = "";
//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}

//switch case
switch(command){
 case "my-tweets":
   showTweets();
  break;

  case "spotify-this-song":
    if(x){
      spotifySong(x);
    } else{
      spotifySong("Stairway to Heaven");
    }
  break;

  case "movie-this":
    if(x){
      omdbData(x)
    } else{
      omdbData("Mr. Nobody")
    }
  break;

  case "do-what-it-says":
    doThing();
  break;

  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;
}

function showTweets(){
  //Display last 20 Tweets
  var screenName = {screen_name: 'boo_sparx'};
  client.get('statuses/user_timeline', screenName, (error, tweets, response)=>{
    if(!error){
      for(var i = 0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        console.log("@boo_sparx: " + tweets[i].text + " Created At: " + date.substring(0, 19));
        console.log("-----------------------");
        
        //adds text to log.txt file
        fs.appendFile('log.txt', "@boo_sparx: " + tweets[i].text + " Created At: " + date.substring(0, 19), (err)=>{

          if(err) throw err;
      });
        fs.appendFile('log.txt', "-----------------------", (err)=>{

          if(err) throw err;
      });
      }
    }else{
      console.log('Error occurred');
    }
  });
}

function spotifySong(song){
  spotifyClient.search({ type: 'track', query: song}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");
        
        //adds text to log.txt
        fs.appendFile('log.txt', songData.artists[0].name, (err)=>{

          if(err) throw err;
      });
        fs.appendFile('log.txt', songData.name, (err)=>{

          if(err) throw err;
      });
        fs.appendFile('log.txt', songData.preview_url, (err)=>{

          if(err) throw err;
      });
        fs.appendFile('log.txt', songData.album.name, (err)=>{

          if(err) throw err;
      });
        fs.appendFile('log.txt', "-----------------------", (err)=>{

          if(err) throw err;
      });
      }
    } else{
      console.log('Error occurred.');
    }
  });
}

function omdbData(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true&apikey=40e9cece';

  request(omdbURL,function(error, response, body){
    
    if(!error && response.statusCode === 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

      //adds text to log.txt
      fs.appendFile('log.txt', "Title: " + body.Title, (err)=>{

          if(err) throw err;
      });
      fs.appendFile('log.txt', "Release Year: " + body.Year, (err)=>{

          if(err) throw err;
      });
      fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating, (err)=>{

          if(err) throw err;
      });
      fs.appendFile('log.txt', "Country: " + body.Country, (err)=>{

          if(err) throw err;
      });
      fs.appendFile('log.txt', "Language: " + body.Language, (err)=>{

          if(err) throw err;
      });
      fs.appendFile('log.txt', "Plot: " + body.Plot, (err)=>{

          if(err) throw err;
      });
      fs.appendFile('log.txt', "Actors: " + body.Actors, (err)=>{

          if(err) throw err;
      });
      fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating, (err)=>{

          if(err) throw err;
      });
      fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL, (err)=>{

          if(err) throw err;
      });

    } 
    
  });

}

function doThing(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifySong(txt[1]);
  });
}