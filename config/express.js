var express = require('express');
var mongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');
var helpers = require('view-helpers');

var config = require('./config');


module.exports = function (app, passport, db) {
    app.set('showStackError', true);

    app.locals.pretty = true;

    app.use(express.compress({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    if (process.env.NODE_ENV === 'development') {
        app.use(express.logger('dev'));
    }

    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    app.enable("jsonp callback");

    app.configure(function () {
        // The cookieParser should be above session
        app.use(express.cookieParser());

        // Request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());

        // Express/Mongo session storage
        app.use(express.session({
            secret: config.sessionSecret,
            store: new mongoStore({
                db: db.connection.db,
                collection: config.sessionCollection
            })
        }));

        app.use(flash());

        app.use(helpers(config.app.name));

        // Use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        // Setting the fav icon and static folder
        app.use(express.favicon());
        app.use(express.static(config.root + '/public'));

        // Routes should be at the last
        app.use(app.router);

        // Assume "not found" in the error msgs is a 404. this is somewhat
        // silly, but valid, you can do whatever you like, set properties,
        // use instanceof etc.
        app.use(function (err, req, res, next) {
            // Treat as 404
            if (~err.message.indexOf('not found')) return next();

            // Log it
            console.error(err.stack);

            // Error page
            res.status(500).render('500', {
                error: err.stack
            });
        });

        // Assume 404 since no middleware responded
        app.use(function (req, res, next) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });
    });
};