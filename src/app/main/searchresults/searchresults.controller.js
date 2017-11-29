(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SearchResultsController', SearchResultsController);

    /** @ngInject */
    function SearchResultsController($state,populate,$scope,$http,$stateParams,resourceUrl,storageService) {
        var vm = this;
        console.log("SearchResultsController");
        console.log($stateParams.name);

        $scope.populate = populate;
        console.log($scope.populate);
        $scope.mtcount = 4;
        $scope.educount = 4;
        $scope.ocuCatcount = 4;
        $scope.ocucount = 4;
        $scope.starcount = 4;
        $scope.relcount = 4;
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
                '&age_end=' + $scope.regular.age_end
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
            }, function errorCallback(response) {
                console.log(response);
            });
        }

        $scope.martialStatus = [{name: "Married"}, {name: "Never Married"}, {
            name: "Widow"
        }, {
            name: "Divorced"
        }, {
            name: "Widower"
        }];

        $scope.showMoreMStatus = function (obj1,action) {
            if(action == 'more'){
                $scope[obj1] = $scope[obj1]+4;
            }
            if(action == 'less' && $scope[obj1] > 4){
                $scope[obj1] = $scope[obj1]-4;
            }

        }




    }
})();