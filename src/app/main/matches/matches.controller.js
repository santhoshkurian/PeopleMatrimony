(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MatchesController', MatchesController);

    /** @ngInject */
    function MatchesController($scope,storageService,$http) {
        var vm = this;
        $scope.matches= [];
        $scope.currentPage = 1;
        $scope.totalPAges = 20;
        $scope.pageChange = function () {
          console.log($scope.currentPage)
        }



        $http({
            method: 'GET',
            url: 'https://devapi.peoplematrimony.com/matches/new?' +
            '&token=' + storageService.get("token")
        }).then(function successCallback(response) {
            console.log(JSON.stringify(response))
            $scope.matches = response.data.matches;
        }, function errorCallback(response) {
            console.log(response)

        });

    }


})();