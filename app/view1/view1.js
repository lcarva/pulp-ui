'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$http', '$scope', function($http, $scope) {

    var STEP = 50;

    var params = {'criteria': {
        'limit': STEP,
        'skip': 0,
        'sort': [['id', 'ascending']]
    }};

    var full_data_set = false;

    $scope.items = [];

    function process_repos(response) {
        var new_items = response.data || [];
        if (new_items.length < STEP) {
            full_data_set = true;
        }
        Array.prototype.push.apply($scope.items, new_items);
        $scope.loading = false;
    }

    function get_page() {
        $scope.loading = true;
        $http.post('/api/v2/repositories/search/', params)
             .then(process_repos);
    }

    function has_next_page() {
        return !full_data_set && !$scope.loading;
    }

    function load_more() {
        console.log('load_more');
        if (has_next_page()) {
            params.criteria.skip += STEP;
            get_page();
        }
    }

    $scope.config = {'showSelectBox': false}

    $scope.load_more = load_more;

    $scope.loading = false;

    get_page();
}]);
