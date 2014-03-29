var express = require('express');
//var http = require('http');
//var path = require('path');
var fs = require('fs');
var passport = require('passport');
logger = require('mean-logger');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var config = require('./config/config');
var auth = require('./config/middlewares/authorization');
var mongoose = require('mongoose');

var db = mongoose.connect(config.db);

var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);


require('./config/passport')(passport);

var app = express();

require('./config/express')(app, passport, db);

require('./config/routes')(app, passport, auth);


// Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

// Initializing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;