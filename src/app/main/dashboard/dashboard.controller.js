(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController($scope, $location,$http,storageService, $state) {

        $scope.logout = logout;


        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        function logout(){
            $http({
                method: 'GET',
                url: 'https://devapi.peoplematrimony.com/user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token",null);
                storageService.set("id",null);
                $state.go('login');

            }, function errorCallback(response) {

            });
        }

        $http({
            method: 'GET',
            url: 'https://devapi.peoplematrimony.com/user/view?' +
            'view_id=' + storageService.get("id") + '&token=' + storageService.get("token")
        }).then(function successCallback(response) {
            console.log(response)
            $scope.profile = response.data;
        }, function errorCallback(response) {
            console.log(response)

        });



        $scope.messages = ["Add carrear details to get more time responses", "Add education details to get more time responses"]
        $scope.messageIndex = 0;
        $scope.loadNextMessage = function () {
            if ($scope.messageIndex < $scope.messages.length - 1) {
                $scope.messageIndex = $scope.messageIndex +1;
            }
        }
        $scope.loadPreviosMessage = function () {
            if ($scope.messageIndex > 0) {
                $scope.messageIndex = $scope.messageIndex -1;
            }
        }
        $scope.isLastMessage =function(){
            if($scope.messageIndex == $scope.messages.length - 1){
                return true;
            }else{
                return false;
            }
        }
        $scope.isFirstMessage =function(){
            if($scope.messageIndex == 0){
                return true;
            }else{
                return false;
            }
        }

        console.log("NavigationController");

    }
})();