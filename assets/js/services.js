'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('mySkills.services', []).
    value('version', '0.1');

angular.module('mySkills.services', [])
    .factory('Global', [
        function () {
            var _this = this;
            _this._data = {
                user: window.user,
                authenticated: !!window.user,
                test: 'TEST'
            };

            return _this._data;
        }
    ])
    .factory('skills', ['$resource', function ($resource) {
        return $resource('/api/skills/:skillId');
    }])
//    .factory('scores', ['$resource', function ($resource) {
//        return $resource('/api/scores/?skill=:skillId&user=:userId',
//            {isArray: true});
//    }])
    .factory('userScores', ['$resource', function ($resource) {
        return $resource('/api/scores/user/:userId',
            {isArray: true});
    }])
    .factory('skillScores', ['$resource', function ($resource) {
        return $resource('/api/scores/skill/:skillId',
            {isArray: true});
    }])
    .factory('users', ['$resource', function ($resource) {
        return $resource('/api/users/:username');
    }])
    .factory('friends', ['$resource', function ($resource) {
        return $resource('/api/friends');
    }])
    .factory('vote', ['$resource', function ($resource) {
        return $resource('/api/vote',{},{
            post: {method:'POST'}
        });
    }])

//    .factory('votes', ['$resource', function ($resource) {
//        return $resource('/api/myvote/:skillId');
//    }])
;




