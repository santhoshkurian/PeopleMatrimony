(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SentController', SentController);

    /** @ngInject */
    function SentController($http,$state,storageService,$scope,$timeout,resourceUrl,$stateParams,sent,$uibModal) {
        var vm = this;
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        $scope.type = "sent";

        $scope.sent_all = sent.list;
        console.log($scope.sent_all);
        $scope.viewProfile = viewProfile;
        function viewProfile(id){
            $state.go('viewProfile',{view_id:id});
        }

        $scope.sendRespond = sendRespond;
        $scope.moreConversation = moreConversation;

        function moreConversation(id){
            var url = $state.href('messages.communication', {id: id,page:"sent"});
            window.open(url,'_blank');
        }

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

        $scope.countConversation = function(obj){
            console.log("conversation",obj);
            //return obj.split(',').join(", ")
            $scope.commulen = obj.communication.received.length + obj.communication.sent.length;

            return $scope.commulen;
        }

        $scope.sendMail = sendMail;

        function sendMail(obj){
            $scope.details = {id: obj.id_people, name: obj.name, img: obj.images, header: 'Feature Not Implemented'}
            $scope.open();
        };
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
})();