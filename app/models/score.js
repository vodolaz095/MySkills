var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
    score: Number,
    votes: Number,
    _user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    _skill: {
        type: Schema.ObjectId,
        ref: 'Skill'
    }
});

mongoose.model('Score', ScoreSchema);