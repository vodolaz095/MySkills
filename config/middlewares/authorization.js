'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        console.log('User is not authorized');
        //req.session.tempUrl = req.url;
        req.session.tempReferer = req.headers.referer;

        req.session.tempBody = req.body;
        return res.send(401, 'User is not authorized');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.user = {
    hasAuthorization: function (req, res, next) {
        if (req.profile.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};