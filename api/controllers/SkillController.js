/**
 * SkillController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    byName: function (req, res, next) {
        var name = req.param('name').replace("-", " ");
        Skill.findOne()
            .where({plural: name})
            .exec(function (err, skill) {
                if (!skill) {
                    res.json('error'); //return 404 somehow?
                }
                else {
                    res.json(skill);
                }
            }
        );
    },
    randomBesidesMe: function (req, res) {
        var me = req.param('skill');
        Skill.find()
            .where({id: {'not': me}})
            .exec(function (err, skills) {
                if (!skills) {
                    res.json('error'); //return 404 somehow?
                }
                else {
                    res.json(skills);
                }
            })
    }
};
