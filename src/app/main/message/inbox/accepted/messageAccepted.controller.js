(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessageAcceptedController', MessageAcceptedController)
        .controller('acceptModalController', acceptModalController);

    /** @ngInject */
    function MessageAcceptedController($state,$scope,$http,$uibModal,$timeout,$stateParams,accept,storageService,resourceUrl) {
        var vm = this;
        $scope.accept = accept.list;
        $scope.type = "accept";
        console.log($scope.accept);

        $scope.viewProfile = viewProfile;
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


        function viewProfile(id){
            $state.go('viewProfile',{view_id:id});
        }
        $scope.deleteAccept = deleteAccept;

        $scope.details = {};

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
                templateUrl: 'acceptModalContent.html',
                controller: 'acceptModalController',
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

function acceptModalController(items,$uibModalInstance){
    var $ctrl = this;
    $ctrl.items = items;
    console.log("cheeeeeeeeeeeeeeeek",$ctrl.items);
    //$ctrl.selected = {
    //    item: $ctrl.items[0]
    //};

    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $ctrl.upgrade = function () {
        $uibModalInstance.dismiss('cancel');
        $state.go('payment')
    };
}
})();