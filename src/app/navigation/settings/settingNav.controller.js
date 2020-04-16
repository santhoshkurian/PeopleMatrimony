(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SettingsNavController', SettingsNavController);

    /** @ngInject */
    function SettingsNavController($scope, $location,storageService,$state,$http,resourceUrl) {
        $scope.logout = logout;

        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");

        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.clear();
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