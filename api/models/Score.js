/**
 * Score.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
//    autoPK: false,
    attributes: {
        user: {
            model: 'User',
            required:true
        },
        skill: {
            model: 'Skill',
            required: true
        },
        score: {
            type: 'float',
            required:true
        },
        votes: {
            type: 'integer',
            required:true
        },

        toJSON: function () {
            var obj = this.toObject();
//            delete obj.id;
            delete obj.createdAt;
            delete obj.updatedAt;
            obj.score = obj.score.toPrecision(3);
            return obj;
        }
    }


}
;
