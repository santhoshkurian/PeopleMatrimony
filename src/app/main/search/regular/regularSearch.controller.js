(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('RegularSearchController', RegularSearchController);

    /** @ngInject */
    function RegularSearchController($scope,$state,populate) {
        var vm = this;
        console.log("RegularSearchController");
        console.log(populate);

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
            age_start:null,
            age_end:null,
            height_start:null,
            height_end:null,
            mothertongue:[],
            religion:[],
            caste:[],
            star:[],
            occupation:[],
            education:[],
            education_category:[],
            occu_category:[],
            country:[],
            state:null,
            city:null,
            marital_status:null,
            name:null,
            gender:null,
            showProfile:{withPhoto:false,withHoroscope:false,onlineRightNow:false},
            dontShowProfile:{ignoredProfile:false,profileAlreadyContacted:false,viewed:false,shortlisted:false},
            maritalStatus:null,
            multiple:$scope.multiValue
        };

        //maritalStatus:{any:false,unmarried:false,widow:false,divorced:false,divorce_awaiting:false},


        $scope.search = search;
        function search(){
            if($scope.multiValue.mothertongue.length  > 0){
                $scope.multiValue.mothertongue.filter(function (a) {
                    $scope.regular.mothertongue.push(a.id_mothertongue);
                })
            }
            if($scope.multiValue.religion.length  > 0){
                $scope.multiValue.religion.filter(function (a) {
                    $scope.regular.religion.push(a.id_religion);
                })
            }
            if($scope.multiValue.education.length  > 0){
                $scope.multiValue.education.filter(function (a) {
                    $scope.regular.education.push(a.id_education);
                })
            }
            if($scope.multiValue.education_category.length  > 0){
                $scope.multiValue.education_category.filter(function (a) {
                    $scope.regular.education_category.push(a.id_education_category);
                })
            }
            if($scope.multiValue.occupation.length  > 0){
                $scope.multiValue.occupation.filter(function (a) {
                    $scope.regular.occupation.push(a.id_occupation);
                })
            }
            if($scope.multiValue.country.length  > 0){
                $scope.multiValue.country.filter(function (a) {
                    $scope.regular.country.push(a.id_country);
                })
            }
            $state.go("searchresult",{ name : $scope.regular})
        }

    }
})();
