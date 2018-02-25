(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessagePendingController', MessagePendingController)
        .controller('pendingModalController', pendingModalController);

    /** @ngInject */
    function MessagePendingController(pending,$state,$scope,$http,$timeout,$stateParams,$uibModal,resourceUrl,storageService) {
        var vm = this;
        $scope.pending = pending.list;
        $scope.type = "sent";

        console.log($scope.pending);

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

        $scope.deletePending = deletePending;

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

        $scope.respondAction = respondAction;

        function respondAction(comId,action,obj) {
            $scope.details = {id:obj.id_people,name:obj.name,img:obj.images};

            $http({
                method: 'GET',
                url: resourceUrl.url()+'response/'+action+'/'+comId +
                '?&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                    console.log(response);
                $scope.open();
                if(response.data.code == '400'){
                    if(action == 'declined'){
                        $scope.details.header = 'Re invalid! . Please try again ';
                    }else{
                        $scope.details.header = 'Request Accepted Successfully';

                    }


                }else{
                    if(action == 'declined'){
                        $scope.details.header = 'Request rejected ';
                    }else{
                        $scope.details.header = 'Request Accepted Successfully';

                    }                    $scope.showMessage=true;
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
    function pendingModalController(items,$uibModalInstance){
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