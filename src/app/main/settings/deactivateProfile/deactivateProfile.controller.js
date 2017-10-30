(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('DeactivateProfileController', DeactivateProfileController);

    /** @ngInject */
    function DeactivateProfileController(deactivate,$scope,$http,storageService) {
        var vm = this;
        console.log(deactivate);
        $scope.deactivate = deactivate.duration;
        $scope.deactivateMsg = null;
        $scope.deactivateProfile = deactivateProfile;

        function deactivateProfile(){
            console.log($scope.deactivate);
            $http({
                method: 'POST',
                url: 'http://devapi.peoplematrimony.com/settings/profile?' +
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
