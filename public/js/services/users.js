//Users service used for articles REST endpoint
//angular.module('mySkills.users')
angular.module('mySkills')
    .factory('Users', ['$resource', function ($resource) {
        return $resource('api/users/:username', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }])
    .factory('Scores', ['$resource', function ($resource) {
        return $resource('api/scores/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        }, {isArray: true});
    }])
    .factory('Votes', ['$resource', function ($resource) {
        return $resource('api/votes', {
        },{
            update: {
                method: 'PUT'
            }
        });
    }])
    .factory('Friends', ['$resource', function ($resource) {
        return $resource('api/friends', {
        },{
            update: {
                method: 'PUT'
            }
        });
    }])
;
