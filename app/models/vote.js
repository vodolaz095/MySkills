var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    score: Number,
    _voter: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    _receiver: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    _skill: {
        type: Schema.ObjectId,
        ref: 'Skill'
    }
});

mongoose.model('Vote', VoteSchema);
