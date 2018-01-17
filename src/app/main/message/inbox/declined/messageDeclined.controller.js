(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessageDeclinedController', MessageDeclinedController);

    /** @ngInject */
    function MessageDeclinedController(declined,$scope,storageService,resourceUrl) {
        var vm = this;
        $scope.declined = declined.list;
        console.log("MessageDeclinedController");
        console.log($scope.declined);
        $scope.deleteDeclined = deleteDeclined;

        function deleteDeclined(comId) {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'inbox/delete?' +
                '&token=' + storageService.get("token") + '&type=declined' + '&com_id=' + comId
            }).then(function successCallback(response) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url()+'inbox?' +
                    '&token=' + storageService.get("token") + '&type=declined'
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.declined = response.data.list;

                }, function errorCallback(response) {
                    console.log(response)
                });
            }, function errorCallback(response) {
                console.log(response)
            });
        }

    }
})();