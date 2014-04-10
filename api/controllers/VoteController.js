/**
 * VoteController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    saveVote: function (req, res, next) {
        if (req.session.tempBody) {
            var score = req.session.tempBody.score;
            var skill = req.session.tempBody.skill;
            var receiver = req.session.tempBody.receiver;
        } else {
            var score = req.param('score');
            var skill = req.param('skill');
            var receiver = req.param('receiver');
        }
        ;
        var voter = req.user.id;

        if (isNaN(skill)) {
            Skill.findOrCreate({
                    name: skill
                },
                {
                    name: skill
                }).exec(function (err, skill) {
                    var skillId = skill.id;
                    if (receiver != voter) {
                        Vote.findOne({
                            voter: voter,
                            receiver: receiver,
                            skill: skillId
                        })
                            .exec(function (err, vote) {
                                if (vote) {
                                    Vote.update(vote.id, {
                                        score: score
                                    })
                                        .exec(function (err, done) {
                                            res.json('done')
                                        })
                                } else {
                                    Vote.create({
                                        voter: voter,
                                        receiver: receiver,
                                        skill: skillId,
                                        score: score
                                    }).exec(function (err, done) {
                                        res.json('done')
                                    })
                                }

                            })
                    } else {
                        res.json('error');
                    }
                })
        } else {
            var skillId = skill;
            if (receiver != voter) {
                Vote.findOne({
                    voter: voter,
                    receiver: receiver,
                    skill: skillId
                })
                    .exec(function (err, vote) {
                        if (vote) {
                            Vote.update(vote.id, {
                                score: score
                            })
                                .exec(function (err, done) {
                                    res.json('done')
                                })
                        } else {
                            Vote.create({
                                voter: voter,
                                receiver: receiver,
                                skill: skillId,
                                score: score
                            }).exec(function (err, done) {
                                res.json('done')
                            })
                        }

                    })
            } else {
                res.json('error');

            }
        }
    }
};
