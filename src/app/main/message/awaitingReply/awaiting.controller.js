(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('AwaitingController', AwaitingController);

    /** @ngInject */
    function AwaitingController($http,storageService,$scope) {
        var vm = this;
        $scope.awaiting = [];
        console.log("AwaitingController");
        $http({
            method: 'GET',
            url: 'http://devapi.peoplematrimony.com/inbox?' +
            '&token=' + storageService.get("token") + '&type=awaiting_reply'
        }).then(function successCallback(response) {
            console.log(response)
            $scope.awaiting = response.data.list;

        }, function errorCallback(response) {
            console.log(response)


        });



    }
})();