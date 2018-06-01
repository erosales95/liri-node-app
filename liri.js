require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var request = require("request")

if (process.argv[2] === "movie-this") {
    if (!process.argv[3]) {
        var movie = "Mr+Nobody";
    }
    else {
        var movie = process.argv[3];
    }
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        var movieBody = JSON.parse(body);
        var movieTitle = movieBody.Title;
        var imdbRating = movieBody.imdbRating;
        var rottenTomatoesRating = movieBody.Ratings[1].Value;
        var movieLanguage = movieBody.Language;
        var movieCountry = movieBody.Country;
        var movieActors = movieBody.Actors;
        var movieYear = movieBody.Year;
        var moviePlot = movieBody.Plot;

        if (!error && response.statusCode === 200) {
            console.log(
                "\n\n",
                "Your Movie Title: " + movieTitle + "\n",
                "IMDB Rating: " + imdbRating + "\n",
                "Rotten Tomatoes Rating: " + rottenTomatoesRating + "\n",
                "Movie Language: " + movieLanguage + "\n",
                "Country of Origin: " + movieCountry + "\n",
                "Actors: " + movieActors + "\n",
                "Release Year: " + movieYear + "\n",
                "Movie Plot: " + moviePlot + "\n",
                "\n\n"
            );

        }

    });

}


fs.readFile("random.txt", "utf8", function (error, response) {

    if (error) {
        return console.log(error);
    }
    var song = response;

    if (process.argv[2] === "spotify-this-song" || process.argv[2] === "do-what-it-says") {

        if (!process.argv[3]) {
            var song = "The Sign"
            var songLimit = 12;
        }
        else if (process.argv[2] === "do-what-it-says") {
            var songLimit = 5;
        }
        else {
            var song = process.argv[3]
            var songLimit = 5;
        }

        spotify.search({ type: "track", query: song, limit: songLimit }, function (err, data) {

            if (err) {
                return console.log("Error: " + err);
            }

            if (song === "The Sign") {
                var songLink = data.tracks.items[11].preview_url;
                var albumName = data.tracks.items[11].album.name;
                var artistName = data.tracks.items[11].album.artists[0].name;
                var songName = data.tracks.items[11].name;
                console.log(
                    "\n\n",
                    "Song Name: " + songName + "\n",
                    "Album Name: " + albumName + "\n",
                    "Artist Name: " + artistName + "\n",
                    "Song Link: " + songLink + "\n",
                    "\n\n"
                )

            }
            else {
                console.log(data.tracks.items.length);
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songLink = data.tracks.items[i].preview_url;
                    var albumName = data.tracks.items[i].album.name;
                    var artistName = data.tracks.items[i].album.artists[0].name;
                    var songName = data.tracks.items[i].name;

                    console.log(
                        "\n\n",
                        "Song Name: " + songName + "\n",
                        "Album Name: " + albumName + "\n",
                        "Artist Name: " + artistName + "\n",
                        "Song Link: " + songLink + "\n",
                        "\n\n"
                    )
                }

            }

        });
    }
})

if (process.argv[2] === "my-tweets") {
    client.get("statuses/user_timeline", function (error, response) {
        if (!error) {
            for (var i = 0; i < response.length; i++) {
                var tweetText = response[i].text
                var tweetTime = response[i].created_at
                console.log(
                    "\n-------------------------------------------------\n",
                    tweetText,
                    "\nTweeted At: " + tweetTime,
                    "\n-------------------------------------------------\n",
                )
            }
        }
    })
}