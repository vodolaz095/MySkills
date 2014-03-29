'use strict';

/* Controllers */

angular.module('mySkills.controllers', ['ui.router', 'ui.utils'])
    .controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
        $scope.global = Global;
        $scope.isCollapsed = false;
    }])
    .controller('skillsController', ['$scope', '$stateParams', 'skills', 'skillScores', 'vote', function ($scope, $stateParams, skills, skillScores, vote) {
//        $scope.test = 'OK';

        $scope.find = function () {
            skills.query(function (skills) {
                $scope.skills = skills;
            });
        };
        $scope.findOne = function () {
//            var currentSkill = $stateParams.skillId;
            var currentSkill = 1;
            skills.get({
                skillId: currentSkill
            }, function (skill) {
                $scope.skill = skill;
            });
            skillScores.query({
                skillId: currentSkill
            }, function (scores) {
                $scope.scores = scores;
            });
        };
        $scope.create = function () {
            var skill = new skills({
                name: this.name
            });
            skill.$save(function (response) {
//                $location.path('skill/' + response._id);
            });

            this.name = '';
        };
//        $scope.vote = function () {
//            vote.post({
//                receiver: 1,
//                skill: 1,
//                score: 2
//            }, function (done) {
//                console.log('done: ' + done);
//            })
//        }
    }])
    .controller('usersController', ['$scope', '$stateParams', 'Global', 'users', 'userScores', 'friends', function ($scope, $stateParams, Global, users, userScores, friends) {
        $scope.global = Global;
        $scope.findOneByUsername = function () {
            users.get({
                username: $stateParams.username
            }, function (user) {
                $scope.user = user;
                console.log(user);
            });
            userScores.query({
                userId: 1
            }, function (scores) {
                $scope.scores = scores;
            });
        };
        $scope.getFriends = function () {
            friends.get({},
                function (friends) {
                    $scope.friends = friends;
                }
            )
        };
        $scope.showNewCard = false;
        $scope.checkNewCard = function (search, score) {
            if (search == "")
                $scope.showNewCard = false;
//            else if (score == search)
////            if (score == search)
//                $scope.showNewCard = false;
            else {
                $scope.showNewCard = true;
            }
        };
    }])
//    .controller('scoresController', ['$scope', '$stateParams', 'scores', function ($scope, $stateParams, scores) {
//        $scope.test = 'OK';
//
//        $scope.findAll = function () {
//            scores.query(function (scores) {
//                $scope.scores = scores;
//            });
//        };
//        $scope.findBySkill = function () {
//            scores.query({
//                skillId: $stateParams.skillId
//            }, function (scores) {
//                $scope.scores = scores;
//            });
//        };
////        $scope.create = function () {
////            var skill = new skills({
////                name: this.name
////            });
////            skill.$save(function (response) {
//////                $location.path('skill/' + response._id);
////            });
////
////            this.name = '';
////        };
//
//    }])

;