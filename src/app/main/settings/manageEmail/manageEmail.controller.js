(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ManageEmailController', ManageEmailController);

    /** @ngInject */
    function ManageEmailController(resourceUrl,alert,$scope,$http,storageService) {
        var vm = this;
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        console.log(alert);
        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");
        $scope.alert = alert;
        $scope.updateAlert = updateAlert;
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
