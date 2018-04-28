(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessagePendingController', MessagePendingController)
        .controller('pendingModalController', pendingModalController)
        .controller('addDetailsController', addDetailsController);

    /** @ngInject */
    function MessagePendingController(pending, $state, $scope, profile,$http, $timeout, $stateParams, $uibModal, resourceUrl, storageService) {
        var vm = this;
        $scope.pending = pending.list;
        $scope.type = "accept";

        console.log("pending",$scope.pending);
        console.log("profile",profile);

        $scope.viewProfile = viewProfile;
        function viewProfile(id) {
            $state.go('viewProfile', {view_id: id});
        }

        $scope.countConversation = function(obj){
            console.log("conversation",obj);
            //return obj.split(',').join(", ")
            $scope.commulen = obj.communication.received.length + obj.communication.sent.length;

            return $scope.commulen;
        }


        $scope.moreConversation = moreConversation;

        function moreConversation(id){
            var url = $state.href('messages.communication', {id: id,page:"pending"});
            window.open(url,'_blank');
        }

        $scope.sendRespond = sendRespond;

        function sendRespond(obj) {
            console.log(obj);
            if (obj.type == 'interest') {
                sendInterest(obj.partner);
            }
            if (obj.type == 'mail') {
                sendMail(obj.partner)
            }
            if (obj.type == 'callnow') {
                sendMail(obj.partner)
            }
        }

        $scope.sendMail = sendMail;

        function sendMail(obj) {
            $scope.details = {id: obj.id_people, name: obj.name, img: obj.images, header: 'Feature Not Implemented'}
            $scope.open();
        };

        $scope.deletePending = deletePending;

        function deletePending(comId) {
            $http({
                method: 'GET',
                url: resourceUrl.url() + 'inbox/delete?' +
                '&token=' + storageService.get("token") + '&type=pending' + '&com_id=' + comId
            }).then(function successCallback(response) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url() + 'inbox?' +
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

        function respondAction(obj, action) {
            $scope.details = {id:obj.user.id_people,name:obj.user.name,img:obj.user.images};
            //$scope.addDetails = {partner:obj,user:profile};

            //$scope.addDetailsModal();

            console.log(obj);
            if(obj.action == 'field'){
                if(obj.field_name == 'family'){
                    if(profile.user.family_type == '' || profile.user.family_type == null){
                        $state.go('profile');
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'smoking'){
                    if(profile.user.smoking_habit == '' || profile.user.smoking_habit == null){
                        $state.go('profile');
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'drinking'){
                    if(profile.user.drinking_habit == '' || profile.user.drinking_habit == null){
                        $state.go('profile');
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'income'){
                    if(profile.user.income == '' || profile.user.income == null){
                        $state.go('profile');
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'occupation'){
                    if(profile.user.occupation == '' || profile.user.occupation == null){
                        $state.go('profile');
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'family'){
                    if(profile.user.family_type == '' || profile.user.family_type == null){
                        $state.go('profile');
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'family_status'){
                    if(profile.user.family_status == '' || profile.user.family_status == null){
                        $state.go('profile');
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'origin'){
                    if(profile.user.ancestral_origin == '' || profile.user.ancestral_origin == null){
                        $state.go('profile');
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'about_family'){
                    if(profile.user.about_family == '' || profile.user.about_family == null){
                        $state.go('profile');
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'photo_request'){
                    if(profile.user.images.length == 0){
                        $state.go('managephoto');
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }

            }

        }

        $scope.acceptRequest = acceptRequest;
        function acceptRequest(obj){

            $http({
                method: 'GET',
                url: resourceUrl.url()+'response/accepted/'+obj.com_id +
                '?&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                    console.log(response);
                $scope.open();
                if(response.data.code == '400'){

                        $scope.details.header = 'Request Accepted Successfully';

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
            $scope.details = {id: obj.id_people, name: obj.name, img: obj.images};

            $http({
                method: 'GET',
                url: resourceUrl.url() + 'connect/send?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + obj.id_people
            }).then(function successCallback(response) {
                console.log(response)
                $scope.open();
                if (response.data.code == '400') {
                    $scope.details.header = 'Already send an interest';

                } else {
                    $scope.details.header = 'Interest Sent Successfully';
                    $scope.showMessage = true;
                    $scope.showAction = false;

                }
                $timeout(function () {
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

        $scope.addDetailsModal = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'addDetails.html',
                controller: 'addDetailsController',
                controllerAs: '$ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return $scope.addDetails;
                    }
                }
            });
        }

    }

    function pendingModalController(items, $uibModalInstance) {
        var $ctrl = this;
        $ctrl.items = items;
        console.log("cheeeeeeeeeeeeeeeek", $ctrl.items);
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

    function addDetailsController(items, $uibModalInstance, $http,$scope,resourceUrl,storageService) {
        var $ctrl = this;
        console.log(items);
        $ctrl.items = {
            id: items.partner.user.id_people, name: items.partner.user.name,
            img: items.partner.user.images
        };
        $scope.showFamilyType = false;
        $scope.showDrinking = false;
        $scope.showSmoking = false;
        $scope.showEating = false;

        if (items.partner.field_name == 'family') {
            if (items.user.family_type == '' || items.user.family_type == null) {
                $ctrl.items.header = 'Add Family Type'
                $scope.showFamilyType = true;
            } else {
                $ctrl.items.header = 'Family Type Already added';
                $scope.accepted();
            }
        }

        if (items.field_name == 'drinking') {
            if (items.user.user.drinking_habit == '' || items.user.user.drinking_habit == null) {
                $ctrl.items.header = 'Add Drinking Details'
                $scope.showDrinking = true;
            } else {
                $ctrl.items.header = 'Details Already added';
                //$scope.accepted();
            }
        }
        if (items.partner.field_name == 'smoking') {
            if (items.user.user.smoking_habit == '' || items.user.user.smoking_habit == null) {
                $ctrl.items.header = 'Add Smoking Details'
                $scope.showSmoking = true;
            } else {
                //$ctrl.items.partner.header = 'Details Already added';
                //$scope.accepted();
            }
        }
        if (items.partner.field_name == 'eating') {
            if (items.user.user.smoking_habit == '' || items.user.user.smoking_habit == null) {
                $ctrl.items.header = 'Add Smoking Details'
                $scope.showSmoking = true;
            } else {
                $ctrl.items.header = 'Details Already added';
                $scope.accepted();
            }
        }

        $scope.addDetails = function(){
            console.log("check");

        }



        $scope.accepted = function(){
            var action = "accepted";
            $http({
                method: 'GET',
                url: resourceUrl.url()+'response/'+action+'/'+items.com_id +
                '?&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                console.log(response);

                $scope.items.message = 'Request Accepted Successfully';

            }, function errorCallback(response) {
                console.log(response)
            });
        }

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