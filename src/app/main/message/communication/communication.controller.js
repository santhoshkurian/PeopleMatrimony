(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('CommunicationController', CommunicationController);

    /** @ngInject */
    function CommunicationController($http,$state,storageService,$scope,$timeout,resourceUrl,$stateParams,viewProfile,$uibModal) {

       console.log(viewProfile);
        $scope.view=viewProfile;
        $scope.sendMail = sendMail;

        $scope.res='sent';
        $scope.sendRespond=sendRespond;

        function sendRespond(obj){
            console.log(obj);
            if(obj == 'interest'){
                sendInterest(obj.partner);
            }
            if(obj == 'mail') {
                sendMail()
            }
            if(obj == 'callnow') {
                sendMail()
            }
        }


        function sendMail(){
            $scope.details = {id:$scope.view.user.id_people,name:$scope.view.user.name,img:$scope.view.user.images, header: 'Feature Not Implemented'};
            $scope.open();
        };



        $scope.sendInterest = sendInterest;

        function sendInterest(obj) {
            $scope.details = {id:$scope.view.user.id_people,
                name:$scope.view.user.name,img:$scope.view.user.images};

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