var mongoose = require('mongoose');
var Vote = mongoose.model('Vote');
var Skill = mongoose.model('Skill');
var Score = mongoose.model('Score');

//exports.all = function (req, res) {
////    Vote.aggregate([
////            {$project:{name: '$_skill.name'}},
////        { $group: {
////            _id: '$name',
////            votes: { $sum: 1 }
////        }            }]
////   ])
//
//    Score.find()
//        .populate('_skill', 'name')
//        .populate('_user', 'name')
//        .exec(function (err, scores) {
//            if (err) {
//                res.render('error', {
//                    status: 500
//                });
//            } else {
//                res.jsonp(scores);
//            }
//        });
//};

//exports.sample = function (req, res) {
//    var vote = new Vote(req.body);
//    vote._voter = req.user;
//    vote._receiver = req.user;
//    vote._skill = '52de7f4983565fa4279a062d';
//    vote.score = 2;
//
//    vote.save(function (err) {
//        res.jsonp(vote);
//    });
//};
//
//exports.sample = function (req, res) {
//    var score = new Score(req.body);
//    score._user = '52deaaab81be11d02d8371cc';
//    score._skill = '52de8206dbd7b9c807a07b5a';
//    score.score = 1.2;
//    score.votes = 3;
//
//    score.save(function (err) {
//        res.jsonp(score);
//    });
//};


//exports.byUser = function (req, res) {
//    Vote.find().exec(function (err, votes) {
//        if (err) {
//            res.render('error', {
//                status: 500
//            });
//        } else {
//            res.jsonp(votes);
//        }
//    });
//};
//
//exports.bySkillAndUser = function (req, res) {
//    Vote.findOne({
//        _voter: req.user._id,
//        _receiver: req.user._id,
//        _skill: req.skill._id
//    })
//        .exec(function (err, vote) {
//            res.json(vote);
//        })
//};

//exports.form = function (req, res) {
//    res.render('form')
//};

function SaveVote(VoterID, receiverId, SkillID, Score) {
    Vote.update({
        _voter: VoterID,
        _receiver: receiverId,
        _skill: SkillID
    }, {
        score: Score,
        created: Date()
    }, {'upsert': true}).exec();
}

function increaseSkillCount(skillId) {
    Skill.update({
        _id: skillId
    }, {
        updated: Date(),
        $inc: {count: 1} // Will increase anyway, even if user is just updating his vote. needs to be fixed.
    }, {'upsert': true}).exec();
}

function saveScore(skillId, receiverId, scoreReceived) {
    Score
        .findOne({
            _skill: skillId,
            _user: receiverId
        })
        .exec(function (err, score) {
            if (!score) {
                var newScore = new Score();
                newScore.votes = 1;
                newScore.score = scoreReceived;
                newScore._skill = skillId;
                newScore._user = receiverId;
                newScore.save(function (err) {
                });
            } else {
                Score
                    .update({
                        _skill: skillId,
                        _user: receiverId
                    },
                    {
                        votes: (score.votes + 1),
                        score: ((score.score * score.votes + scoreReceived) / (score.votes + 1))
                        // THIS IS WRONG!
                    }).exec();
            }
        });
}

exports.submitt = function (req, res) {
    console.log('----------');
//    console.log(req);
    console.log('----------');
};

exports.submit = function (req, res) {
    if (req.session.tempBody) {
        var score = req.session.tempBody.score;
        var _skill = req.session.tempBody._skill;
        var _receiver = req.session.tempBody._receiver;
        var skillName = req.session.tempBody.skillName;
    } else {
        var score = req.body.score;
        var _skill = req.body._skill;
        var _receiver = req.body._receiver;
        var skillName = req.body.skillName;
    };
    if (!_skill) {
        Skill
            .findOne({
                name: skillName
            })
            .exec(function (err, skill) {
                if (!skill) {
                    var newSkill = new Skill();
                    newSkill.name = skillName;
                    newSkill.save(function (err) {
                        SaveVote(req.user, _receiver, newSkill._id, score);
                        increaseSkillCount(newSkill._id);
                        saveScore(newSkill._id, _receiver, score);
                        res.send({
                            status: 'success'
                        });
                    });
                } else {
                    SaveVote(req.user, _receiver, skill._id, score);
                    increaseSkillCount(skill._id);
                    saveScore(skill._id, _receiver, score);
                    res.send({
                        status: 'success'
                    });
                }
            })
    }
    else {
        SaveVote(req.user, _receiver, _skill, score);
        increaseSkillCount(_skill);
        saveScore(_skill, _receiver, score);
        res.send({
            status: 'success'
        });
    }
};