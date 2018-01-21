(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ViewProfileController', ViewProfileController)
        .controller('modalController', modalController)
        .controller('enlargePhotoController', enlargePhotoController);

    /** @ngInject */
    function ViewProfileController(similarProfiles,$scope,$http,$uibModal,storageService,$state,$stateParams,resourceUrl,viewProfile,$timeout) {

        console.log("check", viewProfile);
        console.log("check", similarProfiles);
        $scope.drinkingReq = false;
        $scope.smokingReq = false;
        $scope.educationReq = false;
        $scope.occupationReq = false;
        $scope.incomeReq = false;
        $scope.originReq = false;
        $scope.familyReq = false;
        $scope.family_statusReq = false;
        $scope.about_familyReq = false;
        $scope.photo_reqReq = false;
        $scope.similarProfiles = similarProfiles;

        $scope.print = print;
        function print(){
            window.print();
        }
        $scope.logout = logout;
        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token",'');
                storageService.set("id",'');
                storageService.set("image_url",'');
                storageService.set("name",'');
                storageService.set("package",'');
                storageService.set("regular_search",'');
                $state.go('login');

            }, function errorCallback(response) {

            });
        }

        console.log($scope.drinkingReq);
        console.log($scope.smokingReq);

        $scope.percentage = 0;
        $scope.viewProfile = true;
        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.viewType = 'personal';
        $scope.showInterestAction = true;
        $scope.showBlockAction = false;
        $scope.showMessage = false;
        $scope.selectType = selectType;
        $scope.enlargePhoto = enlargePhoto;
        $scope.skipInterestAction = skipInterestAction;
        $scope.skipBlockAction = skipBlockAction;
        $scope.partnerImageUrl = "";

        function skipInterestAction() {
            $scope.showInterestAction = false;
            $scope.showBlockAction = true;
        }

        function skipBlockAction() {
            $scope.showBlockAction = false;
        }


        function selectType(type) {
            $scope.viewType = type;
        }

        if (!viewProfile.error) {
            viewProfile.communication.sent.filter(function(a){
                console.log(a);
                if(a.field_name == 'drinking'){
                    $scope.drinkingReq = true;
                }
                if(a.field_name == 'smoking'){
                    $scope.smokingReq = true;
                }
                if(a.field_name == 'education'){
                    $scope.educationReq = true;
                }
                if(a.field_name == 'income'){
                    $scope.incomeReq = true;
                }
                if(a.field_name == 'occupation'){
                    $scope.occupationReq = true;
                }
                if(a.field_name == 'origin'){
                    $scope.originReq = true;
                }
                if(a.field_name == 'family'){
                    $scope.familyReq = true;
                }
                if(a.field_name == 'family_status'){
                    $scope.family_statusReq = true;
                }
                if(a.field_name == 'about_family'){
                    $scope.about_familyReq = true;
                }
                if(a.field_name == 'photo_request'){
                    $scope.photo_reqReq = true;
                }
            });

        $scope.view = viewProfile.user;
        $scope.pref = viewProfile.user.preferences;
            $scope.enlarge = {name:$scope.view.name,id:$scope.view.id_people}

        }else{
            $scope.viewProfile = false;
        }


        function enlargePhoto(obj1){
            $scope.enlarge.partnerImageUrl = obj1
            $scope.enlargeOpen();

        }
        $scope.sendInterest = sendInterest;
        $scope.shortlist = shortlist;

        function sendInterest() {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'connect/send?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + $scope.view.id_people
            }).then(function successCallback(response) {
                console.log(response)
                $scope.message = "send interest successfully";
                $scope.showMessage=true;
                $scope.showAction=false;

                $timeout(function() { $scope.message = ''; $scope.showMessage=false;

                }, 2000);


            }, function errorCallback(response) {
                console.log(response)
                if (response.data.code == '400') {
                    $scope.showMessage=true;

                    $scope.message = "Already send a Interest";
                    $scope.showAction=false;

                }
                $timeout(function() { $scope.message = ''; $scope.showMessage=false;

                }, 2000);

            });


        }

        function shortlist() {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'do/shortlist?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + $scope.view.id_people
            }).then(function successCallback(response) {
                console.log(response)
                $scope.message = "Successfully Shortlisted";

            }, function errorCallback(response) {
                console.log(response)
                if (response.data.message == 'Already exists') {
                    $scope.message = "Already Shortlisted";
                }

            });


        }
        $scope.basicRequest = '';
        $scope.professionRequest = '';
        $scope.familyRequest = '';
        $scope.aboutFamilyRequest = '';

        $scope.details = {id:$scope.view.id_people,name:$scope.view.name,img:$scope.view.images};

        $scope.requests = function(obj1,obj2){
            $scope.details.field = obj1;



            $http({
                method: 'GET',
                url: resourceUrl.url()+'add/field?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + $scope.view.id_people+'&field='+obj1
            }).then(function successCallback(response) {
                console.log(response)
                $scope.open();
                //$scope.details.field = obj1;
                //$scope[obj2] = 'Request send successfully';
                $scope.details.header = 'Request send successfully';

                $timeout(function() { $scope[obj2] = '';
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }, 2000);

                //$scope.message = "Successfully Shortlisted";

            }, function errorCallback(response) {
                console.log(response)
                if (response.data.message == 'Already exists') {
                    //$scope.message = "Already Shortlisted";
                }

            });

            //devapi.peoplematrimony.com/add/field?p_debug=1&partner=PM123456&id=PM607823&field=family;

        }

        $scope.blockPartner = blockPartner;

        function blockPartner(){
            console.log("block user");
            $http({
                method: 'GET',
                url: resourceUrl.url()+'do/block?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + $scope.view.id_people
            }).then(function successCallback(response) {
                console.log(response);
                $scope.open();
                if(response.data.message == 'Already exists'){
                    $scope.details.header = 'Already Blocked this user';

                }else{
                    $scope.details.header = 'User Blocked Successfully';

                }
                $scope.showBlockAction = false;

                //
                //$scope.message = "Successfully Shortlisted";

            }, function errorCallback(response) {
                console.log(response)
                if (response.data.message == 'Already exists') {
                    $scope.message = "Already Shortlisted";
                }

            });
        }



        $scope.animationsEnabled = true;

        $scope.open = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'modalController',
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

        $scope.enlargeOpen = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'enlargePhoto.html',
                controller: 'enlargePhotoController',
                controllerAs: '$ctrl',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return $scope.enlarge;
                    }
                }
            });
        }







    }

    function modalController($uibModalInstance, items,$state){
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

    function enlargePhotoController($uibModalInstance, items){
        var $ctrl = this;
        $ctrl.items = items;


        $ctrl.viewImg = items.partnerImageUrl[0].image;
        //$ctrl.selected = {
        //    item: $ctrl.items[0]
        //};

        $ctrl.vieImg = function (obj) {
            $ctrl.viewImg = obj;
        };
        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();