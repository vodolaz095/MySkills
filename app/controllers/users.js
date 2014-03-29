var mongoose = require('mongoose');
var User = mongoose.model('User');
var votes = require('../../app/controllers/votes');

exports.authCallback = function (req, res) {
    console.log('CALLBACK');
    if (req.session.tempBody) {
        votes.submit(req,res);
        res.redirect(req.session.tempReferer);
        req.session.tempBody = "";
        req.session.tempReferer = "";
    } else {
        res.redirect('/' + req.user.username);
    }
};

/**
 * Show login form
 */
//exports.signin = function (req, res) {
//    res.render('users/signin', {
//        title: 'Signin',
//        message: req.flash('error')
//    });
//};

/**
 * Find user by id
 */
exports.user = function (req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function (err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

exports.userByUsername = function (req, res, next, username) {
    User
        .findOne({
            username: username
        })
        .exec(function (err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + username));
            req.profile = user;
            next();
        });
};


exports.all = function (req, res) {
    User.find().exec(function (err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(users);
        }
    });
};


exports.sample = function (req, res) {
    var user = new User(req.body);
    user.name = 'Effy Teva';
    user.username = 'effyteva';

    user.save(function (err) {
        res.jsonp(user);
    });
};
var facebook = require('./facebook');

exports.byUsername = function (req, res) {
    User
        .findOne({ username: req.params.username})
        .exec(function (err, user) {
            if (err) {
                res.render('error', {
                    status: 500
                });
                return;
            }
            if (!user) {
                facebook.getDetails(req.params.username, req, function (profile) {
                    newUser = new User({
                        name: profile.name,
                        username: profile.username || profile.id,
                        facebookId: profile.id
                    });
                    newUser.save(function (err) {
                        if (err) console.log(err);
                        return res.jsonp(newUser);
                    });
                })
            } else {
                res.jsonp(user);
            }
        })
};

//exports.findOrCreate = function (req, res) {
//    db.User.findOrCreate({facebookId: req.id}, { name: req.displayName, email: req.emails[0].value, username: req.username}).success(function (user, created) {
//        res(user);
//    })
//};

exports.list = function (req, res) {
    if (req.user) {
        var name = req.user.name;
    }
    db.User.findAll().success(function (users) {
        //console.log(skills);
        res.render('users/list', { users: users, user: name });
    })
};

//exports.details = function (req, res) {
//    if (req.user) {
//        var name = req.user.name;
//    }

/*    db.User.find({
 include: [
 {model: db.Vote, as: 'votesReceived',
 include: [
 db.Skill,
 { model: db.User, as: 'voter' }
 ]
 }
 ],
 where: {userName: req.params.username}*/

////    db.Vote.findAll({
////        include: [
////            db.Skill,
////            { model: db.User, as: 'voter' },
////            { model: db.User, as: 'receiver' }
//        ]
//    }).success(function (data) {
//        var user = {name: 'Ronen'};
//        res.json(data);
////            res.render('users/profile', { skills: data, profile: user, user: name });
//    })
//}

