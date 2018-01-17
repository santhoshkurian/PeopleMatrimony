(function()
{
    'use strict';

    angular
        .module('dashboard')
        .controller('busEnqController', busEnqController);

    /** @ngInject */
    function busEnqController($http,$scope,storageService)
    {

        console.log("busEnqController");
        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.logout = logout;
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


    }
})();
