module.exports = function (app, passport, auth) {


    var users = require('../app/controllers/users');
    app.get('/api/users', users.all);
//    app.get('/users/sample', users.sample);
    app.get('/api/users/:username', users.byUsername);


    // Setting up the userId param
    app.param('userId', users.user);


    var skills = require('../app/controllers/skills');
    app.get('/skills', skills.all);
    app.get('/skills/:skillId', skills.show);
    app.post('/skills', auth.requiresLogin, skills.create);
    app.param('skillId', skills.skill);

    var votes = require('../app/controllers/votes');
//    app.get('/votes',votes.all);
//    app.get('/votes/sample', votes.sample);
//    app.get('/votes/:userId', votes.byUser);
//    app.get('/api/myvote/:skillId/:userId', votes.bySkillAndUser);
//    app.get('/form',votes.form);
    app.post('/api/votes', auth.requiresLogin, votes.submit);
//    app.post('/api/votes', votes.submit);

    var facebook = require('../app/controllers/facebook');
    app.get('/api/friends', facebook.getRandomFriends);
//    app.get('/api/sarah',facebook.getDetails);

    var scores = require('../app/controllers/scores');
    app.get('/scores', scores.all);
    app.get('/api/scores/:userId', scores.byUserId);
    app.get('/api/allscores/:userId', scores.allSkills);

    // Setting the facebook oauth routes
//    app.get('/auth/facebook', passport.authenticate('facebook', {
//        scope: ['email', 'user_about_me']
//    }));
    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    }), users.authCallback);

    app.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

//    var skills = require('../app/controllers/old/skills');
//    app.get('/skills', skills.list);
//    app.get('/skills/:id', skills.details);
//    app.post('/skills', skills.new);

    // Home route
    var index = require('../app/controllers/index');
    //app.get('/users/:username', index.render);
    app.get('*', index.render);
    app.get('/', index.render);
//    app.get('*', function(req, res) {
//        res.redirect('/');
//    });
};
