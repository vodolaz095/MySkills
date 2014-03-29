'use strict';

//angular.module('mySkills.users')
//    .controller('UsersController', ['$scope', '$routeParams', '$location', 'Global', 'Users', 'Scores', 'Votes', 'Friends', function ($scope, $routeParams, $location, Global, Users, Scores, Votes, Friends) {
angular.module('mySkills.users')
    .controller('UsersController', ['$scope', '$stateParams', '$location', 'Global', 'Users', 'Scores', 'Votes', 'Friends', function ($scope, $stateParams, $location, Global, Users, Scores, Votes, Friends) {
//    .controller('UsersController', ['$scope', '$location', 'Users', 'Scores', 'Votes', 'Friends', function ($scope, $routeParams, $location, Global, Users, Scores, Votes, Friends) {

        $scope.global = Global;
//        $scope.zero = 5;
//        $scope.test = 'ssss';

        $scope.find = function () {
            Users.query(function (users) {
                $scope.users = users;
            });
        };

        $scope.findOne = function () {
            Users.get({
                username: $stateParams.username
            }, function (user) {
                Scores.query({
                    userId: user._id
                }, (function (scores) {
                    $scope.scores = scores;
                    $scope.user = user;
                }))
            });
        };

        $scope.showNewCard = false;
        $scope.checkNewCard = function (score, search) {
//            if (score.toLowerCase() == search.toLowerCase())
            if (score == search)
                $scope.showNewCard = false;
        };

        $scope.getFriends = function () {
            Friends.get({},
                function (friends) {
                    $scope.friends = friends;
                }
            )
        };

//        $scope.submitVote = function (rating) {
//            console.log(this.score.myVote);
//            console.log(this.score.skillId);
//            console.log(this.$parent.user._id);
//            Votes.save({
//                    score: rating,
//                    _skill: this.score.skillId,
//                    _receiver: this.$parent.user._id
//                },
//                function (results) {
//                    $scope.test = results;
//                    console.log('zzzz');
//                });
//        };

        $scope.submitVoteNew = function (rating) {
            console.log('yes!');
//        console.log(rating);
//        console.log(this.search.skillName);
            console.log(user._id);
            Votes.save({
                    score: rating,
                    skillName: this.search.skillName,
                    _receiver: user._id
                },
                function (results) {
                    $scope.test = results;
                });
        };

//    $scope.submitSkill = function () {
//        console.log('New Skill!');
//        Votes.update(function (results) {
//            $scope.test = results;
//        });
//        console.log(this.newSkillName);
//    }
    }]);
