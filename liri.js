var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require("fs"); 
var keys = require('./keys.js'); 
//twitter keys from keys.js
var client = new Twitter(keys.twitterKeys);

var command = process.argv[2];
var title = process.argv[3];
// takes the task and name of the movie or song from the command line

switch (command) {

    case "my-tweets":
        myTweet();
        break;

    case "spotify-this-song":
        mySpotify();
        break;

    case "movie-this":
        myMovie();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

}

function myTweet() {

    console.log("my tweets");
    var params = {
        q: '',
        count: 20,
    };

    client.get('statuses/user_timeline', params, gotData);

    function gotData(error, data, response) {
        if (!error)
            for (var i = 0; i < data.length; i++) {
            
            console.log(data[i].text);
        }
    };


}

function mySpotify() {
    spotify.search({
        type: 'track',
        query: title
    }, function(err, data) {
        // console.log(JSON.stringify(data.tracks.items[0],null,2));
        //This if statement is when user put undefined track title.
        if (data.tracks.items[0] === undefined) {
            
            console.log(" Song Title: The Sign\n Artist Name: Ace of Base\n Album Name: The Sign(US Album)\n Preview Link: https://p.scdn.co/mp3-preview/177e65fc2b8babeaf9266c0ad2a1cb1e18730ae4?cid=null");
            

        } else {
            var item = data.tracks.items[0];
            var artistName = item.artists[0].name;
            var albumName = item.album.name;
            var songTitle = item.name;
            var previewLink = item.preview_url;
            //It prints the Info of the Spefific track. Put in Quotes when user types on terminal.
            
            console.log("Song Title: " + songTitle + "\nArtist Name: " + artistName + "\nAlbum Name: " + albumName + "\nPreview Link: " + previewLink);
        }

        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

    });

}

function myMovie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";

    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            if (title === undefined) {
               
                console.log("Title: Mr. Nobody \nRelease Year: 2009\nIMDB Rating: 7.9  \nCountry: Belgium, Germany, Canada, France \nLanguage: English, Mohawk \nPlot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible. \nActors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham ");
                

            } else {
                
                console.log("Title: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
                
                

            }

        }
    });

}


function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(err, data) {
        data = data.split(",");
        case1 = data[0];
        title = data[1];

        if (case1 === "spotify-this-song") {
            mySpotify();
        } else if (case1 === "movie-this") {
            myMovie();
        }

    })

}


