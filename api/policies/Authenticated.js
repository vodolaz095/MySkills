/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {

    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller

    if (req.isAuthenticated()) {
        return next();
    }
    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    req.session.tempReferer = req.headers.referer;
    req.session.tempBody = req.body;
    return res.send(401, 'User is not authorized');
    //return res.redirect('/auth/facebook');
    //return res.forbidden('You are not permitted to perform this action.');
};
