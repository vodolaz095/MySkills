angular.module('mySkills.votes').controller('votesController', ['$scope', '$routeParams', '$location', 'Global', 'votes', function ($scope, $routeParams, $location, Global, votes) {
    $scope.test = 'OK';

    $scope.all = function () {
        votes.query(function (votes) {
            $scope.votes = votes;
        });
    };

}]);