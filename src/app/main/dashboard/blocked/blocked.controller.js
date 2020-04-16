(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('BlockedController', BlockedController);

    /** @ngInject */
    function BlockedController(storageService,$scope,blocked) {
        var vm = this;
        console.log(blocked);
        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.blocked = blocked;

        $scope.logout = logout;
        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token",'');
                storageService.set("id",'');
                storageService.set("image_url",'');
                storageService.set("name",'');
                storageService.set("package",'');
                storageService.set("regular_search",'');
                $state.go('login');

            }, function errorCallback(response) {

            });
        }
    }
})();