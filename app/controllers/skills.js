var mongoose = require('mongoose'),
    Skill = mongoose.model('Skill');

exports.skill = function(req, res, next, id) {
    Skill.load(id, function(err, skill) {
        if (err) return next(err);
        if (!skill) return next(new Error('Failed to load skill ' + id));
        req.skill = skill;
        next();
    });
};

exports.all = function(req, res) {
    Skill.find().exec(function(err, skills) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(skills);
        }
    });
};

exports.show = function(req, res) {
    res.jsonp(req.skill);
};

exports.create = function(req, res) {
    var skill = new Skill(req.body);
    skill._user = req.user;

    skill.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                skill: skill
            });
        } else {
            res.jsonp(skill);
        }
    });
};