require("dotenv").config();

var nodeArgs = process.argv;

var tweetsCmd = 'my-tweets';
var spotifyCmd = 'spotify-this-song';
var movieCmd = 'movie-this';
var doThisCmd = 'do-what-it-says';

tweetsCmd = nodeArgs[2];
spotifyCmd = nodeArgs[2];
movieCmd = nodeArgs[2];
doThisCmd = nodeArgs[2];

var movieName = '';
var songName = '';

for (var i = 3; i < nodeArgs.length; i++) {

    if (nodeArgs[2] === movieCmd) {
        if (i > 3 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];
            movieFunc();
        }

        else {

            movieName += nodeArgs[i];
            movieFunc();
        }

    }//end movieCmd if statement

    else if (nodeArgs[2] === spotifyCmd) {
        if (i > 3 && i < nodeArgs.length) {

            songName = songName + "+" + nodeArgs[i];

        }

        else {

            songName += nodeArgs[i];

        }

    }//end songName if statement

    else if (nodeArgs[2] === tweetsCmd) {
        twitterFunc();

    };//end tweetsCmd if statement


};//end entire for loop
function movieFunc() {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    var request = require("request");

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDb Rating " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("");
        }

    });
};

function twitterFunc() {
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    /**
     * Stream statuses filtered by keyword
     * number of tweets per second depends on topic popularity
     **/
    client.get('search/tweets', { q: 'Trump' }, function (error, tweets, response) {
        console.log('This tweet was created at: ', tweets.statuses[0].created_at);
        console.log('');
        console.log('Tweet: ', tweets.statuses[0].text);
        console.log('');
    });
};

 //here is spotify search parameters https://beta.developer.spotify.com/documentation/web-api/reference/search/search/