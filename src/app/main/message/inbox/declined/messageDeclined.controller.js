(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessageDeclinedController', MessageDeclinedController);

    /** @ngInject */
    function MessageDeclinedController($state,declined,$scope,storageService,resourceUrl) {
        var vm = this;
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        $scope.declined = declined.list;
        $scope.type = "declined";

        console.log("MessageDeclinedController");
        console.log($scope.declined);

        $scope.viewProfile = viewProfile;
        function viewProfile(id){
            $state.go('viewProfile',{view_id:id});
        }

        $scope.moreConversation = moreConversation;

        function moreConversation(id){
            var url = $state.href('messages.communication', {id: id,page:"pending"});
            window.open(url,'_blank');
        }



        $scope.countConversation = function(obj){
            console.log("conversation",obj);
            //return obj.split(',').join(", ")
            $scope.commulen = obj.communication.received.length + obj.communication.sent.length;

            return $scope.commulen;
        }

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