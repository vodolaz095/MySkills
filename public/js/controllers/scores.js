angular.module('mySkills.scores').controller('ScoresController', ['$scope', '$routeParams', '$location', 'Global', 'scores', function ($scope, $routeParams, $location, Global, scores) {
    $scope.test = 'OK';

    $scope.all = function () {
        scores.query(function (scores) {
            $scope.scores = scores;
        });
    };

    $scope.byUsername = function () {
        $scope.username = $routeParams.username;
        scores.query({
            username: $routeParams.username
        }, (function (scores) {
            $scope.scores = scores;
        }))
    };
}]);
