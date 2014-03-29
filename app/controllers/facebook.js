var https = require('https');

getFriends = function (req, res) {
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
            res(JSON.parse(buffer));
        });
    });
    request.on('error', function (e) {
        console.log('error from facebook.get(): '
            + e.message);
    });
    request.end();
};

exports.getDetails = function (username, req, res) {
    var options = {
        host: 'graph.facebook.com',
        port: 443,
        path: '/' + username + '?access_token=' + req.session.fbAccessToken,
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
};

exports.getRandomFriends = function (req, res) {
    getFriends(req, function (data) {
//        data.forEach(function(item){
//
//        })
        res.jsonp(data);
    });
};

//exports.getDetails = function (username, req, res) {
//    getDetails(username, req, function (data) {
//        res.jsonp(data);
//    });
//};
