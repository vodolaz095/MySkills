'use strict';

/* Controllers */

angular.module('mySkills.controllers', ['ui.router', 'ui.utils'])
    .controller('HeaderController', ['$rootScope', '$scope', 'Global', function ($rootScope, $scope, Global) {
        $scope.global = Global;
        $scope.isCollapsed = false;
        $rootScope.title = "MySkills";
    }])
    .controller('skillsController', ['$rootScope', '$scope', '$stateParams', 'skills', 'skillsByName', 'skillScores', 'Global', 'randomSkills', function ($rootScope, $scope, $stateParams, skills, skillsByName, skillScores, Global, randomSkills) {
        $scope.global = Global;
        $scope.hidden = true;
        $scope.find = function () {
            skills.query(function (skills) {
                $scope.skills = skills;
            });
        };
        $scope.highlightUser = $stateParams.user;
        $scope.findOne = function () {
            skillsByName.get({
                name: $stateParams.skill
            }, function (skill) {
                $rootScope.title = "Best " + skill.plural + " in the world";
                $scope.skill = skill;
                skillScores.query({
                    skillId: skill.id
                }, function (scores) {
                    $scope.scores = scores;
                });

                randomSkills.query({
                    skillId: skill.id
                }, function (randomSkills) {
                    $scope.randomSkills = randomSkills;
                })

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
    }])
    .controller('usersController', ['$rootScope', '$scope', '$stateParams', 'Global', 'users', 'userScores', 'friends', function ($rootScope, $scope, $stateParams, Global, users, userScores, friends) {
        $scope.global = Global;
        $scope.findOneByUsername = function () {
            users.get({
                username: $stateParams.username
            }, function (user) {
                $rootScope.title = user.name + " - MySkills";
                $scope.user = user;
                userScores.query({
                    userId: user.id
                }, function (scores) {
                    $scope.scores = scores;
                });

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
    .controller('generalController', ['$rootScope', '$scope', function ($rootScope, $scope) {
        $scope.feedback = function () {
            $rootScope.title = "Feedback - MySkills";
        }
    }
    ]);
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