/**
 * ScoreController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    bySkillId: function (req, res, next) {
        async.parallel([
                function (callback) {
                    User
                        .find()
                        .exec(function (err, users) {
                            if (err) {
                                res.render('error', {
                                    status: 500
                                });
                                return;
                            }
                            callback(null, users);
                        });
                },
                function (callback) {
                    Score
                        .find()
                        .where({skill: req.param('id')})
                        .exec(function (err, scores) {
                            if (err) {
                                res.render('error', {
                                    status: 500
                                });
                                return;
                            }
                            callback(null, scores);
                        });
                },
                function (callback) {
                    if (req.isAuthenticated()) {
                        Vote.find()
                            .where({voter: req.user.id})
                            .where({skill: req.param('id')})
                            .exec(function (err, votes) {
                                if (err) {
                                    res.render('error', {
                                        status: 500
                                    });
                                    return;
                                }
                                callback(null, votes);
                            });
                    } else {
                        callback(null, null)
                    }
                }],
            function (err, results) {
                var combined = [];
                results[0].forEach(function (user) {
                    var userId = user.id;
                    var userName = user.name;
                    var userFacebookId = user.facebookId;
                    var userUsername = user.username;
                    var userScore = 0;
                    var votes = 0;
                    var myVote = 0;
                    results[1].forEach(function (score) {
                        if (userId.toString() == score.user.toString()) {
                            userScore = score.score;
                            votes = score.votes;
                            if (req.isAuthenticated()) {
                                results[2].forEach(function (vote) {
                                    if (userId.toString() == vote.receiver.toString()) {
                                        myVote = vote.score;
                                    }
                                });
                            }
                        }
                    });
                    if (votes > 0) {
                        combined.push({
                            userId: userId,
                            userName: userName,
                            userFacebookId: userFacebookId,
                            userUsername: userUsername,
                            score: (Math.round(10 * userScore) / 10),
                            votes: votes,
                            myVote: myVote
                        })
                    }
                    ;
                });
                res.jsonp(combined);
            }
        )
    },
    byUserId: function (req, res, next) {
        async.parallel([
                function (callback) {
                    Skill
                        .find()
                        .exec(function (err, skills) {
                            if (err) {
                                res.render('error', {
                                    status: 500
                                });
                                return;
                            }
                            callback(null, skills);
                        });
                },
                function (callback) {
                    Score
                        .find()
                        .where({user: req.param('id')})
                        .exec(function (err, scores) {
                            if (err) {
                                res.render('error', {
                                    status: 500
                                });
                                return;
                            }
                            callback(null, scores);
                        });
                },
                function (callback) {
                    if (req.isAuthenticated()) {
                        Vote.find()
                            .where({voter: req.user.id})
                            .where({receiver: req.param('id')})
                            .exec(function (err, votes) {
                                if (err) {
                                    res.render('error', {
                                        status: 500
                                    });
                                    return;
                                }
                                callback(null, votes);
                            });
                    } else {
                        callback(null, null)
                    }
                }],
            function (err, results) {
                var combined = [];
                results[0].forEach(function (skill) {
                    var skillId = skill.id;
                    var skillName = skill.name;
                    var skillScore = 0;
                    var votes = 0;
                    var myVote = 0;
                    results[1].forEach(function (score) {
                        if (skillId.toString() == score.skill.toString()) {
                            skillScore = score.score;
                            votes = score.votes;
                            if (req.isAuthenticated()) {
                                results[2].forEach(function (vote) {
                                    if (skillId.toString() == vote.skill.toString()) {
                                        myVote = vote.score;
                                    }
                                });
                            }
                        }
                    });
                    combined.push({
                        skillId: skillId,
                        skillName: skillName,
                        score: (Math.round(10 * skillScore) / 10),
                        votes: votes,
                        myVote: myVote
                    });
                });
                res.jsonp(combined);
            }
        )
    }
}
;