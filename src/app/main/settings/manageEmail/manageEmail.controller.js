(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ManageEmailController', ManageEmailController);

    /** @ngInject */
    function ManageEmailController(resourceUrl,alert,$scope,$http,storageService) {
        var vm = this;
        console.log(alert);
        $scope.alert = alert;
        $scope.updateAlert = updateAlert;

        function updateAlert(obj){
            console.log($scope.alert);
                $scope.passwordMsg= null;

                $http({
                    method: 'POST',
                    url: resourceUrl.url()+'settings/email?' +
                    'token=' +storageService.get('token')+
                    '&id=' +storageService.get('id')+
                    '&'+obj+'='+$scope.alert[obj]
                }).then(function successCallback(response) {
                }, function errorCallback(response) {


                });
            }




    }
})();
