(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessageAcceptedController', MessageAcceptedController);

    /** @ngInject */
    function MessageAcceptedController($scope,accept,storageService,resourceUrl) {
        var vm = this;
        $scope.accept = accept.list;
        console.log($scope.accept);
        $scope.deleteAccept = deleteAccept;

        function deleteAccept(comId) {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'inbox/delete?' +
                '&token=' + storageService.get("token") + '&type=accepted' + '&com_id=' + comId
            }).then(function successCallback(response) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url()+'inbox?' +
                    '&token=' + storageService.get("token") + '&type=accepted'
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.accept = response.data.list;

                }, function errorCallback(response) {
                    console.log(response)
                });
            }, function errorCallback(response) {
                console.log(response)
            });
        }
    }
})();