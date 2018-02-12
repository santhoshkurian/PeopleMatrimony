(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('AwaitingController', AwaitingController);

    /** @ngInject */
    function AwaitingController($http,$state,resourceUrl,storageService,$scope,awaitingReply) {
        var vm = this;
        $scope.type = "sent";

        $scope.awaiting = awaitingReply.list;
        console.log("awaiting reply",$scope.awaiting);

        $scope.viewProfile = viewProfile;
        function viewProfile(id){
            $state.go('viewProfile',{view_id:id});
        }

        $scope.deleteAwaiting = deleteAwaiting;

                function deleteAwaiting(comId) {
            console.log(comId);
            $http({
                method: 'GET',
                url: resourceUrl.url()+'inbox/delete?' +
                'token=' + storageService.get("token") + '&type=awaiting_reply' + '&com_id=' + comId
            }).then(function successCallback(response) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url()+'inbox?' +
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