/**
 * FacebookController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var https = require('https');

module.exports = {
    getDetails: function (req, res) {
//        console.log(!req.session.fbAccessToken);
        var options = {
            host: 'graph.facebook.com',
            port: 443,
            path: '/' + req.param('username') + '?access_token=' + req.session.fbAccessToken,
            method: 'GET'
        };
        var buffer = '';
        var request = https.get(options, function (result) {
            result.setEncoding('utf8');
            result.on('data', function (chunk) {
                buffer += chunk;
            });
            result.on('end', function () {
                res(JSON.parse(buffer));
            });
        });
        request.on('error', function (e) {
            console.log('error from facebook.get(): '
                + e.message);
        });
        request.end();
    },
    getFriends: function (req, res) {
        var options = {
            host: 'graph.facebook.com',
            port: 443,
            path: '/fql?access_token=' + req.session.fbAccessToken + '&q=SELECT+uid,+name,+username+FROM+user+WHERE+uid+IN+(SELECT+uid2+FROM+friend+WHERE+uid1+=+me())+ORDER+BY+rand()+limit+5',
//        path: '/me/friends?access_token=' + req.session.fbAccessToken,
            method: 'GET'
        };
        var buffer = '';
        var request = https.get(options, function (result) {
            result.setEncoding('utf8');
            result.on('data', function (chunk) {
                buffer += chunk;
            });
            result.on('end', function () {
                res.json(JSON.parse(buffer));
            });
        });
        request.on('error', function (e) {
            console.log('error from facebook.get(): '
                + e.message);
        });
        request.end();
    }
};
