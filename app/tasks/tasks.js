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

    function Task(task) {
        _.assign(this, _.pick(task,
            ['task_id', 'task_type', 'state', 'finish_time']
        ));
        // pulp.server.controllers.repository.download_deferred -> Download Deferred
        this.title = _.chain(this.task_type.split('.')).last().startCase().value();
        this.tags = [];
        this.repos = [];
        task.tags.forEach(function(tag) {
            if (tag.startsWith('pulp:action:')) { return; }
            if (tag.startsWith('pulp:repository_distributor:')) { return; }

            if (tag.startsWith('pulp:repository:')) {
                this.repos.push(tag.replace('pulp:repository:', ''));
                return;
            }

            this.tags.push(tag);

        }, this);
    }

    $scope.items = [];

    function process_repos(response) {
        var new_items = response.data || [];

        new_items.forEach(function(item) {
            $scope.items.push(new Task(item));
        });

        if (new_items.length < STEP) {
            full_data_set = true;
        }

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
