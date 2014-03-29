'use strict';

/* Directives */


angular.module('mySkills.directives', [])
    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])
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
//                        console.log('done');
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
