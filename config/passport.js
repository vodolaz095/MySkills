var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  prerendererConfig = require('./prerenderer/config.json'),
  phantomjs = require('phantomjs'),
  childProcess = require('child_process'),
  path = require('path'),
  sm = require('sitemap');

module.exports = {
    express: {
        customMiddleware: function (app) {

            passport.use(new FacebookStrategy({
                    clientID: "601776696548416",
                    clientSecret: "79f658b03d38e43cabfcfcb828fe8c66",
//                    callbackURL: "http://dev.myskills.co/auth/facebook/callback",
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

/*
 * Middleware for giving Google and other crawlers the prerendered by phantomJS page
 */
          app.use(function (request, response, next) {
            var userAgent = request.headers['user-agent'];
            if (request.method !== 'GET') {
              return next;
            } else {
              var isBot,
                isOverride = request.query.overridePrerenderer ? true : false,
                isNotStatic;

              prerendererConfig.bots.map(function (botName) {
                if (new RegExp(botName, 'i').test(userAgent)) {
                  isBot = true;
                }
              });

              prerendererConfig.extensionsToIgnore.map(function (extension) {
                if (new RegExp('\\' + extension + '$', 'i').test(request.originalUrl)) {
                  isNotStatic = true;
                }
              });


              if ((isBot && isNotStatic) || isOverride) {
                var binPath = phantomjs.path;

                var childArgs = [
                  path.join(__dirname, 'prerenderer', 'phantomjs.notjs'),
                  'http://localhost:' + (process.env.PORT || 1337) + request.originalUri
                ];

                childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
                  console.log(stdout);
                  console.log(stderr);
                  if (err) {
                    next(err);
                  } else {
                    response.send(stdout);
                  }
                });
              } else {
                next();
              }
            }
          });

/*
 * End of prerenderer middleware
 */

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


