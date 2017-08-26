(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MatchesController', MatchesController);

    /** @ngInject */
    function MatchesController($scope,storageService,$http) {
        var vm = this;
        $scope.matches= [];
        $scope.message = null;
        $scope.currentPage = 1;
        $scope.totalPAges = 20;
        $scope.pageChange = function () {
          console.log($scope.currentPage)
        }

        $scope.shortlist = shortlist;
        function shortlist(id){
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/do/shortlist?' +
                '&token=' + storageService.get("token")+'&id='+storageService.get('id')+'&view_id='+id
            }).then(function successCallback(response) {
               console.log(response)
                $scope.message = "Successfully Shortlisted";

            }, function errorCallback(response) {
                console.log(response)
                if(response.data.message == 'Already exists'){
                    $scope.message = "Already Shortlisted";
                }

            });


        }


        $http({
            method: 'GET',
            url: 'https://devapi.peoplematrimony.com/matches/new?' +
            '&token=' + storageService.get("token")
        }).then(function successCallback(response) {
            console.log(response)
            $scope.matches = response.data.matches;
        }, function errorCallback(response) {
            console.log(response);
        });

    }


})();