//redirect

//setup mongo
var mongoose = require('mongoose');
var schemas = require('../mongo-schemas/schemas');
var Urls = mongoose.model('Urls', schemas.urls);

module.exports = function (req, res) {
  for (i in req) {
    //console.log("req: " + JSON.stringify(i));
  }
  console.log("req.url: " + req.url);
  console.log("typeof(req.url): " + typeof(req.url));

  if (req.url == '/' || req.url == '') {
    console.log("req.url: " + req.url);
    console.log('url equal to /, gotta stay');
    console.log("__dirname: "  + __dirname);
    res.render('index', {});
  } else {
    console.log("req.url: " + req.url);
    console.log("url not equal to /");
    console.log("__dirname: "  + __dirname);

    //find url
    Urls.find({}, function (err, urlList) {

    	var redirectUrl = '';

    	for (var i in urlList) {
    		var url = urlList[i];
    		console.log("i: " + i);
    		console.log("url.short_name: /" + url.short_name);
    		console.log("shortname req: " + req.url);

    		var shortname = '/' + url.short_name;
    		if (shortname == req.url) {
    			console.log("found " + req.url + " in db");
    			redirectUrl = url.long_url;
    			break;
    		}
    	}
    	// not found
    	//do nothing
    	if (!redirectUrl.length) {
    		console.log('not found');
    		res.render('index', {});
    	} else {
    		console.log('redirecting .. ');
    		res.redirect(redirectUrl);
    	}
    });

    //res.redirect('https://www.google.ca/');
  }  
}