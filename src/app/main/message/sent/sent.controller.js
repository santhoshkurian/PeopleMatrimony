(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SentController', SentController);

    /** @ngInject */
    function SentController($http,storageService,$scope,sent) {
        var vm = this;
        $scope.sent_all = sent.list;
        $scope.deleteSent = deleteSent;
           function deleteSent(comId){
            console.log(comId);
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/inbox/delete?' +
                '&token=' + storageService.get("token") + '&type=sent'+'&com_id='+comId
            }).then(function successCallback(response) {
                $http({
                    method: 'GET',
                    url: 'http://devapi.peoplematrimony.com/inbox?' +
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