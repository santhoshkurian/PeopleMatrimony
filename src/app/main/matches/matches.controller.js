(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MatchesController', MatchesController)
        .controller('enlargeMatchesPhotoController', enlargeMatchesPhotoController);

    /** @ngInject */
    function MatchesController($scope,$uibModal,$stateParams,storageService,populate,$timeout,resourceUrl, $http, $location,$state) {

        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $scope.pageType = $stateParams.type;

console.log("pppppppppppppp",$scope.pageType)


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

        $scope.enlargeOpen = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'enlargeMatchesPhoto.html',
                controller: 'enlargeMatchesPhotoController',
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

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.populate = populate;
        console.log($scope.populate);
        $scope.enlargeImage = [];
        $scope.mtcount = 4;
        $scope.educount = 4;
        $scope.ocuCatcount = 4;
        $scope.ocucount = 4;
        $scope.starcount = 4;
        $scope.relcount = 4;


        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

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






        $scope.mainlink = $stateParams.type;



        $scope.showFirstmartialStatus = false;
        $scope.showFirstLanguage = false;
        $scope.showDivisions = false;
        $scope.showStars = false;
        $scope.martialStatus = [{name: "Married",count:"married"},
            {name: "Never Married",count:"unmarried"},
            {name: "Widow",count:"widow"},
            {name: "Divorced",count:"divorced"},
            {name: "Widower",count:"widower"}];

        $scope.showMoreMStatus = function (obj1,action) {
            if(action == 'more'){
                $scope[obj1] = $scope[obj1]+4;
            }
            if(action == 'less' && $scope[obj1] > 4){
                $scope[obj1] = $scope[obj1]-4;
            }

        }

        $scope.mstatusDiv = true;
        $scope.motherTongueDiv = true;
        $scope.religionDiv = true;
        $scope.starDiv = true;
        $scope.eduDiv = true;
        $scope.empDiv = true;
        $scope.ocuDiv = true;
        $scope.selectFacet = selectFacet;
        $scope.facetSearch = facetSearch;
        $scope.initalfacetSearch = initalFacetSearch;
        $scope.filterData = {photo_available:false,horoscope_available:false,is_online:false};
        function selectFacet(obj){
            $scope[obj]=!$scope[obj];
        }
        $scope.facetdetails = {mstatus:[],motherTongue:[],occupation:[],religion:[],star:[],education:[],occu_cat:[]

        }

        function facetSearch(id,obj){
            console.log(id,obj);
            var query = [];

            if('mstatus' == obj){
                $scope.facetdetails.mstatus = [];
                $scope.facetdetails.mstatus.push(id)
                query.push("marital_status="+$scope.facetdetails.mstatus.join('~'))
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
            if($scope.filterData.horoscope_available != null){
                query.push("horoscope_available="+$scope.filterData.horoscope_available)
            }
            if($scope.filterData.photo_available != null){
                query.push("photo_available="+$scope.filterData.photo_available)
            }
            if($scope.filterData.is_online != null){
                query.push("is_online="+$scope.filterData.is_online)
            }

            query.push($scope.pageType+"=true");
            query.push("type=search");

            if(query.length > 0 ){
                query = "&"+query.join('&')
            }
            console.log(query)
            $http({
                method: 'POST',
                url: resourceUrl.url()+'matches?' +
                '&token=' + storageService.get("token")+query
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
            }, function errorCallback(response) {
                console.log(response);
            });

        }
        function initalFacetSearch(obj){
            var query = [];

            query.push(obj+"=true");
            query.push("type=search");

            if(query.length > 0 ){
                query = "&"+query.join('&')
            }
            console.log(query)
            $http({
                method: 'POST',
                url: resourceUrl.url()+'matches?' +
                '&token=' + storageService.get("token")+query
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
                return true;
            }
        }
        var vm = this;
        $scope.matches = [];
        $scope.message = null;
        $scope.currentPage = 1;
        $scope.totalPAges = 20;
        $scope.pageChange = function () {
            console.log($scope.currentPage)
        }

        if($scope.pageType == 'newMatches'){
            initalFacetSearch('new_matches');
        }
        if($scope.pageType == 'shortlisted'){
            initalFacetSearch('shortlisted');
        }
        if($scope.pageType == 'viewed_my_profile'){
            initalFacetSearch('viewed_my_profile');
        }
        if($scope.pageType == 'yet_to_be_viewed'){
            initalFacetSearch('yet_to_be_viewed');
        }
        if($scope.pageType == 'viewed_my_profile'){
            initalFacetSearch('viewed_my_profile');
        }


        $scope.shortlist = shortlist;
        $scope.newMatches = newMatches;
        $scope.notYetViewed = notYetViewed;
        $scope.viewed = viewed;
        $scope.shortlisted = shortlisted;
        $scope.sendInterest = sendInterest;
        $scope.mutalmatches = mutalmatches;
        $scope.myInterval = 3000;

        $scope.viewProfile = viewProfile;
        function viewProfile(id){
            var url = $state.href('viewProfile', {view_id:id});
            window.open(url,'_blank');
        }




        function newMatches() {
            $scope.mainlink = "newMatches";
            $scope.message = null;
            $scope.showResult = false;
            console.log('new Matches');


            $http({
                method: 'GET',
                url: resourceUrl.url()+'matches/new?' +
                '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
                if($scope.matches.length == 0){
                    $scope.showResult = true;
                }
            }, function errorCallback(response) {
                console.log(response);
            });

        }

        function notYetViewed() {
            $scope.mainlink = "notYetViewed";
            $scope.message = null;
            $scope.showResult = false;
            $http({
                method: 'GET',
                url: resourceUrl.url()+'list/ignore?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get("id")
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
                if($scope.matches.length == 0){
                    $scope.showResult = true;
                }
            }, function errorCallback(response) {
                console.log(response);
            });


        }

        function viewed() {
            $scope.mainlink = "viewed";
            $scope.message = null;
            $scope.showResult = false;
            $http({
                method: 'GET',
                url: resourceUrl.url()+'list/viewed?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get("id")
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
                if($scope.matches.length == 0){
                    $scope.showResult = true;
                }
            }, function errorCallback(response) {
                console.log(response);
            });




        }

        function shortlisted() {
            $scope.mainlink = "shortlisted";
            $scope.message = null;
            $scope.showResult = false;


            $scope.matches = [];
            $http({
                method: 'GET',
                url: resourceUrl.url()+'list/shortlist?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get("id")
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
                if($scope.matches.length == 0){
                    $scope.showResult = true;
                }
            }, function errorCallback(response) {
                console.log(response);
            });


        }

        function mutalmatches() {
            $scope.mainlink = "mutalmatches";
            $scope.message = null;
            $scope.showResult = false;


            $scope.matches = [];
            $http({
                method: 'GET',
                url: resourceUrl.url()+'list/viewed?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get("id")
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
                if($scope.matches.length == 0){
                    $scope.showResult = true;
                }
            }, function errorCallback(response) {
                console.log(response);
            });


        }

        function more() {
            $scope.mainlink = "more";
            $scope.message = null;

            $scope.matches = [];


        }




        $scope.age = {start: null, end: null};


        $scope.agefilter = agefilter;
        function agefilter() {
            $http({
                method: 'POST',
                url: resourceUrl.url()+'matches?' +
                '&token=' + storageService.get("token")+'&age_start='+$scope.age.start+'&age_end='+$scope.age.end
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
            }, function errorCallback(response) {
                console.log(response);
            });
        }


        $scope.height = {start: null, end: null};


        $scope.heightfilter = heightfilter;
        function heightfilter() {
            $http({
                method: 'POST',
                url: resourceUrl.url()+'matches?' +
                '&token=' + storageService.get("token")+'&type=search&height_start='+$scope.height.start+'&height_end='+$scope.height.end
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
            }, function errorCallback(response) {
                console.log(response);
            });
        }


        function shortlist(id) {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'do/shortlist?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + id
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

        function sendInterest(id) {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'connect/send?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + id
            }).then(function successCallback(response) {
                console.log(response)
                $scope.message = "send interest successfully";
                $timeout(function() { $scope.message = '';}, 2000);


            }, function errorCallback(response) {
                console.log(response)
                if (response.data.code == '400') {
                    $scope.message = "Already send a Interest";
                }
                $timeout(function() { $scope.message = '';}, 2000);


            });


        }

        $scope.images=[{ "image": "/assets/images/loginimage.jpg",
            "status": "pending",
            "is_primary": 0,
            "is_validated": 0,
            "number": 20,
            "category": "general"},{ "image": "/assets/images/prof1.jpg",
            "status": "pending",
            "is_primary": 0,
            "is_validated": 0,
            "number": 20,
            "category": "general"}]


        //$http({
        //    method: 'GET',
        //    url: resourceUrl.url()+'matches/new?' +
        //    '&token=' + storageService.get("token")
        //}).then(function successCallback(response) {
        //    console.log(response)
        //    $scope.matches = response.data.matches;
        //}, function errorCallback(response) {
        //    console.log(response);
        //});

        $scope.match = {mstatus:null}

        $scope.search = function(){
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
            if($scope.motherTongueIdList.length > 0){
                var m = $scope.motherTongueIdList;
                query.push("mothertongue="+ m.join("~"))
            }
            if($scope.religionIdList.length > 0){
                var m = $scope.religionIdList;
                query.push("religion="+ m.join("~"))
            }
            if($scope.starIdList.length > 0){
                var m = $scope.starIdList;
                query.push("star="+ m.join("~"))
            }
            if($scope.educationIdList.length > 0){
                var m = $scope.educationIdList;
                query.push("education="+ m.join("~"))
            }
            if($scope.employedIdList.length > 0){
                var m = $scope.employedIdList;
                query.push("occu_cat="+ m.join("~"))
            }
            if($scope.occupationIdList.length > 0){
                var m = $scope.occupationIdList;
                query.push("occupation="+ m.join("~"))
            }
            if(query.length > 0 ){
                query = "&"+query.join('&')
            }
            $http({
                method: 'POST',
                url: resourceUrl.url()+'matches?' +
                '&token=' + storageService.get("token")+query
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
            }, function errorCallback(response) {
                console.log(response);
            });

        }




    }
    function enlargeMatchesPhotoController($uibModalInstance, items){
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













})();