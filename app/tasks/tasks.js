'use strict';

angular.module('myApp.tasks', []).controller('TasksCtrl',
['$http', '$scope', function($http, $scope) {

    var STEP = 50;

    var params = {'criteria': {
        'limit': STEP,
        'skip': 0,
        'sort': [['start_time', 'descending'], ['id', 'ascending']]//,
        // 'filters': {'state': {'$in': ['waiting', 'running', 'finished']}}
    }};

    var full_data_set = false;

    $scope.items = [];

    function process_repos(response) {
        var new_items = response.data || [];
        // Augment repositories to easily check for empty ones
        new_items.forEach(function(item) {
            var total_content_units = 0;
            for (var unit in item.content_unit_counts) {
                total_content_units += item.content_unit_counts[unit];
            }

            item.total_content_units = total_content_units;
        });
        if (new_items.length < STEP) {
            full_data_set = true;
        }
        Array.prototype.push.apply($scope.items, new_items);
        $scope.loading = false;
    }

    function get_page() {
        $scope.loading = true;
        // $http.get('/api/v2/tasks/')
        $http.post('/api/v2/tasks/search/', params)
             .then(process_repos);
    }

    function has_next_page() {
        return !full_data_set && !$scope.loading;
    }

    function load_more() {
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
