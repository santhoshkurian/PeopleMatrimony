(function()
{
    'use strict';

    angular
        .module('toolbar')
        .controller('SearchToolbarController', SearchToolbarController);

    /** @ngInject */
    function SearchToolbarController($scope,$location,storageService,$http,$state,resourceUrl)
    {

        $scope.logout = logout;
        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token",null);
                storageService.set("id",null);
                storageService.set("image_url",null);
                storageService.set("name",null);
                storageService.set("regular_search",null);
                $state.go('login');

            }, function errorCallback(response) {

            });
        }
        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        $scope.isActive = function (viewLocation) {
            var ul = $location.path().split('/');
            if(ul.length > 3){
                viewLocation = viewLocation+"/"+ul[3];
            }
            return viewLocation === $location.path();
        };
    }
})();
