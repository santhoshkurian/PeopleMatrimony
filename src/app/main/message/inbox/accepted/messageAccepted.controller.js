(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessageAcceptedController', MessageAcceptedController);

    /** @ngInject */
    function MessageAcceptedController($scope,accept,storageService) {
        var vm = this;
        $scope.accept = accept.list;
        $scope.deleteAccept = deleteAccept;

        function deleteAccept(comId) {
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/inbox/delete?' +
                '&token=' + storageService.get("token") + '&type=accepted' + '&com_id=' + comId
            }).then(function successCallback(response) {
                $http({
                    method: 'GET',
                    url: 'http://devapi.peoplematrimony.com/inbox?' +
                    '&token=' + storageService.get("token") + '&type=declined'
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