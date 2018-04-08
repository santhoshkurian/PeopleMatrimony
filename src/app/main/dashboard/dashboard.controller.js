(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController)
        .controller('dashboardModalController', dashboardModalController)
    ;

    /** @ngInject */
    function DashboardController($scope,$timeout,$uibModal,$stateParams,populate,$location,$http,storageService,newMatches,discoverMatches,viewed,recentUpdated,resourceUrl,$state,profileCompleteness) {

        $scope.viewType = 'single';

        console.log(profileCompleteness);
        console.log(newMatches);
        console.log("viewed",viewed);
        console.log("discoverMatches",discoverMatches);
        console.log("profileCompleteness",profileCompleteness);
        $scope.messages = profileCompleteness.percentage.data;
        $scope.occupationCategoryList = populate.occupation_category;

        $scope.value = profileCompleteness.percentage.percentage;
        $scope.countryList = populate.countries;

        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.image_attr = storageService.get("image_attr");

        $scope.newMatches = newMatches;
        $scope.recentUpdated = recentUpdated;
        $scope.viewed = viewed;
        $scope.discover = discoverMatches;
        $scope.sendInterest = sendInterest;
        $scope.addDetails = addDetails;
        $scope.selectView = selectView;
        $scope.backToView = backToView;

        function selectView(obj1,obj2){
            $scope.viewall_header = obj2;
            $scope.viewType = 'view_all';
            $scope.viewAll = obj1;
            console.log(obj2)
        }
        function backToView(){
            $scope.viewType = 'single';

        }

        $scope.profileComp = {income:'',id_occupation:'',ancestral_origin:'',education_detail:'',father_status:'',mother_status:'',parent_mobile:'',smoking_habit:'',drinking_habit:''};
        $scope.setProfession= {occupation_cat:null};

        $scope.viewProfile = viewProfile;
        function viewProfile(id){
            $state.go('viewProfile',{view_id:id});
        }

        function addDetails(obj){
            console.log(obj)

            if(obj == 'id_occupation') {
                if($scope.setProfession.occupation_cat != null) {
                    $scope.profileComp.id_occupation = $scope.setProfession.occupation_cat.id_occupation_category;
                }
            }
            if(obj.field == 'ancestral_origin') {
                if($scope.profileComp.ancestral_origin != null) {
                    $scope.profileComp.ancestral_origin = $scope.profileComp.ancestral_origin.id_country;
                }
            }
            console.log($scope.profileComp);

            $http({
                method: 'POST',
                url: resourceUrl.url()+'completeprofile/save?p_debug=1&id=' +storageService.get('id')+
                '&table=' +obj.table+
                '&field=' + obj.field + '&value='+$scope.profileComp[obj.field]+'&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }, function errorCallback(response) {
            });


        };

        $scope.message = '';
        function sendInterest(id) {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'connect/send?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + id
            }).then(function successCallback(response) {
                console.log(response);
                if(response.data.message == 'success'){
                    $scope.message = "Interest Send Successfully";
                }else {
                    $scope.message = response.data.message;
                }

                $scope.open();

                $timeout(function() { $scope.message = '';}, 2000);


            }, function errorCallback(response) {
                console.log(response)
                if (response.data.code == '400') {
                    $scope.message = "Already send a Interest";
                    $timeout(function() { $scope.message = '';}, 2000);

                }

            });


        }
        $scope.logout = logout;
        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.clear();
               $state.go('login');
            }, function errorCallback(response) {

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
                controller: 'dashboardModalController',
                controllerAs: '$ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return $scope.message;
                    }
                }
            });
        }



        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $http({
            method: 'GET',
            url: resourceUrl.url()+'user/view?' +
            'view_id=' + storageService.get("id") + '&token=' + storageService.get("token")
        }).then(function successCallback(response) {
            console.log(response.data.login_user.images[0])
            $scope.profile = response.data;
            //if(response.data.login_user.images.length > 0) {
            //    var count;
            //    for (count = 0; count < response.data.login_user.images.length; count++) {
            //        var obj = response.data.login_user.images[count];
            //        if(obj.is_primary == 1){
            //            storageService.set("image_url",obj.image)
            //
            //        }
            //    }
            //}


        }, function errorCallback(response) {
            console.log(response)

        });



        //$scope.messages = ["Add carrear details to get more time responses", "Add education details to get more time responses"]
        $scope.messageIndex = 0;
        $scope.loadNextMessage = function () {
            console.log("load message")
            console.log($scope.messages.length)
            if ($scope.messageIndex < $scope.messages.length - 1) {
                $scope.messageIndex = $scope.messageIndex +1;
            }
        }
        $scope.loadPreviosMessage = function () {
            if ($scope.messageIndex > 0) {
                $scope.messageIndex = $scope.messageIndex -1;
            }
        }
        $scope.isLastMessage =function(){
            if($scope.messageIndex == $scope.messages.length - 1){
                return true;
            }else{
                return false;
            }
        }
        $scope.isFirstMessage =function(){
            if($scope.messageIndex == 0){
                return true;
            }else{
                return false;
            }
        }

        console.log("NavigationController");

    }

    function dashboardModalController($uibModalInstance, items){
        var $ctrl = this;
        $ctrl.items = items;
        //$ctrl.selected = {
        //    item: $ctrl.items[0]
        //};

        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();