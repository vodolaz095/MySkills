'use strict';

/* Directives */


angular.module('mySkills.directives', [])
    .directive('disqus', function($window) {
        return {
            restrict: 'E',
            scope: {
                disqus_shortname: '@disqusShortname',
                disqus_identifier: '@disqusIdentifier',
                disqus_title: '@disqusTitle',
                disqus_url: '@disqusUrl',
                disqus_category_id: '@disqusCategoryId',
                disqus_disable_mobile: '@disqusDisableMobile',
                readyToBind: "@"
            },
            template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>',
            link: function(scope) {

                scope.$watch("readyToBind", function(isReady) {

                    // If the directive has been called without the 'ready-to-bind' attribute, we
                    // set the default to "true" so that Disqus will be loaded straight away.
                    if ( !angular.isDefined( isReady ) ) {
                        isReady = "true";
                    }
                    if (scope.$eval(isReady)) {
                        // put the config variables into separate global vars so that the Disqus script can see them
                        $window.disqus_shortname = scope.disqus_shortname;
                        $window.disqus_identifier = scope.disqus_identifier;
                        $window.disqus_title = scope.disqus_title;
                        $window.disqus_url = scope.disqus_url;
                        $window.disqus_category_id = scope.disqus_category_id;
                        $window.disqus_disable_mobile = scope.disqus_disable_mobile;

                        // get the remote Disqus script and insert it into the DOM, but only if it not already loaded (as that will cause warnings)
                        if (!$window.DISQUS) {
                            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                            dsq.src = '//' + scope.disqus_shortname + '.disqus.com/embed.js';
                            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                        } else {
                            $window.DISQUS.reset({
                                reload: true
                            });
                        }
                    }
                });
            }
        };
    })
    .directive('skillRating', ['vote', '$window', function (vote, $window) {
        return {
            restrict: 'A',
            templateUrl: '/views/_partials/rating.html',
            scope: {
                onRatingSelected: '&',
                score: '=',
                user: '=',
                skill: '='
            },
            link: function (scope, elem, attrs, controller) {
                if (scope.score) {
                    var realValue = scope.score;
                } else {
                    var realValue = 0;
                }
                scope.tempValue = realValue;
                scope.submit = function (index) {
//                    console.log('new score: ' + (index + 1));
//                    console.log('receiver: ' + scope.user);
//                    console.log('skillId: ' + scope.skill);
//                    console.log('old score: ' + scope.score);
                    scope.onRatingSelected({newRating: index + 1});
                    realValue = scope.tempValue;
                    vote.post({
                        receiver: scope.user,
                        skill: scope.skill,
                        score: realValue
                    }, function (done) {
                        $window.location.reload(); //TODO: find a more elegant way to rerfesh the score!
                    });
                };
                scope.revertBack = function () {
                    scope.tempValue = realValue;
                };
                scope.toggle = function (index) {
                    scope.tempValue = index + 1;
                };
                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < 5; i++) {
                        scope.stars.push({
                            'fa fa-lg fa-star': i < scope.tempValue,
                            'fa fa-lg fa-star-o': i >= scope.tempValue
                        });
                    }
                };
                updateStars();
                scope.$watch('tempValue', function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                })
            }
        }
    }])
    .directive('scoreCard', function () {
        return {
            restrict: 'A',
            templateUrl: 'views/_partials/card.html',
            scope: {
                score: '=',
                skillName: '=',
                user: '='
            },
            link: function (scope, elem, attrs) {
//                console.log(scope.skillName);
                //scope.same = 'sssss';
            }
        }
    }
);
