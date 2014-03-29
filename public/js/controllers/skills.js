angular.module('mySkills.skills').controller('skillsController', ['$scope', '$routeParams', '$location', 'Global', 'skills', function ($scope, $routeParams, $location, Global, skills) {
    $scope.test = 'OK';

    $scope.find = function () {
        skills.query(function (skills) {
            $scope.skills = skills;
        });
    };

    $scope.findOne = function () {
        skills.get({
            skillId: $routeParams.skillId
        }, function(skill) {
            $scope.skill = skill;
        });
    };

    $scope.create = function() {
        var skill = new skills({
            name: this.name
        });
        skill.$save(function(response) {
            $location.path('skill/' + response._id);
        });

        this.name = '';
    };

}]);