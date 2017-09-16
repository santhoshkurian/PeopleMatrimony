(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SentController', SentController);

    /** @ngInject */
    function SentController($http,storageService,$scope) {
        var vm = this;
        $scope.sent_all = [];
        console.log("SentController102");
        $http({
            method: 'GET',
            url: 'http://devapi.peoplematrimony.com/inbox?' +
            '&token=' + storageService.get("token") + '&type=all_sent'
        }).then(function successCallback(response) {
            console.log(response)
            $scope.sent_all = response.data.list;

        }, function errorCallback(response) {
            console.log(response)


        });



    }
})();