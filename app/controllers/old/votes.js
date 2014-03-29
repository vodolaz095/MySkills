var db = require('../.');

exports.list = function (req, res) {
    if (req.user) {
        var name = req.user.name;
    }
    var data = [];
    data.push({
        project: {
            title: "ssss",
            xxx: "xxxx"}});
    data.push({
        projectt: {
            xxx: "xxddd"
        }
    });
    data.pdroject = {title: "sssssz"};

    db.Skill.findAll().success(function (a) {
            a.forEach(function (b) {
                data.push({
                    b: {
                        id: b.id
                    }
                });
                //data[[b.id][1]] = b.name;
                res.json(data)
            });
            db.Vote.findAll({
                    include: [ db.Skill, { model: db.User, as: 'voter' }, { model: db.User, as: 'receiver' } ],
//            attributes: [['avg(receiverId)', 'voterIdd'], ['count(receiverId)', 'count']]
                    group: ['skillId']
                }
            ).
                success(function (votes) {
                    var currentUserId = '1';
                    votes.forEach(function (vote) {
                        if (vote.voterId == currentUserId) {
//                        data[0] =                        {
//                            skill: vote.skillId,
//                            score: vote.score,
//                            myVote: vote.score,
//                            votes: 4,
//                            allVotes: 9
//                        };
                        }
                    });
                    //res.json(data);
                    console.log(data);
//            res.render('votes/list', { votes: votes, user: name });
                });
        }
    )
}
;