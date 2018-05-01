/*jshint esversion: 6 */
const got = require('got');

// Enter your own YT API Key here
const youtubeApiKey = "Your youtube API key here";

// Array of Youtube UIDs
const array = ["Youtube video UIDs here"];

// API URL + statistics endpoint
const url = 'https://www.googleapis.com/youtube/v3/videos?key='+youtubeApiKey+'&part=statistics&id=';

function doStuff() {
const getData = () => {

	// Youtube API returns an array of results if an array of UIDs is passed 
	got(url + array)
		.then(response => {
			if(response.statusCode === 200){
				processData(JSON.parse(response.body));
			}
		})
		// If error
		.catch(error => {
			console.log(error);
		});
};

const processData = (d) => {

	// check if all array elements have been returned
	if(d.pageInfo.totalResults === array.length){

		// we map our results to get the viewcount only
		var counter = d.items.map(function(value, index ){
			return parseInt(value.statistics.viewCount,10);
		// we then add up all the results
		}).reduce(function(total, number){
			return total + number;
		});
	require('console-stamp')(console, 'ddd mmm dd yyyy HH:MM:ss');
		console.log(",", counter);
	} else {

		console.log('mismatch ', d.pageInfo.totalResults, array.length);

	}
};


// Run our function
getData();
};

function run() {
  setInterval(doStuff, 300000);
};

run();
