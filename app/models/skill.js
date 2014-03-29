var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    name: String,
    count: Number
});

SkillSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Skill', SkillSchema);