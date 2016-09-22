'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$http', '$scope', function($http, $scope) {

    var STEP = 20;

    var params = {'criteria': {
        'limit': STEP,
        'skip': 0,
        'sort': [['id', 'ascending']]
    }};

    var loading = false;

    $scope.repos = [];

    function process_repos(response) {
        $scope.repos = response.data || [];
        loading = false;
    }

    function get_page() {
        // Clear the list of repos as a workaround for missing
        // loading indicator.
        $scope.repos = [];
        loading = true;
        $http.post('/api/v2/repositories/search/', params)
             .then(process_repos);
    }

    function next_page() {
        params.criteria.skip += STEP;
        get_page();
    }

    function previous_page() {
        params.criteria.skip -= STEP;
        get_page();
    }

    function has_next_page() {
        return !loading && $scope.repos.length == STEP;
    }

    function has_previous_page() {
        return !loading && params.criteria.skip > 0;
    }

    $scope.config = {'showSelectBox': false}

    $scope.previous_page = previous_page;
    $scope.next_page = next_page;

    $scope.has_previous_page = has_previous_page;
    $scope.has_next_page = has_next_page;

    get_page();
}]);
