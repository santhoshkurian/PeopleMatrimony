(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ContactFiltersController', ContactFiltersController);

    /** @ngInject */
    function ContactFiltersController(resourceUrl,contact,$scope,$http,storageService) {
        var vm = this;
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        $scope.contact= contact;
        $scope.updateContact = updateContact;

        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");

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


        function updateContact(obj){
            $http({
                method: 'POST',
                url: resourceUrl.url()+'settings/contact?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&contact='+obj
            }).then(function successCallback(response) {
            }, function errorCallback(response) {


            });
        }

    }
})();
