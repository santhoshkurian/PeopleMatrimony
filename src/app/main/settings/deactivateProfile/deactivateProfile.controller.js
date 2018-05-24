(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('DeactivateProfileController', DeactivateProfileController);

    /** @ngInject */
    function DeactivateProfileController(resourceUrl,$state,deactivate,$stateParams,$scope,$http,storageService) {
        var vm = this;
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        console.log(deactivate);
        $scope.activate = true;
        $scope.deactivate = deactivate.duration;
        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");

        if($scope.deactivate == 0){
            $scope.activate = false;
        }
        $scope.deactivateMsg = null;
        $scope.deactivateProfile = deactivateProfile;
        $scope.logout = logout;
        $scope.activateProfile = activateProfile;
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
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
                $scope.deactivateMsg = 'Deactivated Successfully';
            }, function errorCallback(response) {


            });
        }
        console.log("DeactivateProfileController");

        function activateProfile(){
            console.log($scope.deactivate);
            $http({
                method: 'POST',
                url: resourceUrl.url()+'settings/profile?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&type=activate'
            }).then(function successCallback(response) {
                $scope.deactivateMsg = 'Activated Successfully';
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }, function errorCallback(response) {


            });
        }
        console.log("DeactivateProfileController");

    }
})();
