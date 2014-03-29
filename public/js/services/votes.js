angular.module('mySkills.votes').factory('votes', ['$resource', function($resource) {
    return $resource('api/myvote/:skillId', {
        skillId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
