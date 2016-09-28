'use strict';

angular.module('myApp.repositories')

.config(['$stateProvider', function($stateProvider) {

    $stateProvider.state({
        name: 'repository',
        url: '/repositories/:repo_id',
        templateUrl: '/view1/repository/repository.html',
        controller: 'RepoCtrl'
    });

}])

.controller('RepoCtrl', ['$http', '$scope', '$stateParams',
                          function($http, $scope, $stateParams) {

    function process_repo(response) {
        $scope.repo = response.data;
        $scope.loading = false;
    }

    $scope.loading = true;
    $http.get('/api/v2/repositories/' + $stateParams.repo_id)
         .then(process_repo);

    $scope.repo = {id: $stateParams.repo_id};
}]);
