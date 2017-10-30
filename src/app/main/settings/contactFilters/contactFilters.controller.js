(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ContactFiltersController', ContactFiltersController);

    /** @ngInject */
    function ContactFiltersController(contact,$scope,$http,storageService) {
        var vm = this;
        $scope.contact= contact;
        $scope.updateContact = updateContact;


        function updateContact(obj){
console.log(obj);
            $http({
                method: 'POST',
                url: 'http://devapi.peoplematrimony.com/settings/contact?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&contact='+obj
            }).then(function successCallback(response) {
            }, function errorCallback(response) {


            });
        }

    }
})();
