(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessagePendingController', MessagePendingController);

    /** @ngInject */
    function MessagePendingController(pending,$state,$scope,$http,resourceUrl,storageService) {
        var vm = this;
        $scope.pending = pending.list;
        console.log($scope.pending);

        $scope.viewProfile = viewProfile;
        function viewProfile(id){
            $state.go('viewProfile',{view_id:id});
        }

        $scope.deletePending = deletePending;
        $scope.respondAction = respondAction;

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
                    $scope.pending = response.data.list;

                }, function errorCallback(response) {
                    console.log(response)
                });
            }, function errorCallback(response) {
                console.log(response)
            });
        }

        function respondAction(comId,action) {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'response/'+action+'/'+comId +
                '?&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                    console.log(response);
                $http({
                    method: 'GET',
                    url: resourceUrl.url()+'inbox?' +
                    '&token=' + storageService.get("token") + '&type=pending'
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.pending = response.data.list;

                }, function errorCallback(response) {
                    console.log(response)
                });
            }, function errorCallback(response) {
                console.log(response)
            });
        }
    }
})();