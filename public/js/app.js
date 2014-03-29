'use strict';

angular.module('mySkills', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.router', 'mySkills.system', 'mySkills.users', 'mySkills.skills', 'mySkills.votes', 'mySkills.scores', 'ui.utils']);

angular.module('mySkills.system', []);
angular.module('mySkills.users', []);
angular.module('mySkills.skills', []);
angular.module('mySkills.votes', []);
angular.module('mySkills.scores', []);