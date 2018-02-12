(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SentController', SentController);

    /** @ngInject */
    function SentController($http,$state,storageService,$scope,sent) {
        var vm = this;
        $scope.type = "sent";

        $scope.sent_all = sent.list;
        console.log($scope.sent_all);
        $scope.viewProfile = viewProfile;
        function viewProfile(id){
            $state.go('viewProfile',{view_id:id});
        }
        $scope.deleteSent = deleteSent;
           function deleteSent(comId,resourceUrl){
            console.log(comId);
            $http({
                method: 'GET',
                url: resourceUrl.url()+'inbox/delete?' +
                'token=' + storageService.get("token") + '&type=sent'+'&com_id='+comId
            }).then(function successCallback(response) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url()+'inbox?' +
                    '&token=' + storageService.get("token") + '&type=all_sent'
                }).then(function successCallback(response) {
                    $scope.sent_all = response.data.list;
                }, function errorCallback(response) {
                });
            }, function errorCallback(response) {
                console.log(response)
            });
        }





    }
})();