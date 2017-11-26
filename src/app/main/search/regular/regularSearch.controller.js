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


        $scope.multiValue = {religion:null,mothertongue:null,education:null,education_category:null}

        $scope.regular = {
            age_start:null,
            age_end:null,
            height_start:null,
            height_end:null,
            mothertongue:null,
            religion:null,
            caste:null,
            occupation:null,
            country:null,
            state:null,
            city:null,
            marital_status:null,
            name:null,
            gender:null,
            showProfile:{withPhoto:false,withHoroscope:false,onlineRightNow:false},
            dontShowProfile:{ignoredProfile:false,profileAlreadyContacted:false,viewed:false,shortlisted:false},
            maritalStatus:{any:false,unmarried:false,widow:false,divorced:false,divorce_awaiting:false},
            multiple:$scope.multiValue
        };

        $scope.search = search;
        function search(){
            $state.go("searchresult",{ name : $scope.regular})
        }

    }
})();
