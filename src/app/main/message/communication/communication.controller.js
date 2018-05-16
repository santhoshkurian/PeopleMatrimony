(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('CommunicationController', CommunicationController);

    /** @ngInject */
    function CommunicationController($http,$state,storageService,$scope,$timeout,resourceUrl,$stateParams,viewProfile,$uibModal) {
        $('html, body').animate({ scrollTop: 0 }, 'fast');

       console.log(viewProfile);
       console.log("page",$stateParams.page);
        $scope.view=viewProfile;
        console.log(viewProfile)
        $scope.details = {id: $scope.view.user.id_people, name: $scope.view.user.name, img: $scope.view.user.images};

        $scope.sendMail = sendMail;

        $scope.pageType = $stateParams.page;


        $scope.requestDeclined = requestDeclined;
        function requestDeclined(obj){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'response/declined/'+obj.com_id +
                '?&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                console.log(response);
                $scope.open();
                if(response.data.code == '400'){

                    $scope.details.header = 'Request Rejected Successfully';

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

        $scope.viewProfileSection = viewProfileSection;
        function viewProfileSection(id) {
            console.log(id)
            $state.go('viewProfile', {view_id: id});
        }

        $scope.respondAction = respondAction;

        function respondAction(obj) {

            console.log(obj);
            if(obj.action == 'field'){
                if(obj.field_name == 'family'){
                    if($scope.view.user.family_type == '' || $scope.view.user.family_type == null){
                        $state.go('profile',{type:"add_family"});
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'smoking'){
                    if($scope.view.user.smoking_habit == '' || $scope.view.user.smoking_habit == null){
                        $state.go('profile',{type:"add_smoking"});
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'drinking'){
                    if($scope.view.user.drinking_habit == '' || $scope.view.user.drinking_habit == null){
                        $state.go('profile',{type:"add_drinking"});
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'income'){
                    if($scope.view.user.income == '' || $scope.view.user.income == null){
                        $state.go('profile',{type:"add_income"});
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'occupation'){
                    if($scope.view.user.occupation == '' || $scope.view.user.occupation == null){
                        $state.go('profile',{type:"add_occupation"});
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'family'){
                    if($scope.view.user.family_type == '' || $scope.view.user.family_type == null){
                        $state.go('profile',{type:"add_family"});
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'family_status'){
                    if($scope.view.user.family_status == '' || $scope.view.user.family_status == null){
                        $state.go('profile',{type:"add_family_status"});
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'origin'){
                    if($scope.view.user.ancestral_origin == '' || $scope.view.user.ancestral_origin == null){
                        $state.go('profile',{type:"add_origin"});
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'about_family'){
                    if($scope.view.user.about_family == '' || $scope.view.user.about_family == null){
                        $state.go('profile',{type:"add_about_family"});
                    }else{
                        $scope.acceptRequest(obj);
                    }

                }
                if(obj.field_name == 'photo_request'){
                    if($scope.view.user.images.length == 0){
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
                if(response.data.code == '400'){
                    $scope.details.header = 'Request Accepted Successfully';

                }
                $scope.open();
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