/**
 * Vote.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        voter: {
            model: 'User'
        },
        receiver: {
            model: 'User'
        },
        skill: {
            model: 'Skill'
        },
        score: {
            type: 'integer'
        }
    },
    afterCreate: function (vote, next) {
        Vote.find()
            .where({receiver: vote.receiver})
            .where({skill: vote.skill})
            .average('score')
            .exec(function (err, votes) {
                Vote.count()
                    .where({receiver: vote.receiver})
                    .where({skill: vote.skill})
                    .exec(function (err, count) {
                        Score.findOne({
                            user: vote.receiver,
                            skill: vote.skill
                        }).exec(function (err, score) {
                            if (!score) {
                                Score.create({
                                    user: vote.receiver,
                                    skill: vote.skill,
                                    score: _.first(votes).score,
                                    votes: count
                                }).exec(function (err, newScore) {
//                                    console.log(newScore);
                                });
                            } else {
                                score.score = _.first(votes).score;
                                score.votes = count;
                                score.save();
//                                console.log('exists');
                            }
//                            console.log(score);
                        });
                    });
            });
        next()
    },
    afterUpdate: function (vote, next) {
        Vote.find()
            .where({receiver: vote.receiver})
            .where({skill: vote.skill})
            .average('score')
            .exec(function (err, votes) {
                Vote.count()
                    .where({receiver: vote.receiver})
                    .where({skill: vote.skill})
                    .exec(function (err, count) {
                        Score.findOne({
                            user: vote.receiver,
                            skill: vote.skill
                        }).exec(function (err, score) {
                            if (!score) {
                                Score.create({
                                    user: vote.receiver,
                                    skill: vote.skill,
                                    score: _.first(votes).score,
                                    votes: count
                                }).exec(function (err, newScore) {
//                                    console.log(newScore);
                                });
                            } else {
                                score.score = _.first(votes).score;
                                score.votes = count;
                                score.save();
//                                console.log('exists');
                            }
//                            console.log(score);
                        });
                    });
            });
        next()
    }
};
