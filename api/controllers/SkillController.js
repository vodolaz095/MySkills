/**
 * SkillController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    byName: function (req, res, next) {
        var name = req.param('name').replace("-"," ");
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
    }
};
