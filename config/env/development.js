'use strict';

module.exports = {
    db: "mongodb://localhost/myskills",
    app: {
        name: "MySkills - Development"
    },
    facebook: {
        clientID: "601776696548416",
        clientSecret: "79f658b03d38e43cabfcfcb828fe8c66",
        callbackURL: "http://dev.myskills.co:3000/auth/facebook/callback"
//        callbackURL: "http://mean.myskills.co/auth/facebook/callback"
    }
}