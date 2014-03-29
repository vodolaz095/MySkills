'use strict';

//Setting up route
//angular.module('mySkills').config(['$routeProvider',
//    function ($routeProvider) {
//        if (user) {
//            $routeProvider.when('/', {
//                redirectTo: 'users/' + user.username
//            });
//        } else {
//            $routeProvider.when('/', {
//                templateUrl: 'views/index.html'
//            });
//        }
//        ;
//
//        $routeProvider.
//            when('/skills', {
//                templateUrl: 'views/skills/list.html'
//            }).
//            when('/skills/:skillId', {
//                templateUrl: 'views/skills/details.html'
//            }).
//            when('/votes', {
//                templateUrl: 'views/votes/list.html'
//            }).
//            when('/votes/:userId', {
//                templateUrl: 'views/votes/user.html'
//            }).
//            when('/scores', {
//                templateUrl: 'views/scores/list.html'
//            }).
//            when('/scores/:username', {
//                templateUrl: 'views/scores/user.html'
//            }).
//            when('/users', {
//                templateUrl: 'views/users/list.html'
//            }).
//            when('/users/:username', {
//                templateUrl: 'views/users/details.html'
//            }).
//            otherwise({
//                redirectTo: '/'
//            });
//    }
//]);


angular.module('mySkills', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'mySkills.system', 'mySkills.users', 'mySkills.skills', 'mySkills.votes', 'mySkills.scores', 'ui.utils'])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .when('/users/:username', '/:username')
                .otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/index.html'
                })
                .state('users', {
                    url: "/users",
                    templateUrl: "views/users/list.html"
                })
                .state('feedback', {
                    url: "/feedback",
                    templateUrl: "views/feedback.html"
                })
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