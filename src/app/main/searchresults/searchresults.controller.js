(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SearchResultsController', SearchResultsController);

    /** @ngInject */
    function SearchResultsController($state,$scope,$http,$stateParams,resourceUrl,storageService) {
        var vm = this;
        console.log("SearchResultsController");
        console.log($stateParams.name);
        $scope.regular = null;

        if($stateParams.name == null){
            $state.go('search')
        }else {
            $scope.regular = $stateParams.name;
            $http({
                method: 'POST',
                url: resourceUrl.url() + 'matches?' +
                '&token=' + storageService.get("token") + '&type=search&' +
                'age_start=' + $scope.regular.age_start +
                '&height_start=' + $scope.regular.height_start +
                '&height_end=' + $scope.regular.height_end + '' +
                '&age_end=' + $scope.regular.age_end
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
            }, function errorCallback(response) {
                console.log(response);
            });
        }

    }
})();