(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ContactFiltersController', ContactFiltersController);

    /** @ngInject */
    function ContactFiltersController(resourceUrl,contact,$scope,$http,storageService) {
        var vm = this;
        $scope.contact= contact;
        $scope.updateContact = updateContact;

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
