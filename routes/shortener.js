//shortener

//setup mongo
var mongoose = require('mongoose');
//mongoose.connect(MONGOLAB_URI);

// var express = require('express');
// var route = express.Route();

urls = function (req, res) {
	console.log("req.body: " + req.body);
	console.log("req.body.long: " + req.body.long);
	console.log("req.body.shortname: " + req.body.short);
//get long_url
	var long_url = req.body.long;
	console.log("long_url: " + long_url);

//check if valid
	if (!isValid(long_url))
		return -1;

//clean & fix long_url
	long_url = fixUrl (long_url);

//get shortname
	var shortname = req.body.short;
	console.log("shortname: " + shortname);

//check shortname in db & filter
	shortname = filterShortname(shortname);

//return short_url
	res.send(req.query);
}

module.exports = urls;


/*****************
helper functions:
*****************/

function isValid(url) {
	//is undefined
	if (!url)
	{
		console.log(url + " is undefined");
		return false;
	}
	console.log(url + " is defined");
	//isValidStart
	// var startWith = url.slice(0, )

	//for now, assumes every url is valid
	return true;
}

function fixUrl (url) {
	//test
	console.log("url before fix: " + url);

	//url must be string
	if (typeof(url)!=typeof(""))
		url = String(url);

	//check for https and http
	//https: 0:5, http: 0:4
	// console.log("https=? " + url.slice(0, 4));	
	if (url.slice(0, 7)!="http://" && url.slice(0, 8)!="https://") {
		url = "http://" + url;
	}

	//test
	console.log("url after fix: " + url);

	return url;
}

//check !shortname.isBlank()
//if blank, randomize shortname
//if not blank, check if available
//if available, use it
//if not randomize shortname
function filterShortname (shortname) {
	if (shortname) { //not blank
		//isAvailable?
		if (isAvailable(shortname))
			shortname = shortname;
		else {
			//always have to check isAvailable in case
			//randomized shortname already in db
			do {
				//getRandomShort returns a string
				shortname = getRandomShort();
			} while (isAvailable(shortname))
		}
	} else { //isBlank
		do {
			shortname = getRandomShort();
		} while (isAvailable(shortname))
	}
	console.log("shortname: " + shortname);	

	return shortname;
}

//check if shortname is already available or not in db
function isAvailable(shortname) {

	//for now, return true
	console.log(shortname + " is available");
	return true;
}

//check if shortname is already available or not in db
function isAvailableUseDB(shortname) {

	//for now, return true
	console.log(shortname + " is available");
	return true;
}