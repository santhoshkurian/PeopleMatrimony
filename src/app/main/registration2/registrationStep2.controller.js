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
        if(storageService.get('token') == '' && storageService.get('id') == ''){
            $state.go('login')

        }

        $scope.memberId = storageService.get('id');
        $scope.userPin = null;
        $scope.message = null;

        $scope.resend = function(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'pin/'+$scope.memberId
            }).then(function successCallback(response) {
                console.log(response)
            }, function errorCallback(response) {

            });
        };

        $scope.pinVerify = function(){
            if($scope.userPin != null && $scope.userPin != '') {
                $http({
                    method: 'POST',
                    url: resourceUrl.url() + 'user?step=3&' +
                    'id_people=' + $scope.memberId + '&' +
                    'token=' + storageService.get('token') +
                    '&user_pin=' + $scope.userPin
                }).then(function successCallback(response) {
                    console.log(response);
                    storageService.set("token", '');
                    storageService.set("id", '');
                    storageService.set("image_url", '');
                    storageService.set("name", '');
                    storageService.set("package", '');
                    storageService.set("regular_search", '');
                    $state.go('login')
                }, function errorCallback(response) {
                    console.log(response)

                    $scope.message = "Invalid Pin";
                    $timeout(function () {
                        $scope.message = '';
                    }, 2000);


                });
            }else{
                $scope.message = 'Invalid PIN';
            }


        };

    }

    //}
   })();