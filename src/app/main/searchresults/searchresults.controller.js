(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SearchResultsController', SearchResultsController)
        .controller('searchResponseController', searchResponseController)
        .controller('enlargeSearchPhotoController', enlargeSearchPhotoController);

    /** @ngInject */
    function SearchResultsController($timeout,$state,populate,$uibModal,$scope,$http,$stateParams,resourceUrl,storageService) {
        var vm = this;
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");
        $scope.filterData = {photo_available:false,horoscope_available:false,is_online:false}
        $scope.viewAll = viewAll;
        $scope.enlargeImage = [];
        function viewAll(data){
            console.log("ShowData",data);
            $scope.enlargeImage = data;
            $scope.enlargeOpen();
        }

        $scope.redirectURL = redirectURL;
        function redirectURL(obj){
            $state.go('profile', {type:obj});

        }

        $scope.requests = function(obj1){
            console.log(obj1)



            $http({
                method: 'GET',
                url: resourceUrl.url()+'add/field?' +
                '&token=' + storageService.get("token") +
                '&id=' + storageService.get('id') +
                '&partner=' + obj1+
                '&field=photo_request'
            }).then(function successCallback(response) {
                console.log(response)

                $timeout(function() {$state.transitionTo($state.current, $stateParams, {
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

        $scope.enlargeOpen = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'enlargeSearchPhoto.html',
                controller: 'enlargeSearchPhotoController',
                controllerAs: '$ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return $scope.enlargeImage;
                    }
                }
            });
        }

        console.log("SearchResultsController");
        console.log(storageService.get('regular_search'));
        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        $scope.mstatusDiv = true;
        $scope.motherTongueDiv = true;
        $scope.religionDiv = true;
        $scope.starDiv = true;
        $scope.eduDiv = true;
        $scope.empDiv = true;
        $scope.ocuDiv = true;
        $scope.selectFacet = selectFacet;
        $scope.facetSearch = facetSearch;
        function selectFacet(obj){
            $scope[obj]=!$scope[obj];
        }

        $scope.facetdetails = {mstatus:[],motherTongue:[],occupation:[],religion:[],star:[],education:[],occu_cat:[]

        }

        function facetSearch(id,obj){
            console.log("check",id);
            var query = [];

            if('mstatus' == obj){
                $scope.facetdetails.mstatus = [];
                $scope.facetdetails.mstatus.push(id)
                query.push("marital_status="+$scope.facetdetails.mstatus.join('~'))
            }
            if('motherTongue' == obj){
                if(!contains.call($scope.facetdetails.motherTongue,id)){
                    $scope.facetdetails.motherTongue.push(id)
                }else{
                    const index = $scope.facetdetails.motherTongue.indexOf(id);
                    $scope.facetdetails.motherTongue.splice(index, 1);
                }
            }
            if($scope.facetdetails.motherTongue.length > 0){
                query.push("mothertongue="+$scope.facetdetails.motherTongue.join('~'))
            }
            if('religion' == obj){
                if(!contains.call($scope.facetdetails.religion,id)){
                    $scope.facetdetails.religion.push(id)
                }else{
                    const index = $scope.facetdetails.religion.indexOf(id);
                    $scope.facetdetails.religion.splice(index, 1);
                }
            }
            if($scope.facetdetails.religion.length > 0){
                query.push("religion="+$scope.facetdetails.religion.join('~'))
            }
            if('star' == obj){
                if(!contains.call($scope.facetdetails.star,id)){
                    $scope.facetdetails.star.push(id)
                }else{
                    const index = $scope.facetdetails.star.indexOf(id);
                    $scope.facetdetails.star.splice(index, 1);
                }
            }
            if($scope.facetdetails.star.length > 0){
                query.push("star="+$scope.facetdetails.star.join('~'))
            }
            if('education' == obj){
                if(!contains.call($scope.facetdetails.education,id)){
                    $scope.facetdetails.education.push(id)
                }else{
                    const index = $scope.facetdetails.education.indexOf(id);
                    $scope.facetdetails.education.splice(index, 1);
                }
            }
            if($scope.facetdetails.education.length > 0){
                query.push("education="+$scope.facetdetails.education.join('~'))
            }
            if('occu_cat' == obj){
                if(!contains.call($scope.facetdetails.occu_cat,id)){
                    $scope.facetdetails.occu_cat.push(id)
                }else{
                    const index = $scope.facetdetails.occu_cat.indexOf(id);
                    $scope.facetdetails.occu_cat.splice(index, 1);
                }
            }
            if($scope.facetdetails.occu_cat.length > 0){
                query.push("occu_cat="+ $scope.facetdetails.occu_cat.join('~'))
            }
            if('occupation' == obj){
                if(!contains.call($scope.facetdetails.occupation,id)){
                    $scope.facetdetails.occupation.push(id)
                }else{
                    const index = $scope.facetdetails.occupation.indexOf(id);
                    $scope.facetdetails.occupation.splice(index, 1);
                }
            }
            if($scope.facetdetails.occupation.length > 0){
                query.push("occupation="+ $scope.facetdetails.occupation.join('~'))
            }
            if($scope.age.start != null){
                query.push("age_start="+$scope.age.start)
            }
            if($scope.age.end != null){
                query.push("age_end="+$scope.age.end)
            }
            if($scope.height.start != null){
                query.push("height_start="+$scope.height.start)
            }
            if($scope.height.end != null){
                query.push("height_end="+$scope.height.end)
            }
            if($scope.filterData.horoscope_available != null){
                query.push("horoscope_available="+$scope.filterData.horoscope_available)
            }
            if($scope.filterData.photo_available != null){
                query.push("photo_available="+$scope.filterData.photo_available)
            }
            if($scope.filterData.is_online != null){
                query.push("is_online="+$scope.filterData.is_online)
            }


            if(query.length > 0 ){
                query = "&"+query.join('&')
            }
            $http({
                method: 'POST',
                url: resourceUrl.url() + 'matches?' +
                '&token=' + storageService.get("token") + '&type=search' +query
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
            }, function errorCallback(response) {
                console.log(response);
            });

        }
        var contains = function(needle) {
            // Per spec, the way to identify NaN is that it is not equal to itself
            var findNaN = needle !== needle;
            var indexOf;

            if(!findNaN && typeof Array.prototype.indexOf === 'function') {
                indexOf = Array.prototype.indexOf;
            } else {
                indexOf = function(needle) {
                    var i = -1, index = -1;

                    for(i = 0; i < this.length; i++) {
                        var item = this[i];

                        if((findNaN && item !== item) || item === needle) {
                            index = i;
                            break;
                        }
                    }

                    return index;
                };
            }

            return indexOf.call(this, needle) > -1;
        };
        $scope.isTrue = function (id,obj) {
            if(contains.call($scope.facetdetails[obj],id)){
                //console.log($scope.facetdetails[obj]);
                return true;
            }
        }

        $scope.viewProfile = viewProfile;
        function viewProfile(id){
            var url = $state.href('viewProfile', {view_id:id});
            window.open(url,'_blank');        }


        $scope.showResult = false;
        if(storageService.get('regular_search') != null){

            $scope.regular = JSON.parse(storageService.get('regular_search'));
            console.log("regular",$scope.regular)
            var query = [];
            if($scope.regular.age_start != null){
                query.push("age_start="+$scope.regular.age_start)
            }
            if($scope.regular.age_end != null){
                query.push("age_end="+$scope.regular.age_end)
            }
            if($scope.regular.height_start != null){
                query.push("height_start="+$scope.regular.height_start)
            }
            if($scope.regular.height_end != null){
                query.push("height_end="+$scope.regular.height_end)
            }

            if($scope.regular.mothertongueList.length > 0){
                var m = $scope.regular.mothertongueList;
                query.push("mothertongue="+ m.join("~"));
            }

            if($scope.regular.religionList.length > 0){
                var m = $scope.regular.religionList;
                query.push("religion="+ m.join("~"))
            }
            if($scope.regular.starList.length > 0){
                var m = $scope.$scope.regular.starList;
                query.push("star="+ m.join("~"))
            }
            if($scope.regular.educationList.length > 0){
                var m = $scope.regular.educationList;
                query.push("education="+ m.join("~"))
            }
            if($scope.regular.occu_categoryList.length > 0){
                var m = $scope.regular.occu_categoryList;
                query.push("occu_cat="+ m.join("~"))
            }
            if($scope.regular.occupationList.length > 0){
                var m = $scope.regular.occupationList;
                query.push("occupation="+ m.join("~"))
            }
            if($scope.regular.countryList.length > 0){
                var m = $scope.regular.countryList;
                query.push("country="+ m.join("~"))
            }
            if($scope.regular.maritalStatus != null){
                query.push("marital_status="+$scope.regular.maritalStatus)
            }
            if($scope.regular.showProfile.withPhoto){
                query.push("with_photo="+$scope.regular.showProfile.withPhoto)
            }
            if($scope.regular.showProfile.withHoroscope){
                query.push("with_horoscope="+$scope.regular.showProfile.withHoroscope)
            }
            if($scope.regular.showProfile.onlineRightNow){
                query.push("is_online="+$scope.regular.showProfile.onlineRightNow)
            }
            if($scope.regular.dontShowProfile.ignoredProfile){
                query.push("ignored_me="+$scope.regular.dontShowProfile.ignoredProfile)
            }
            if($scope.regular.dontShowProfile.profileAlreadyContacted){
                query.push("contacted_me="+$scope.regular.dontShowProfile.profileAlreadyContacted)
            }
            if($scope.regular.dontShowProfile.shortlisted){
                query.push("shortlisted_me="+$scope.regular.dontShowProfile.shortlisted)
            }
            if($scope.regular.dontShowProfile.viewed){
                query.push("viewed_me="+$scope.regular.dontShowProfile.viewed)
            }
            if(query.length > 0 ){
                query = "&"+query.join('&')
            }

            $http({
                method: 'POST',
                url: resourceUrl.url() + 'matches?' +
                '&token=' + storageService.get("token") + '&type=search' +query
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
                if($scope.matches.length == 0){
                    $scope.showResult = true;
                }else{
                    $scope.showResult = false;

                }
            }, function errorCallback(response) {
                console.log(response);
            });
        }else {
            $state.go('search')

        }








        $scope.populate = populate;
        console.log($scope.populate);
        $scope.mtcount = 4;
        $scope.educount = 4;
        $scope.ocuCatcount = 4;
        $scope.ocucount = 4;
        $scope.starcount = 4;
        $scope.relcount = 4;
        $scope.regular = null;

        $scope.age = {start: null, end: null};


        $scope.height = {start: null, end: null};



        $scope.martialStatus = [{name: "Married"}, {name: "Never Married"}, {
            name: "Widow"
        }, {
            name: "Divorced"
        }, {
            name: "Widower"
        }];

        $scope.shortlist = function(obj) {
            $scope.details = {id:obj.id_people,name:obj.name,img:obj.images};

            $http({
                method: 'GET',
                url: resourceUrl.url()+'do/shortlist?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + obj.id_people
            }).then(function successCallback(response) {
                console.log(response)
                $scope.details.header = 'Shortlisted Successfully';
                $scope.open();


            }, function errorCallback(response) {
                console.log(response)
                if (response.data.message == 'Already exists') {
                    $scope.details.header = 'Already Shortlisted';
                    $scope.open();                }
                $timeout(function() { $scope.message = '';}, 2000);


            });


        }

        $scope.sendInterest = function(obj) {

            $scope.details = {id:obj.id_people,name:obj.name,img:obj.images};

            $http({
                method: 'GET',
                url: resourceUrl.url()+'connect/send?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + obj.id_people
            }).then(function successCallback(response) {
                console.log(response);
                if (response.data.code == '400') {
                    $scope.details.header = response.data.message;
                    $scope.open();
                }else {
                    $scope.details.header = 'Interest send successfully';
                    $scope.open();
                }
            }, function errorCallback(response) {
                console.log(response)
                if (response.data.code == '400') {
                    $scope.details.header = 'Already send an Interest';
                    $scope.open();
                }
            });


        }
        $scope.showMoreMStatus = function (obj1,action) {
            if(action == 'more'){
                $scope[obj1] = $scope[obj1]+4;
            }
            if(action == 'less' && $scope[obj1] > 4){
                $scope[obj1] = $scope[obj1]-4;
            }

        }

        $scope.open = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'searchResponseModal.html',
                controller: 'searchResponseController',
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

        $scope.match = {mstatus:null}

        $scope.search = function(){
            $scope.showResult = false;

            var query = [];

            $scope.motherTongueIdList=[];
            $("input:checkbox[name=motherTongue]:checked").each(function(){
                $scope.motherTongueIdList.push($(this).val());
            });

            $scope.starIdList=[];
            $("input:checkbox[name=star]:checked").each(function(){
                $scope.starIdList.push($(this).val());
            });

            $scope.religionIdList=[];
            $("input:checkbox[name=religion]:checked").each(function(){
                $scope.religionIdList.push($(this).val());
            });

            $scope.educationIdList=[];
            $("input:checkbox[name=education]:checked").each(function(){
                $scope.educationIdList.push($(this).val());
            });

            $scope.employedIdList=[];
            $("input:checkbox[name=employed]:checked").each(function(){
                $scope.employedIdList.push($(this).val());
            });
            $scope.occupationIdList=[];
            $("input:checkbox[name=occupation]:checked").each(function(){
                $scope.occupationIdList.push($(this).val());
            });

            if($scope.match.mstatus != null){
                query.push("marital_status="+$scope.match.mstatus)
            }
            if($scope.age.start != null){
                query.push("age_start="+$scope.age.start)
            }
            if($scope.age.end != null){
                query.push("age_end="+$scope.age.end)
            }
            if($scope.height.start != null){
                query.push("height_start="+$scope.height.start)
            }
            if($scope.height.end != null){
                query.push("height_end="+$scope.height.end)
            }
            if($scope.motherTongueList.length > 0){
                var m = $scope.motherTongueList;
                query.push("mothertongue="+ m.join("~"))
            }
            if($scope.religionList.length > 0){
                var m = $scope.religionList;
                query.push("religion="+ m.join("~"))
            }
            if($scope.starList.length > 0){
                var m = $scope.starList;
                query.push("star="+ m.join("~"))
            }
            if($scope.educationList.length > 0){
                var m = $scope.educationList;
                query.push("education="+ m.join("~"))
            }
            //if($scope.employedIdList.length > 0){
            //    var m = $scope.employedIdList;
            //    query.push("occu_cat="+ m.join("~"))
            //}
            if($scope.occupationList.length > 0){
                var m = $scope.occupationList;
                query.push("occupation="+ m.join("~"))
            }
            if(query.length > 0 ){
                query = "&"+query.join('&')
            }
            $http({
                method: 'POST',
                url: resourceUrl.url()+'matches?' +
                '&token=' + storageService.get("token")+"&type=search"+query
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
                if($scope.matches.length == 0){
                    $scope.showResult = true
                }else{
                    $scope.showResult = false;
                }
            }, function errorCallback(response) {
                console.log(response);
            });

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





    }



function enlargeSearchPhotoController($uibModalInstance, items){
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selectedImg = $ctrl.items[0].image;
    //$ctrl.selected = {
    //    item: $ctrl.items[0]
    //};

    $ctrl.vieImg = function (obj) {
        $ctrl.selectedImg = obj;

    };
    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

    function searchResponseController($uibModalInstance, items,$state){
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
})
();