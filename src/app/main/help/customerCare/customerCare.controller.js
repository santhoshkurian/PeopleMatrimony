(function()
{
    'use strict';

    angular
        .module('dashboard')
        .controller('customerCareController', customerCareController);

    /** @ngInject */
    function customerCareController($http,$scope,storageService,resourceUrl)
    {

        console.log("customerCareController");

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
