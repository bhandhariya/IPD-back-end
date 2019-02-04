var mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:27017/IPD-17-jan";
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI,{useMongoClient:true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("mongodb connection open");
});
exports.db = db;
