(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SettingsNavController', SettingsNavController);

    /** @ngInject */
    function SettingsNavController($scope, $location,storageService,$state) {
        $scope.logout = logout;

        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        function logout(){
            $http({
                method: 'GET',
                url: 'https://devapi.peoplematrimony.com/user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token",null);
                storageService.set("id",null);
                storageService.set("image_url",null);
                storageService.set("name",null);
                $state.go('login');

            }, function errorCallback(response) {

            });
        }


        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };


        console.log("SettingsNavController");

    }
})();