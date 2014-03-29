'use strict';

angular.module('mySkills.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

//    $scope.menu = [{
////        'title': 'Users',
////        'link': 'users'
////    }, {
////        'title': 'Skills',
////        'link': 'skills'
//    }];

    $scope.isCollapsed = false;
}]);