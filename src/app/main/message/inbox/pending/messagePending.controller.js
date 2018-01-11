(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessagePendingController', MessagePendingController);

    /** @ngInject */
    function MessagePendingController(pending,$scope,$http,resourceUrl,storageService) {
        var vm = this;
        $scope.pending = pending.list;
        console.log($scope.pending);

        $scope.deletePending = deletePending;

        function deletePending(comId) {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'inbox/delete?' +
                '&token=' + storageService.get("token") + '&type=pending' + '&com_id=' + comId
            }).then(function successCallback(response) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url()+'inbox?' +
                    '&token=' + storageService.get("token") + '&type=pending'
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