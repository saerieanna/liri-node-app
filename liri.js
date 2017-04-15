//retrieves info from keys.js where twitter keys are stored
var keys = require("./keys.js");


//variables for NPMs//
var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require('request');
var fs = require('fs');

//variable input represents the input typed in the command line by the user, for the 
//following options: "my-tweets", "spotify-this-song '<song name here>'", "movie-this", and "do-what-it-says"
var input = process.argv[2];
var secondInput = process.argv[3];

function liriCommands(cmd, param) {
	switch (cmd) {
		case "my-tweets":
			myTweets();
			break;
		case "spotify-this-song":
			spotifyThis(param);
			break;
		case "movie-this":
			movie_this(param);
			break;
		case "do-what-it-says":
			doWhatItSays();
			break;
		default: 
			console.log(input + " : command not found");
	}
}


//twitter portion//
function myTweets(){

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});


if (input === "my-tweets") {
	var params = {screen_name: 'SaerieAnna', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
 	if (!error) {
    console.log(tweets, null, 2);
  	}
  });
}
}

// //spotify portion//
function spotifyThis(song) {
// var nodeArgsMultiple = process.argv;
// var songName = "";

// // for (var i = 2; i < nodeArgsMultiple.length; i++) {
// // 	if (i > 2 && i < nodeArgsMultiple.length) {
// // 	songName = songName + "+" + nodeArgsMultiple[i];
// // } else {
// // 	songName += nodeArgsMultiple[i];
// // }
// // }


 if (input === "spotify-this-song" && secondInput === "") {
	spotify.search({ type: 'tracks', query: secondInput }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
        //try song in query
    }
 	// if (!error) {
 	else {
 	var songInfo = data.tracks.items[0];

	console.log("artists: " + songInfo.artists[0].name);
	console.log("song name: " + songInfo.name);
	console.log("preview link: " + songInfo.preview.url);
    console.log("Album name: " + songInfo.album.name);
	}
 		}
 })	

	
	
};


	//movie references//
	function movie_this(movie) {
		if (input === "movie-this") {
		var query_url = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=long&tomatoes=true&r=json';
		request(query_url, function(error, res, body) {
			if (!error && res.statusCode === 200) {
				var movie_data = {
				"Title"                 : JSON.parse(body).Title,
                "Released"              : JSON.parse(body).Released,
                "Country"               : JSON.parse(body).Country,
                "Language(s)"           : JSON.parse(body).Language,
                "Actors"                : JSON.parse(body).Actors,
                "imdbRating"           : JSON.parse(body).imdbRating,
                "Rotten Tomatoes Rating": JSON.parse(body).tomatoRating,
                "Rotten Tomatoes URL"   : JSON.parse(body).tomatoURL,
                "Plot"                  : JSON.parse(body).Plot
				}
					
				 console.log("Successfully retrieved OMDB results for " + movie_data.Title + ".");
				 console.log("Title: " + movie_data.Title);
				 console.log("Released: " + movie_data.Released);
				 console.log("imdbRating: " + movie_data.imdbRating);
				 console.log("Country: " + movie_data.Country);
				 console.log("Language(s): " + movie_data.Language);
				 console.log("Plot: " + movie_data.Plot);
				 console.log("Actors: " + movie_data.Actors);
				 console.log("Rotten Tomatoes URL: " + movie_data.tomatoURL);
//why are some returning undefined??//
			}
			else {
				console.error(error);
				// console.log(movie_this("Mr.Nobody"));
			}
			})
		}


	function doWhatItSays() {
		if (input === "do-what-it-says") {
		fs.readFile("random.txt", "utf8", function(err, random_txt) {
				var r_txt = random_txt.split(',');
				var fun = r_txt[0];
				var param = r_txt[1];
		console.log("PARAM: ", param);

		switch (fun) {
			case "my-tweets":
				myTweets();
				break;
			case "spotify-this-song":
				spotifyThis(param);
				break;
			case "movie-this":
				movie_this(param);
				break;
		}
		});
		}
	}
	}



     


     liriCommands(input, secondInput);