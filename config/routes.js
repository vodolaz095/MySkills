/**
 * Routes
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports.routes = {

    // Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
    // default view engine) your home page.
    //
    // (Alternatively, remove this and add an `index.html` file in your `assets` directory)

//    '/scores': {
//        view: 'angular'
//    },
//    '/scores/:stam': {
//        view: 'angular'
//    },
    '/api/scores/skill/:id': {
        controller: 'score',
        action: 'bySkillId'
    },
    '/api/scores/user/:id': {
        controller: 'score',
        action: 'byUserId'
    },
    '/api/users/:username': {
        controller: 'user',
        action: 'byUsername'
    },
    '/api/friends': {
        controller: 'facebook',
        action: 'getFriends'
    },
    '/api/vote': {
        controller: 'vote',
        action: 'saveVote'
    },
    '/api/skills/name/:name': {
        controller: 'skill',
        action: 'byName'
    },
    '/api/skills/randomBesidesMe/:skill': {
        controller: 'skill',
        action: 'randomBesidesMe'
    },
    '/auth/facebook': passport.authenticate('facebook', { scope: ['email'] }),
    '/auth/facebook/callback': passport.authenticate('facebook', {successRedirect: '/auth/temp'}),
    '/auth/temp': {
        controller: 'auth',
        action: 'temp'
    },
    '/auth/logout': {
        controller: 'auth',
        action: 'logout'
    },
//    '/auth/facebook': {
//        controller: 'auth',
//        action: 'facebook'
//    },
//    '/auth/facebook/callback': {
//        controller: 'auth',
//        action: 'facebookCallback'
//    },

    // Custom routes here...

    // If a request to a URL doesn't match any of the custom routes above, it is matched
    // against Sails route blueprints.  See `config/blueprints.js` for configuration options
    // and examples.

};
