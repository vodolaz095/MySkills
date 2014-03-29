var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    authTypes = ['facebook'];

var UserSchema = new Schema({
    name: String,
    email: String,
    username: {
        type: String,
        unique: true
    },
    provider: String,
    facebookId: Number,
    salt: String,
    facebook: {}
});


mongoose.model('User', UserSchema);