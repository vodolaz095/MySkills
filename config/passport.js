var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var sm = require('sitemap');
var seojs = require('express-seojs');

module.exports = {
    express: {
        customMiddleware: function (app) {
            passport.use(new FacebookStrategy({
                    clientID: "601776696548416",
                    clientSecret: "79f658b03d38e43cabfcfcb828fe8c66",
//                    callbackURL: "http://dev.myskills.co:1337/auth/facebook/callback",
                    callbackURL: "http://myskills.co/auth/facebook/callback",
                    passReqToCallback: true
                },
                function (req, accessToken, refreshToken, profile, done) {
                    process.nextTick(function () {
                        req.session.fbAccessToken = accessToken;
                        User.findOne({
                                or: [
                                    {facebookId: parseInt(profile.id)},
                                    {facebookId: profile.id}
                                ]
                            }
                        ).done(function (err, user) {
                                if (user) {
                                    return done(null, user);
                                } else {
                                    var data = {
//                        provider: profile.provider,
                                        facebookId: profile.id,
                                        name: profile.displayName,
                                        username: profile.username || profile.id
                                    };

                                    if (profile.emails && profile.emails[0] && profile.emails[0].value) {
                                        data.email = profile.emails[0].value;
                                    }
                                    if (profile.name && profile.name.givenName) {
                                        data.firstName = profile.name.givenName;
                                    }
                                    if (profile.name && profile.name.familyName) {
                                        data.lastName = profile.name.familyName;
                                    }

                                    User.create(data).done(function (err, user) {
                                        return done(err, user);
                                    });
                                }
                            });
                    });
                }
            ));

            app.use(passport.initialize());
            app.use(passport.session());

//            app.use(require('prerender-node').set('prerenderToken', 'eOIHvTdMGsjU4ejVCqLJ'));

//            app.use(seojs('AADfW9tF7d'));

            var sitemap = sm.createSitemap({
                hostname: 'http://myskills.co',
                cacheTime: 600000,        // 600 sec - cache purge period
                urls: [
                    { url: '/best-salsa-dancers-in-the-world', changefreq: 'daily', priority: 1.0 },
                    { url: '/best-body-builders-in-the-world', changefreq: 'daily', priority: 1.0 },
                    { url: '/best-entrepreneurs-in-the-world', changefreq: 'daily', priority: 1.0 }
                ]
            });

            app.get('/sitemap.xml', function (req, res) {
                sitemap.toXML(function (xml) {
                    res.header('Content-Type', 'application/xml');
                    res.send(xml);
                });
            });

        }
    }
};


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({id: id}).done(function (err, user) {
        done(err, user)
    });
});


