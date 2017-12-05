(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('RegularSearchController', RegularSearchController);

    /** @ngInject */
    function RegularSearchController($scope,$state,$http,populate,resourceUrl,storageService,searchList) {
        var vm = this;
        console.log("RegularSearchController");
        console.log(populate);

        console.log(searchList);
        $scope.searchList = searchList;

        $scope.motherTongueList = populate.mothertongue;
        $scope.religonList = populate.religon;
        $scope.starsList = populate.stars;
        $scope.occupationCategoryList = populate.occupation_category;
        $scope.educationCategoryList = populate.education_category;
        $scope.educationList = populate.education;
        $scope.occupation = populate.occupation;
        $scope.countryList = populate.countries;


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
            maritalStatus:null,
        };





        $scope.search = search;
        function search(){
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


            $http({
                method: 'POST',
                url: resourceUrl.url()+'matches/save?p1_debug=1&token='+storageService.get('token'),
                data:$scope.regular
            }).then(function successCallback(response) {
                console.log(response);


            }, function errorCallback(response) {

            });

            //$state.go("searchresult",{ name : $scope.regular})
        }

    }
})();
