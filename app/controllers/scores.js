var mongoose = require('mongoose');
var Score = mongoose.model('Score');
var User = mongoose.model('User');
var Skill = mongoose.model('Skill');
var Vote = mongoose.model('Vote');
var async = require('async');
var _ = require('lodash');

exports.all = function (req, res) {
    Score.find()
        .populate('_skill', 'name')
        .populate('_user', 'name username')
        .exec(function (err, scores) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(scores);
            }
        });
};

exports.byUserId = function (req, res) {
//    async.each(scores, function (score, callback) {
    async.parallel([
        function (callback) {
            Skill
                .find()
                .select({_id: 1, name: 1, count: 1})
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
                .find({
                    '_user': req.params.userId
                })
                .select({votes: 1, score: 1, _skill: 1, _id: 0})
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
            Vote.find({
                _voter: req.user, //  CHANGE!!!
                _receiver: req.params.userId
            })
                .select({_skill: 1, score: 1, _id: 0})
                .exec(function (err, votes) {
                    if (err) {
                        res.render('error', {
                            status: 500
                        });
                        return;
                    }
                    callback(null, votes);
                });

        }],
        function (err, results) {
            var combined = [];
            results[0].forEach(function (skill) {
                var skillId = skill._id;
                var skillName = skill.name;
                var skillScore = 0;
                var votes = 0;
                var myVote = 0;
                results[1].forEach(function (score) {
                    if (skillId.toString() == score._skill.toString()) {
                        skillScore = score.score;
                        votes = score.votes;
                        results[2].forEach(function (vote) {
                            if (skillId.toString() == vote._skill.toString()) {
                                myVote = vote.score;
                            }
                        });
                    }
                });
                combined.push({
                    skillId: skillId,
                    skillName: skillName,
                    score: (Math.round(10*skillScore)/10),
                    votes: votes,
                    myVote: myVote
                });
            });
            res.jsonp(combined)
        }
    )
    ;
}
;

exports.allSkills = function (req, res) {
    Skill.find()
        .populate('')
        .exec(function (err, skills) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(skills);
            }
        });
};


exports.byUsername = function (req, res) {
    User.findOne({ username: req.params.username}).exec(function (err, user) {
            if (err || !user) {
                res.render('error', {
                    status: 500
                })
            } else {
                Score.find()
//        .limit(2)
                    .find({'_user': user._id})
                    .populate('_skill', 'name')
                    .populate('_user', 'name username')
                    .exec(function (err, scores) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            res.jsonp(scores);
                        }
                    });

            }
        }
    )
}
;