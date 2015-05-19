//schemas

var mongoose = require('mongoose');

exports.urls = mongoose.Schema ({
    creator: String,
    short_name: String,
    long_url: String,
    clicked: Number,
    points: Number,
    update_at : Date
});
