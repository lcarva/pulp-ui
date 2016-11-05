'use strict';

angular.module('myApp.repositories').controller('RepoCtrl',
['$http', '$scope', '$stateParams', function($http, $scope, $stateParams) {

    function get_content(repo) {
        $scope.content_types = Object.keys(repo.content_unit_counts).sort()
        select_content($scope.content_types[0]);

        var data = {
            criteria: {
                type_ids: $scope.content_types
            }
        };

        var url = '/api/v2/repositories/' + repo.id + '/search/units/';
        $scope.content_loading = true;
        return $http.post(url, data);
    }

    function process_repo(response) {
        $scope.repo = response.data;
        $scope.loading = false;

        return response.data;
    }

    function process_content(response) {
        $scope.content_loading = false;
        $scope.all_content = {};
        response.data.forEach(function(value) {
            if (!$scope.all_content[value.unit_type_id]) {
                $scope.all_content[value.unit_type_id] = [];
            }
            $scope.all_content[value.unit_type_id].push(value);
        });
    }

    function select_content(type_id) {
        $scope.selected_content = type_id;
    }

    $scope.select_content = select_content;

    $scope.loading = true;
    $http.get('/api/v2/repositories/' + $stateParams.repo_id,
              {params: {details: true}})
         .then(process_repo)
         .then(get_content)
         .then(process_content);

    $scope.repo = {id: $stateParams.repo_id};

    $scope.config = {'showSelectBox': false};
}]);
