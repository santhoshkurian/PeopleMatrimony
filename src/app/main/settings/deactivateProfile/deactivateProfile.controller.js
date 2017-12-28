(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('DeactivateProfileController', DeactivateProfileController);

    /** @ngInject */
    function DeactivateProfileController(resourceUrl,deactivate,$scope,$http,storageService) {
        var vm = this;
        console.log(deactivate);
        $scope.deactivate = deactivate.duration;
        $scope.deactivateMsg = null;
        $scope.deactivateProfile = deactivateProfile;
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

        function deactivateProfile(){
            console.log($scope.deactivate);
            $http({
                method: 'POST',
                url: resourceUrl.url()+'settings/profile?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&duration='+$scope.deactivate
            }).then(function successCallback(response) {
                $scope.deactivateMsg = 'Deactivated Successfully';
            }, function errorCallback(response) {


            });
        }
        console.log("DeactivateProfileController");

    }
})();
