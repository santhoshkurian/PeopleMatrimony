(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('RegularSearchController', RegularSearchController);

    /** @ngInject */
    function RegularSearchController(profile,$scope,$state,$http,$stateParams,populate,resourceUrl,storageService,searchList) {
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        var vm = this;
        console.log("RegularSearchController");
        console.log(populate);
        console.log('profile',profile);
        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");
        $scope.profile = profile;
        $scope.labels = {"select": "Any"}

        console.log(searchList);
        $scope.searchList = searchList;

        $scope.viewId = '';
        $scope.viewById = viewById;
        function viewById(id){
            $state.go('viewProfile',{view_id:id});

        };


        $scope.motherTongueList = populate.mothertongue;
        $scope.religonList = populate.religon;
        $scope.starsList = populate.stars;
        $scope.occupationCategoryList = populate.occupation_category;
        $scope.educationCategoryList = populate.education_category;
        $scope.educationList = populate.education;
        $scope.occupation = populate.occupation;
        $scope.countryList = populate.countries;
        $scope.regular = {maritalStatus:"any"};
        $scope.message = '';


        $scope.multiValue = {religion:[],mothertongue:[],education:[],education_category:[],occupation:[],country:[]}

        $scope.regular = {

            id:storageService.get('id'),
            name:'regular',
            type:'search',
            age_start:null,
            age_end:null,
            height_start:null,
            height_end:null,
            mothertongueList:[],
            religionList:[],
            casteList:[],
            starList:[],
            occupationList:[],
            educationList:[],
            education_categoryList:[],
            occu_categoryList:[],
            countryList:[],
            state:null,
            city:null,
            marital_status:null,
            gender:null,
            showProfile:{withPhoto:false,withHoroscope:false,onlineRightNow:false},
            dontShowProfile:{ignoredProfile:false,profileAlreadyContacted:false,viewed:false,shortlisted:false},
            maritalStatus:null
        };

        $scope.deleteSearch = function(id){
            $http({
                method: 'POST',
                url: resourceUrl.url()+'matches/delete?p1_debug=1' +
                '&token='+storageService.get('token')+
                "&id="+storageService.get('id')+
                "&id_search="+id
            }).then(function successCallback(response) {
                $scope.message="deleted Successfully";
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });

            }, function errorCallback(response) {

            });
        };

        $scope.editSearch = function(obj){
            $scope.a = obj.param;
            console.log(obj);
            $scope.multiValue = {religion:[],mothertongue:[],education:[],education_category:[],occupation:[],country:[]}


            $scope.regular = {
                id_search:obj.id_search,
                id:storageService.get('id'),
                name:'regular',
                type:'search',
                age_start:$scope.a.age_start,
                age_end:$scope.a.age_end,
                height_start:$scope.a.height_start,
                height_end:$scope.a.height_end,
                mothertongueList:[],
                religionList:[],
                casteList:$scope.a.casteList,
                starList:$scope.a.starList,
                occupationList:[],
                educationList:[],
                education_categoryList:[],
                occu_categoryList:$scope.a.occu_categoryList,
                countryList:[],
                state:$scope.a.state,
                city:$scope.a.city,
                marital_status:$scope.a.marital_status,
                gender:$scope.a.gender,
                showProfile:$scope.a.showProfile,
                dontShowProfile:$scope.a.dontShowProfile,
                maritalStatus:$scope.a.maritalStatus,
            };

            if($scope.a.religionList.length > 0){
                var array = $scope.a.religionList;
                for (var i = 0; i < array.length; i++) {
                    $scope.religonList.filter(function (a) {
                        if (a.id_religion === array[i]) {
                            $scope.multiValue.religion.push(a);
                        }
                    })
                }
            }
            if($scope.a.mothertongueList.length > 0){
                var array = $scope.a.mothertongueList;
                for (var i = 0; i < array.length; i++) {
                    $scope.motherTongueList.filter(function (a) {
                        if (a.id_mothertongue === array[i]) {
                            $scope.multiValue.mothertongue.push(a);
                        }
                    })
                }
            }

            if($scope.a.countryList.length > 0){
                var array = $scope.a.countryList;
                for (var i = 0; i < array.length; i++) {
                    $scope.countryList.filter(function (a) {
                        if (a.id_country === array[i]) {
                            $scope.multiValue.country.push(a);
                        }
                    })
                }
            }

            if($scope.a.occupationList.length > 0){
                var array = $scope.a.occupationList;
                for (var i = 0; i < array.length; i++) {
                    $scope.occupation.filter(function (a) {
                        if (a.id_occupation === array[i]) {
                            $scope.multiValue.occupation.push(a);
                        }
                    })
                }
            }

            if($scope.a.educationList.length > 0){
                var array = $scope.a.education_categoryList;
                for (var i = 0; i < array.length; i++) {
                    $scope.educationCategoryList.filter(function (a) {
                        if (a.id_education_category === array[i]) {
                            $scope.multiValue.education_category.push(a);
                        }
                    })
                }
            }

            if($scope.a.education_categoryList.length > 0){
                var array = $scope.a.educationList;
                for (var i = 0; i < array.length; i++) {
                    $scope.educationList.filter(function (a) {
                        if (a.id_education === array[i]) {
                            $scope.multiValue.education.push(a);
                        }
                    })
                }
            }

            console.log($scope.regular);
            console.log($scope.multiValue);



        }
        $scope.selection = null;

        $scope.search = search;
        function search(obj){
            var ageStatus = true;
            var heightStatus = true;

            if($scope.regular.age_end != null && $scope.regular.age_start > $scope.regular.age_end){
                ageStatus = false;
            }
            if($scope.regular.height_end != null && $scope.regular.height_start > $scope.regular.height_end){
                heightStatus = false;
            }

            console.log($scope.multiValue.country);
            if($scope.multiValue.mothertongue.length  > 0){
                $scope.multiValue.mothertongue.filter(function (a) {
                    $scope.regular.mothertongueList.push(a.id_mothertongue);
                });
                $scope.regular.mothertongue = $scope.regular.mothertongueList.join('~');
            }
            if($scope.multiValue.religion.length  > 0){
                $scope.multiValue.religion.filter(function (a) {
                    $scope.regular.religionList.push(a.id_religion);
                });
                $scope.regular.religion = $scope.regular.religionList.join('~');

            }
            if($scope.multiValue.education.length  > 0){
                $scope.multiValue.education.filter(function (a) {
                    $scope.regular.educationList.push(a.id_education);
                });
                $scope.regular.education = $scope.regular.educationList.join('~');
            }
            if($scope.multiValue.education_category.length  > 0){
                $scope.multiValue.education_category.filter(function (a) {
                    $scope.regular.education_categoryList.push(a.id_education_category);
                });
                $scope.regular.education_category = $scope.regular.education_categoryList.join('~')
            }
            if($scope.multiValue.occupation.length  > 0){
                $scope.multiValue.occupation.filter(function (a) {
                    $scope.regular.occupationList.push(a.id_occupation);
                });
                $scope.regular.occupation = $scope.regular.occupationList.join('~');
            }
            if($scope.multiValue.country.length  > 0){
                $scope.multiValue.country.filter(function (a) {
                    $scope.regular.countryList.push(a.id_country);
                });
                $scope.regular.country = $scope.regular.countryList.join('~');
            }
            if(obj == 'save') {
                $http({
                    method: 'POST',
                    url: resourceUrl.url() + 'matches/save?p1_debug=1&token=' + storageService.get('token'),
                    data: $scope.regular
                }).then(function successCallback(response) {
                    console.log(response);


                }, function errorCallback(response) {

                });
            }
            if(ageStatus && heightStatus) {

                storageService.set('regular_search', JSON.stringify($scope.regular));
                $state.go("searchresult");
            }


        }


        $scope.searchexist = searchexist;
        function searchexist(obj){
            console.log(obj.param);
            $scope.a = obj.param;

            $scope.regular1 = {
                id:storageService.get('id'),
                name:'regular',
                type:'search',
                age_start:$scope.a.age_start,
                age_end:$scope.a.age_end,
                height_start:$scope.a.height_start,
                height_end:$scope.a.height_end,
                mothertongueList:$scope.a.mothertongueList,
                religionList:$scope.a.religionList,
                casteList:$scope.a.casteList,
                starList:$scope.a.starList,
                occupationList:$scope.a.occupationList,
                educationList:$scope.a.educationList,
                education_categoryList:$scope.a.education_categoryList,
                occu_categoryList:$scope.a.occu_categoryList,
                countryList:$scope.a.countryList,
                state:$scope.a.state,
                city:$scope.a.city,
                marital_status:$scope.a.marital_status,
                gender:$scope.a.gender,
                showProfile:$scope.a.showProfile,
                dontShowProfile:$scope.a.dontShowProfile,
                maritalStatus:$scope.a.maritalStatus,
            };
            storageService.set('regular_search',JSON.stringify($scope.regular1));

            $state.go("searchresult")


        }






    }
})();
