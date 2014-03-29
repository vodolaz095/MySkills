'use strict';


// Declare app level module which depends on filters, and services
var mySkills = angular.module('mySkills', [
    'angulartics',
    'angulartics.google.analytics',
    'ngResource',
    'mySkills.filters',
    'mySkills.services',
    'mySkills.directives',
    'mySkills.controllers'
]);