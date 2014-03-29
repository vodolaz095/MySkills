angular.module('mySkills.skills').factory('skills', ['$resource', function($resource) {
    return $resource('skills/:skillId', {
        skillId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
