(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ViewProfileController', ViewProfileController)
        .controller('modalController', modalController)
        .controller('enlargePhotoController', enlargePhotoController)
        .controller('profileBlockedController', profileBlockedController);

    /** @ngInject */
    function ViewProfileController(similarProfiles, $scope, $http, $uibModal, storageService, $state, $stateParams, resourceUrl, viewProfile, $timeout) {
        $('html, body').animate({scrollTop: 0}, 'fast');

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
        $scope.profileAvailableMsg = '';

        $scope.similarProfiles = similarProfiles;

        $scope.print = print;
        function print() {
            window.print();
        }

        $scope.logout = logout;
        function logout() {
            $http({
                method: 'GET',
                url: resourceUrl.url() + 'user/logout?' +
                'id_people=' + storageService.get("id") + '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                storageService.clear();
                $state.go('login');
            }, function errorCallback(response) {

            });
        }

        $scope.percentage = 0;
        $scope.viewProfile = true;
        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.viewType = 'personal';
        $scope.showInterestAction = false;
        $scope.showBlockAction = false;
        $scope.showConversationAction = false;
        $scope.showMessage = false;
        $scope.selectType = selectType;
        $scope.enlargePhoto = enlargePhoto;
        $scope.skipInterestAction = skipInterestAction;
        $scope.partnerImageUrl = "";
        $scope.details = {};


        function skipInterestAction() {
            $scope.showInterestAction = false;
            if ($scope.data.blocked == 'no' && !$scope.showInterestAction) {
                $scope.showBlockAction = true;
            }
            if ($scope.converstionCount > 0 && !$scope.showInterestAction && !$scope.showBlockAction) {
                $scope.showConversationAction = true;
            }
        }

        //function skipBlockAction() {
        //    $scope.showBlockAction = false;
        //    if ($scope.converstionCount > 0 && !$scope.showInterestAction && !$scope.showBlockAction) {
        //        $scope.showConversationAction = true;
        //    }
        //
        //}

        $scope.respondAction = respondAction;

        function respondAction(comId, action, obj) {
            $scope.details = {id: obj.id_people, name: obj.name, img: obj.images};

            $http({
                method: 'GET',
                url: resourceUrl.url() + 'response/' + action + '/' + comId +
                '?&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                console.log(response);
                $scope.open();
                if (response.data.code == '400') {
                    if (action == 'declined') {
                        $scope.details.header = 'Re invalid! . Please try again ';
                    } else {
                        $scope.details.header = 'Request Accepted Successfully';

                    }


                } else {
                    if (action == 'declined') {
                        $scope.details.header = 'Request rejected ';
                    } else {
                        $scope.details.header = 'Request Accepted Successfully';

                    }
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

        $scope.calculateHeight = calculateHeight;

        function calculateHeight(obj) {
            var h;

            if (obj == 137) h = "4ft 6in- 137 cm";

            if (obj == 139) h = "4ft 7in- 139 cm";

            if (obj == 142) h = "4ft 8in- 142 cm";

            if (obj == 144) h = "4ft 9in- 144 cm";

            if (obj == 147) h = "4ft 10in- 147 cm";

            if (obj == 149) h = "4ft 11in- 149 cm";

            if (obj == 152) h = "5ft- 152 cm";

            if (obj == 154) h = "5ft 1in- 154 cm";

            if (obj == 157) h = "5ft 2in- 157 cm";

            if (obj == 160) h = "5ft 3in- 160 cm";

            if (obj == 160) h = "5ft 3in- 160 cm";

            if (obj == 162) h = "5ft 4in- 162 cm";

            if (obj == 165) h = "5ft 5in- 165 cm";

            if (obj == 167) h = "5ft 6in- 167 cm";

            if (obj == 170) h = "5ft 7in- 170 cm";

            if (obj == 172) h = "5ft 8in- 172 cm";

            if (obj == 175) h = "5ft 9in- 175 cm";

            if (obj == 177) h = "5ft 10in- 177 cm";

            if (obj == 180) h = "5ft 11in- 180 cm";

            if (obj == 182) h = "6ft- 182 cm";

            if (obj == 185) h = "6ft 1in- 185 cm";

            if (obj == 187) h = "6ft 2in- 187 cm";

            if (obj == 190) h = "6ft 3in- 190 cm";

            if (obj == 193) h = "6ft 4in- 193 cm";

            if (obj == 193) h = "6ft 4in- 193 cm";

            if (obj == 195) h = "6ft 5in- 195 cm";

            if (obj == 198) h = "6ft 6in- 198 cm";

            if (obj == 200) h = "6ft 7in- 200 cm";

            if (obj == 203) h = "6ft 8in- 203 cm";

            if (obj == 205) h = "6ft 9in- 205 cm";

            if (obj == 208) h = "6ft 10in- 208 cm";

            if (obj == 210) h = "6ft 11in- 210 cm";

            return h;
        }


        function selectType(type) {
            $scope.viewType = type;
        }

        $scope.communication = null;
        $scope.communication_type = null;
        $scope.converstionCount = 0;

        if (!viewProfile.error) {
            viewProfile.communication.sent.filter(function (a) {
                console.log(a);
                if (a.field_name == 'drinking') {
                    $scope.drinkingReq = true;
                }
                if (a.field_name == 'smoking') {
                    $scope.smokingReq = true;
                }
                if (a.field_name == 'education') {
                    $scope.educationReq = true;
                }
                if (a.field_name == 'income') {
                    $scope.incomeReq = true;
                }
                if (a.field_name == 'occupation') {
                    $scope.occupationReq = true;
                }
                if (a.field_name == 'origin') {
                    $scope.originReq = true;
                }
                if (a.field_name == 'family') {
                    $scope.familyReq = true;
                }
                if (a.field_name == 'family_status') {
                    $scope.family_statusReq = true;
                }
                if (a.field_name == 'about_family') {
                    $scope.about_familyReq = true;
                }
                if (a.field_name == 'photo_request') {
                    $scope.photo_reqReq = true;
                }
            });
            $scope.converstionCount = viewProfile.communication.sent.length + viewProfile.communication.received.length;

            if (viewProfile.blocked == 'yes') {
            $scope.showBlockAction = true;
            }else{
                $scope.showBlockAction = false;

            }


            if (!$scope.showBlockAction && viewProfile.communication_latest[0] != null
                && viewProfile.communication_latest[0] != 0
                && viewProfile.communication_latest[0] != '') {

                $scope.showConversationAction = true;
                $scope.communication_type = 'received';
                $scope.communication = {
                    id: viewProfile.communication_latest[0],
                    action: viewProfile.communication_latest[1],
                    date: viewProfile.communication_latest[2],
                    status: viewProfile.communication_latest[3],
                    field_name: viewProfile.communication_latest[4],
                    content: viewProfile.communication_latest[5],
                    response: viewProfile.communication_latest[6]
                }
                console.log("check",$scope.communication);
            }else{
                console.log("show conversation trueeeeeeeeeeeeee")
                $scope.showConversationAction = false;
            }

            if(!$scope.showConversationAction && !$scope.showBlockAction){
                $scope.showInterestAction = true;

            }




            $scope.data = viewProfile;
            console.log("data", $scope.data);
            //if ($scope.data.interest == '') {
            //    $scope.showInterestAction = true;
            //}
            //if (!$scope.showInterestAction) {
            //    $scope.showBlockAction = true;
            //}

            $scope.dataview = viewProfile;
            $scope.view = viewProfile.user;
            $scope.login_user = viewProfile.login_user;
            $scope.preference = viewProfile.preference_matches;
            $scope.shortListed = viewProfile.shortlisted;
            $scope.pref = viewProfile.user.preferences;
            console.log("preffffff", $scope.pref)
            $scope.enlarge = {name: $scope.view.name, id: $scope.view.id_people}
            $scope.details = {id: $scope.view.id_people, name: $scope.view.name, img: $scope.view.images};

        } else {
            $scope.viewProfile = false;
            $scope.profileAvailableMsg = viewProfile.message;

        }


        function enlargePhoto(obj1) {
            $scope.enlarge.partnerImageUrl = obj1
            $scope.enlargeOpen();

        }

        $scope.shortlist = shortlist;
        $scope.sendInterest = sendInterest;

        $scope.moreConversation = moreConversation;

        function moreConversation(id) {
            var url = $state.href('messages.communication', {id: $scope.view.id_people, page: "sent"});
            window.open(url, '_blank');
        }

        function sendInterest() {
            $http({
                method: 'GET',
                url: resourceUrl.url() + 'connect/send?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + $scope.view.id_people
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

        function shortlist() {
            $http({
                method: 'GET',
                url: resourceUrl.url() + 'do/shortlist?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + $scope.view.id_people
            }).then(function successCallback(response) {
                console.log(response)
                $scope.open();
                if (response.data.code == '200') {
                    $scope.details.header = 'Shortlisted Successfully';

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
                if (response.data.message == 'Already exists') {
                    $scope.message = "Already Shortlisted";
                }

            });


        }

        $scope.basicRequest = '';
        $scope.professionRequest = '';
        $scope.familyRequest = '';
        $scope.aboutFamilyRequest = '';


        $scope.requests = function (obj1, obj2) {
            $scope.details.field = obj1;
            if($scope.data.blocked == 'yes'){
                $scope.blockedOpen();
            }else {


                $http({
                    method: 'GET',
                    url: resourceUrl.url() + 'add/field?' +
                    '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + $scope.view.id_people + '&field=' + obj1
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.open();
                    //$scope.details.field = obj1;
                    //$scope[obj2] = 'Request send successfully';
                    $scope.details.header = 'Request send successfully';

                    $timeout(function () {
                        $scope[obj2] = '';
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
            }
        }

        $scope.blockPartner = blockPartner;

        function blockPartner() {
            console.log("block user");
            $http({
                method: 'GET',
                url: resourceUrl.url() + 'do/block?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + $scope.view.id_people
            }).then(function successCallback(response) {
                console.log(response);
                $scope.open();
                if (response.data.message == 'Already exists') {
                    $scope.details.header = 'Already Blocked this user';

                } else {
                    $scope.details.header = 'User Blocked Successfully';

                }
                $timeout(function () {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }, 2000);

                //
                //$scope.message = "Successfully Shortlisted";

            }, function errorCallback(response) {
                console.log(response)
                if (response.data.message == 'Already exists') {
                    $scope.message = "Already Shortlisted";
                }

            });
        }


        $scope.unblockPartner = unblockPartner;

        function unblockPartner() {
            console.log("unblockPartner user");
            $http({
                method: 'GET',
                url: resourceUrl.url() + 'do/unblock?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + $scope.view.id_people
            }).then(function successCallback(response) {
                console.log(response);
                $scope.open();
                if (response.data.message == 'Already exists') {
                    $scope.details.header = 'Already Blocked this user';

                } else {
                    $scope.details.header = 'User unBlocked Successfully';

                }
                $timeout(function () {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }, 2000);

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

        $scope.blockedOpen = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'unBlockProfile.html',
                controller: 'profileBlockedController',
                controllerAs: '$ctrl',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return $scope.details;
                    }
                }
            });
        }



    }

    function modalController($uibModalInstance, items, $state) {
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

    function enlargePhotoController($uibModalInstance, items) {
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

    function profileBlockedController($scope,$uibModalInstance,$http, $timeout,$state,items,storageService,resourceUrl, $stateParams) {
        var $ctrl = this;
        $ctrl.items = items;
        console.log($ctrl.items.id)
        $scope.header = "Profile Blocked";


        $ctrl.unBlock = function (obj) {


            $http({
                method: 'GET',
                url: resourceUrl.url() + 'do/unblock?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + $ctrl.items.id
            }).then(function successCallback(response) {
                console.log(response);

                $scope.header = 'User unBlocked Successfully';


                $timeout(function () {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                    $uibModalInstance.dismiss('cancel');
                }, 2000);
            }, function errorCallback(response) {
                console.log(response);
            });
        };
        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();