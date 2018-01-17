(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SearchByIdController', SearchByIdController);

    /** @ngInject */
    function SearchByIdController($scope,$http,$state,resourceUrl,storageService,$stateParams,$timeout) {
        var vm = this;
        console.log("SearchByIdController");
        $scope.viewId = '';
        $scope.gender = null;
        $scope.item=null;
        if($stateParams.id != '1'){
            $scope.viewId = $stateParams.id;
            viewById($stateParams.id);
        }

        $scope.viewById = viewById;
        function viewById(id){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/view?'+
                'view_id='+id+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                console.log(response)
                if(!response.data.error) {
                    $state.go('viewProfile',{view_id:id});

                    //$scope.item = response.data.user;
                    //$scope.gender = response.data.user.gender;
                }else{
                    $scope.message = 'Invalid ID';
                    $timeout(function() { $scope.message = '';}, 2000);

                }
            }, function errorCallback(response) {
                console.log(response)

            });
        }

        $scope.shortlist = function(id) {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'do/shortlist?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + id
            }).then(function successCallback(response) {
                console.log(response)
                $scope.message = "Successfully Shortlisted";
                $timeout(function() { $scope.message = '';}, 2000);


            }, function errorCallback(response) {
                console.log(response)
                if (response.data.message == 'Already exists') {
                    $scope.message = "Already Shortlisted";
                }
                $timeout(function() { $scope.message = '';}, 2000);


            });


        }

        $scope.viewProfile = viewProfile;
        function viewProfile(id){
            $state.go('viewProfile',{view_id:id});
        }


        $scope.sendInterest = function(id) {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'connect/send?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + id
            }).then(function successCallback(response) {
                console.log(response)
                $scope.message = "send interest successfully";
                $timeout(function() { $scope.message = '';}, 2000);


            }, function errorCallback(response) {
                console.log(response)
                if (response.data.code == '400') {
                    $scope.message = "Already send a Interest";
                }
                $timeout(function() { $scope.message = '';}, 2000);


            });


        }

    }
})();
