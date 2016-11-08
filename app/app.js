'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.bootstrap.tpls',
  'patternfly',
  'infinite-scroll',
  'ui.router',
  'myApp.repositories',
  'myApp.tasks'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .otherwise({redirectTo: '/repositories'});
}]).
run(['$state', function($state) {
    $state.transitionTo('repositories');
}]);
