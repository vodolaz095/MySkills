'use strict';

mySkills
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .when('/users/:username', '/:username')
                .when('/top/salsa-dancing', '/top/salsadancing')
//                .when('/_=_','/')
                .otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/index.html'
                })
                .state('users', {
                    url: "/users",
                    templateUrl: "/views/users/list.html"
                })
                .state('skills', {
                    url: "/skills",
                    templateUrl: "/views/skills/list.html"
                })
                .state('skillDetails', {
                    url: "/top/{skill}?user",
                    templateUrl: "/views/skills/details.html"
                })
//                .state('skillDetails', {
//                    url: "/top/salsa-dancing",
//                    templateUrl: "/views/skills/details.html"
//                })
//                .state('scores', {
//                    url: "/scores",
//                    templateUrl: "/views/scores/list.html"
//                })
//                .state('scoresBySkill', {
//                    url: "/top/:skill",
//                    templateUrl: "/views/scores/skill.html"
//                })
                .state('feedback', {
                    url: "/feedback",
                    templateUrl: "/views/feedback.html"
                })
//                .state('userDetails', {
//                    url: "/:username",
//                    templateUrl: "/views/users/details.html"
//                })
                .state('userDetails', {
                    abstract: true,
                    templateUrl: "views/users/details.html"
                })
                .state('userDetails.default', {
                    url: '/:username',
                    views: {
                        user: {
                            templateUrl: "views/users/details/user.html"
                        }
                    }
                })
        }]);


//Setting HTML5 Location Mode
angular.module('mySkills')
    .config(['$locationProvider',
        function ($locationProvider) {
//            $locationProvider.hashPrefix('!');
            $locationProvider.html5Mode(true);
        }
    ])


    .run(
    [        '$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }]);

angular.module('mySkills')
    .config(function ($httpProvider) {
        var logsOutUserOn401 = ['$q', '$window', function ($q, $window) {
            var success = function (response) {
                return response;
            };

            var error = function (response) {
                if (response.status === 401) {
                    $window.location = '/auth/facebook';
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            };

            return function (promise) {
                return promise.then(success, error);
            };
        }];

        $httpProvider.responseInterceptors.push(logsOutUserOn401);
    });