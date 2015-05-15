//shortener

var express = require('express');
var route = express.Route();

urls = function (req, res) {
//get long_url
	// var long_url = req
	console.log(req.query);
//clean & fix long_url
//check if valid

//get shortname
//check !shortname.isBlank()
//if blank, randomize shortname

//if not blank, check if available
//if available, use it
//if not randomize shortname

//return short_url
}