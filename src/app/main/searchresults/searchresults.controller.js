(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SearchResultsController', SearchResultsController);

    /** @ngInject */
    function SearchResultsController($timeout,$state,populate,$scope,$http,$stateParams,resourceUrl,storageService) {
        var vm = this;
        console.log("SearchResultsController");
        console.log(storageService.get('regular_search'));
        $scope.image_url = storageService.get("image_url");


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
            $state.go('viewProfile',{view_id:id});
        }


        $scope.showResult = false;
        if(storageService.get('regular_search') != null){

            $scope.regular = JSON.parse(storageService.get('regular_search'));
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

        $scope.shortlist = function(id) {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'do/shortlist?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + id
            }).then(function successCallback(response) {
                console.log(response)
                $scope.message = "Successfully Shortlisted";
                $timeout(function() { $scope.message = '';}, 2000);


            }, function errorCallback(response) {
                console.log(response)
                if (response.data.message == 'Already exists') {
                    $scope.message = "Already Shortlisted";
                }
                $timeout(function() { $scope.message = '';}, 2000);


            });


        }

        $scope.sendInterest = function(id) {
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
        $scope.showMoreMStatus = function (obj1,action) {
            if(action == 'more'){
                $scope[obj1] = $scope[obj1]+4;
            }
            if(action == 'less' && $scope[obj1] > 4){
                $scope[obj1] = $scope[obj1]-4;
            }

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
})();