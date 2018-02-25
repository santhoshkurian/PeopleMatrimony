(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('AwaitingController', AwaitingController);

    /** @ngInject */
    function AwaitingController($http,$state,resourceUrl,$stateParams,$uibModal,storageService,$scope,awaitingReply) {
        var vm = this;
        $scope.type = "sent";

        $scope.awaiting = awaitingReply.list;
        console.log("awaiting reply",$scope.awaiting);

        $scope.viewProfile = viewProfile;
        function viewProfile(id){
            $state.go('viewProfile',{view_id:id});
        }

        $scope.sendRespond = sendRespond;

        function sendRespond(obj){
            console.log(obj);
            if(obj.type == 'interest'){
                sendInterest(obj.partner);
            }
            if(obj.type == 'mail') {
                sendMail(obj.partner)
            }
            if(obj.type == 'callnow') {
                sendMail(obj.partner)
            }
        }

        $scope.sendMail = sendMail;

        function sendMail(obj){
            $scope.details = {id: obj.id_people, name: obj.name, img: obj.images, header: 'Feature Not Implemented'}
            $scope.open();
        };


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

        $scope.sendInterest = sendInterest;

        function sendInterest(obj) {
            $scope.details = {id:obj.id_people,name:obj.name,img:obj.images};

            $http({
                method: 'GET',
                url: resourceUrl.url()+'connect/send?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + obj.id_people
            }).then(function successCallback(response) {
                console.log(response)
                $scope.open();
                if(response.data.code == '400'){
                    $scope.details.header = 'Already send an interest';

                }else{
                    $scope.details.header = 'Interest Sent Successfully';
                    $scope.showMessage=true;
                    $scope.showAction=false;

                }
                $timeout(function() {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }, 2000);

            }, function errorCallback(response) {
                console.log(response)



            });


        }

        $scope.open = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'pendingModalContent.html',
                controller: 'pendingModalController',
                controllerAs: '$ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return $scope.details;
                    }
                }
            });
        }



    }
})();