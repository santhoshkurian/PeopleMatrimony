(function()
{
    'use strict';

    angular
        .module('dashboard')
        .controller('contactUsController', contactUsController);

    /** @ngInject */
    function contactUsController(storageService,$scope,$http,resourceUrl)
    {
        $('html, body').animate({ scrollTop: 0 }, 'fast');


        console.log("contactUsController");
        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");
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
