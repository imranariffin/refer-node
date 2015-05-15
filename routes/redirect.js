//redirect to http://

var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');

/* GET a redirect function */

// router.get('/', function (req, res) {
// 	//res.redirect('https://www.google.ca/');
// 	res.send("redirecting");//.redirect('/');
// 	// res.redirect('../');
// 	//console.log(req.data.long_url);
// });

module.exports = function (req, res) {
	console.log(res);
	res.send(req.body.long_url);	
}