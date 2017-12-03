(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SearchResultsController', SearchResultsController);

    /** @ngInject */
    function SearchResultsController($state,populate,$scope,$http,$stateParams,resourceUrl,storageService) {
        var vm = this;
        console.log("SearchResultsController");
        console.log($stateParams.search);
        if($stateParams.search == null){
            $state.go('search')
        }else {
            $scope.regular = $stateParams.search;
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

            if($scope.regular.mothertongue.length > 0){
                var m = $scope.regular.mothertongue;
                query.push("mothertongue="+ m.join("~"));
            }

            if($scope.regular.religion.length > 0){
                var m = $scope.regular.religion;
                query.push("religion="+ m.join("~"))
            }
            if($scope.regular.star.length > 0){
                var m = $scope.$scope.regular.star;
                query.push("star="+ m.join("~"))
            }
            if($scope.regular.education.length > 0){
                var m = $scope.regular.education;
                query.push("education="+ m.join("~"))
            }
            if($scope.regular.occu_category.length > 0){
                var m = $scope.regular.occu_category;
                query.push("occu_cat="+ m.join("~"))
            }
            if($scope.regular.occupation.length > 0){
                var m = $scope.regular.occupation;
                query.push("occupation="+ m.join("~"))
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

        //$scope.agefilter = agefilter;
        //function agefilter() {
        //    $http({
        //        method: 'POST',
        //        url: resourceUrl.url()+'matches?' +
        //        '&token=' + storageService.get("token")+'&type=search&age_start='+$scope.age.start+'&age_end='+$scope.age.end
        //    }).then(function successCallback(response) {
        //        console.log(response)
        //        $scope.matches = response.data.matches;
        //    }, function errorCallback(response) {
        //        console.log(response);
        //    });
        //}


        $scope.height = {start: null, end: null};


        //$scope.heightfilter = heightfilter;
        //function heightfilter() {
        //    $http({
        //        method: 'POST',
        //        url: resourceUrl.url()+'matches?' +
        //        '&token=' + storageService.get("token")+'&type=search&height_start='+$scope.height.start+'&height_end='+$scope.height.end
        //    }).then(function successCallback(response) {
        //        console.log(response)
        //        $scope.matches = response.data.matches;
        //    }, function errorCallback(response) {
        //        console.log(response);
        //    });
        //}

        $scope.martialStatus = [{name: "Married"}, {name: "Never Married"}, {
            name: "Widow"
        }, {
            name: "Divorced"
        }, {
            name: "Widower"
        }];

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
                '&token=' + storageService.get("token")+"&type=search"+query
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
            }, function errorCallback(response) {
                console.log(response);
            });

        }





    }
})();