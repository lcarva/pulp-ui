'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$http', '$scope', function($http, $scope) {

    function process_repos(response) {
        $scope.repos = response.data || [];
    }

    $http.get('/api/v2/repositories/search/', {'params': {'limit': 999}})
        .then(process_repos);

}]);
