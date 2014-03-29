/**
 * AuthController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = {

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },

//    facebook: function (req, res, next) {
//        console.log('facebook');
//        passport.authenticate('facebook', {scope: ['email'] },
//            function (err, user) {
//                req.logIn(user, function (err) {
//                    if (err) {
//                        console.log(err);
//                        res.view('500');
//                        return;
//                    }
////                    console.log(req.session);
//                    res.redirect('/');
//                    return;
//                });
//            })(req, res, next);
//    },
    temp: function(req,res){
        if (req.session.tempBody) {
            sails.controllers.vote.saveVote(req,res);
            res.redirect(req.session.tempReferer);
            req.session.tempBody = "";
            req.session.tempReferer = "";
        } else {
            res.redirect('/' + req.user.username);
        }
    },

//    facebookCallback: function (req, res, next) {
//        console.log('callback');
//        passport.authenticate('facebook',
//            function (req, res) {
//////                console.log(res);
//                res.view('200');
//            })(req, res, next);
//    },

//    facebook: function (req, res) {
//        console.log('facebook');
//        passport.authenticate('facebook', { scope: ['email'] })
//    },
//    facebookCallback: function (req, res, next) {
//        console.log('callback');
//        passport.authenticate('facebook', {});
//        res.redirect('/');
//    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to AuthController)
     */
    _config: {}

};
