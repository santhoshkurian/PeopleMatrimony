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
