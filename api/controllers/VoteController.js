/**
 * VoteController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    test: function (req, res, next) {
        Vote.find({groupBy: ['receiver'], average: ['score']})
            .done(function (err, votes) {
                res.json(votes);
            });
    },
    saveVote: function (req, res, next) {
        if (req.session.tempBody) {
            var score = req.session.tempBody.score;
            var skill = req.session.tempBody.skill;
            var receiver = req.session.tempBody.receiver;
//            var skillName = req.session.tempBody.skillName;
        } else {
            var score = req.param('score');
            var skill = req.param('skill');
            var receiver = req.param('receiver');
//            var skillName = req.body.skillName;
        }
        ;
        var voter = req.user.id;
        if (receiver != voter) {
            Vote.findOne({
                voter: voter,
                receiver: receiver,
                skill: skill
            })
                .exec(function (err, vote) {
                    if (vote) {
                        Vote.update(vote.id, {
                            score: score
                        })
                            .exec(function (err, done) {
//                            console.log(done);
                                res.json('done')
                            })
                    } else {
                        Vote.create({
                            voter: voter,
                            receiver: receiver,
                            skill: skill,
                            score: score
                        }).exec(function (err, done) {
//                        console.log(done);
                            res.json('done')
                        })
                    }

                })
        }else{
            res.json('error');
        }
    }
};
