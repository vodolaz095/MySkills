angular.module('mySkills.scores').factory('scores', ['$resource', function($resource) {
    return $resource('scores/:userId', {
        userId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    }, {isArray:true});
}]);
