'use strict';

angular.module('myApp').config(
['$stateProvider', function($stateProvider) {

    $stateProvider.state( {
        name: 'repositories',
        url: '/repositories',
        templateUrl: '/view1/view1.html',
        controller: 'ReposCtrl'
    });

    $stateProvider.state({
        name: 'repository',
        url: '/repositories/:repo_id',
        templateUrl: '/view1/repository/repository.html',
        controller: 'RepoCtrl'
    });


}]);
