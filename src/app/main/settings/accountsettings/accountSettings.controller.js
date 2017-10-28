(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('AccountSettingsController', AccountSettingsController);

    /** @ngInject */
    function AccountSettingsController(account,$scope,storageService,$state,$http,$stateParams) {
        console.log(account)
        $scope.email = account.email;

        $scope.changeEmail = changeEmail;

        function changeEmail(){
            $http({
                method: 'POST',
                url: 'http://devapi.peoplematrimony.com/user/contact?' +
                'token=' +storageService.get('token')+
                '&id_people=' +storageService.get('id')+
                '&type=email&' +
                'email='+$scope.email

            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }, function errorCallback(response) {
                console.log("error",response)

            });
        }




            }
})();
