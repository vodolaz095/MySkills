var db = require('../.');

exports.details = function (req, res) {
    if (req.user) {
        var name = req.user.name;
    }
    db.Skill.find({ where: {id: req.params.id}}).success(function(skill){
        res.render('skills/details', { skill: skill, user: name });
    })
};

exports.new = function (req, res) {
    var name = req.body.skill;
    db.Skill.create({ name: name }).success(function (name) {
        res.redirect('skills')
    })
};

exports.list = function (req, res) {
    if (req.user) {
        var name = req.user.name;
    }
    db.Skill.findAll().success(function (skills) {
        //console.log(skills);
        res.render('skills/list', { skills: skills, user: name });
    })
};