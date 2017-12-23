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
