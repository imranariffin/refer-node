//shortener

//setup mongo
var mongoose = require('mongoose');
var schemas = require('../mongo-schemas/schemas');
var Urls = mongoose.model('Urls', schemas.urls);
var random = require('../scripts/random');

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

//find shortname in db and update db
	Urls.find({}, function (err, urlList) {
		if (!err) {
			console.log("Success: Able to access db ...");

			var resultShort = shortname;

			//find shortname
			for (var i in urlList) {
				var url = urlList[i];

				// console.log("i: " + i);
				// console.log("url: " + url);

				//if shortname already in db
				if (url.short_name == shortname) {
					console.log("shortname already in db");

					//create random shortname
					// shortname = getRandomShort();
					console.log("random shortname: " + shortname);

					resultShort = getRandomShort();

					break;

					//update db using random shortname
					// updateDbUrl(long_url, shortname, "user");
					// res.send(shortname);
					// return false;
				}
			}
			//good: shortname is not in use

			//update db
			updateDbUrl(long_url, resultShort, "user");

			console.log("Success: created short url");
			//send

			console.log(
				"without JSON stringify:" +
				{
					shortname : resultShort
				});

			console.log(
				"JSON.stringify: \n" +
				JSON.stringify ({
				shortname : resultShort
			})
				);

			res.send(JSON.stringify ({
				shortname : resultShort
			})
			);
			return true;
			
		} else {
			console.log("Error: " + err);
			res.send(err);
			return -1;
		}
	});
}

// shortNamer() :
//searches for shortname in urlList, 
//if found, creates new, random shortname
//else, use shortname to update db

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

//check if shortname is already available or not in db
function isAvailable(shortname) {

	//for now, return true
	console.log(shortname + " is available");
	return true;
}


//generate random string
function getRandomShort() {
	var stringLen = 7;
	return random.getRandomString(5);
}

//creates an instance of Urls model to update to db
function updateDbUrl (long_url, shortname, creator) {
	new Urls ({
	    creator: creator,
	    short_name: shortname,
	    long_url: long_url,
	    clicked: 0,
	    points: 0,
	    update_at : Date.now()		
	}).save();

	return 1;
}