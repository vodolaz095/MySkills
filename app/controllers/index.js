var facebook = require('./facebook');

exports.render = function (req, res) {
//    facebook.getRandomFriends(req, function(data){
//        console.log(data);
//    });
    //console.log(req.session.fbAccessToken);
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};
