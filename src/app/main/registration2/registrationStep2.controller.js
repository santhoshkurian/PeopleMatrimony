(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('RegistrationStep2Controller', RegistrationStep2Controller);

    /** @ngInject */
    function RegistrationStep2Controller($timeout,resourceUrl,storageService,$scope,$http,$state) {
        //var vm = this;
        console.log("RegistrationStep2Controller");
        console.log(storageService.get('id'));

        $scope.memberId = storageService.get('id');
        $scope.userPin = null;
        $scope.message = null;

        $scope.resend = function(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'pin/'+$scope.memberId
            }).then(function successCallback(response) {
                console.log(response)
                $state.go('login')
            }, function errorCallback(response) {

            });
        };

        $scope.pinVerify = function(){

            $http({
                method: 'POST',
                url: resourceUrl.url()+'user?step=3&' +
                'id_people='+$scope.memberId+'&' +
                'token='+storageService.get('token')+
                    '&user_pin='+$scope.userPin
            }).then(function successCallback(response) {
                console.log(response)
                $state.go('login')
            }, function errorCallback(response) {
                console.log(response)

                $scope.message = "Invalid Pin";
                $timeout(function() { $scope.message = '';}, 2000);


            });


        };

    }

    //}
   })();