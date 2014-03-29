/**
 * UserController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var facebook = require('./FacebookController.js');

module.exports = {
    byUsername: function (req, res, next) {
        User.findOne()
            .where({username: req.param('username')})
            .exec(function (err, user) {
                if (!user) {
                    facebook.getDetails(req, function (profile) {
                        if (profile.error){
                            console.log(req.param('username'));
                            console.log('error');
                            return res.json('error');
                        }
                        var data = {
                            facebookId: profile.id,
                            name: profile.name,
                            username: profile.username || profile.id
                        };

                        if (profile.first_name) {
                            data.firstName = profile.first_name;
                        }
                        if (profile.last_name) {
                            data.lastName = profile.last_name;
                        }

//                        console.log(data);
                        User.create(data).done(function (err, user) {
//                            console.log(err);
                            return res.json(user);
                        });
//                        });
                    })
                }
                else {
                    res.json(user);
                }
            }
        );
    }
};
