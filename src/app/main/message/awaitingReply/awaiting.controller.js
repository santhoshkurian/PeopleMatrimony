(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('AwaitingController', AwaitingController);

    /** @ngInject */
    function AwaitingController($http,storageService,$scope) {
        var vm = this;
        $scope.awaiting = [];
        $scope.deleteAwaiting = deleteAwaiting;
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


        function deleteAwaiting(comId) {
            console.log(comId);
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/inbox/delete?' +
                '&token=' + storageService.get("token") + '&type=awaiting_reply' + '&com_id=' + comId
            }).then(function successCallback(response) {
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
            }, function errorCallback(response) {
                console.log(response)
            });
        }



    }
})();