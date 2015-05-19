//getRandomString(length)

var charList = [ 
"a", "b", "c", "d", "e",
"f", "g", "h", "i", "j", 
"k", "l", "m", "n","o", 
"p", "q", "r", "s", "t", 
"u", "v", "w", "x", "y",
"z", "1", "2", "3", "4", 
"5", "6", "7", "8", "9"
];

exports.getRandomString = function (length) {
	var size = charList.length;
	var randomString = "";

	for (var i=0; i<length; i++) {
		var randomInt = Math.random();
		var randomIndex = Math.floor(randomInt*size);
		var randomChar = charList[randomIndex];
		
		randomString += randomChar;
	}

	// console.log("in getRandomString: got: " + randomString);
	return randomString;
}