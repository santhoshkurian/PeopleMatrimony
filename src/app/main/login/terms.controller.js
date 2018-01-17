(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('TermsController', TermsController);

    /** @ngInject */
    function TermsController(storageService, $scope,resourceUrl,$http,$state) {
        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        $scope.showLink = false;
        if(storageService.get('id') != null && storageService.get('token') != null){
            $scope.showLink = true;

        }

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


    };

})();