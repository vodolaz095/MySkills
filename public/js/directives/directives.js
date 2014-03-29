angular.module('mySkills.users', [])
    .directive('skillRating', ['Votes', '$window', function (Votes, $window) {
        return {
            restrict: 'A',
            templateUrl: '../../views/_partials/rating.html',
            scope: {
                onRatingSelected: '&',
                score: '=',
                user: '=',
                skillName: '='
            },
            link: function (scope, elem, attrs, controller) {
                if (scope.score) {
                    var realValue = scope.score.myVote;
                } else {
                    var realValue = 0;
                }
                scope.tempValue = realValue;
                scope.submit = function (index) {
                    scope.onRatingSelected({newRating: index + 1});
                    realValue = scope.tempValue;
//                    console.log('score: ' + (index + 1));
//                    console.log('receiver: ' + scope.user._id);
//                    console.log('skillId: ' + scope.score.skillId);
                    if (scope.score) {
                        Votes.save({
                                score: realValue,
                                _skill: scope.score.skillId,
                                _receiver: scope.user._id
                            },
                            function (results) {
                                if (results.status == 'success') {
                                    scope.showSaved = true;
                                }
                            });
                    } else {
                        Votes.save({
                            score: realValue,
                            skillName: scope.skillName,
                            _receiver: scope.user._id
                        });
                    }
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
            templateUrl: '../../views/_partials/card.html',
            scope: {
                score: '=',
                skillName: '=',
                user: '='
            },
            link: function (scope, elem, attrs) {
                //console.log(scope.skillName);
                //scope.same = 'sssss';
            }
        }
    });