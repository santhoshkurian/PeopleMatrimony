(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('RegistrationController', RegistrationController);

    /** @ngInject */
    function RegistrationController(resourceUrl,storageService,$scope,$http,$stateParams,$state,populate) {
        //var vm = this;
        console.log("RegistrationController");
        console.log("stateParams",$stateParams.rel_id);
        console.log("stateParams_id",storageService.get("token"));

        var vm = this;
        $scope.edu_id = 0;
        $scope.pro_id = 0;
        $scope.castList = [];
        $scope.motherTongueList = [];
        $scope.countryList = [];
        $scope.stateList = [];
        $scope.cityList = [];
        $scope.motherTongueList = [];
        $scope.religonList = [];
        $scope.countryList = populate.countries;
        $scope.motherTongueList = populate.mothertongue;
        $scope.religonList = populate.religon;
        $scope.starsList = populate.stars;
        $scope.occupationCategoryList = populate.occupation_category;
        $scope.educationCategoryList = populate.education_category;
        $scope.educationList = populate.education;
        $scope.occupation = populate.occupation;
        $scope.setProfession= {education:null,occupation:null};




        $scope.selectCountry = selectCountry;
        $scope.selectState = selectState;

        $http({
            method: 'GET',
            url: resourceUrl.url()+'populate?id_mothertongue=1&id_religion='+$stateParams.rel_id
        }).then(function successCallback(response) {
            $scope.castList = response.data.caste;
        }, function errorCallback(response) {

        });


        $scope.step2 = {
            marital_status:'',
            mothertongue:null,
            caste:'0',
            country:'0',
            state:'0',
            city:'0',
            height:'0',
            education:null,
            occupation:null,
            step:2
        }

        $scope.showMS = false;
        $scope.showCaste = false;
        $scope.showCountry = false;
        $scope.showState = false;
        $scope.showCity = false;
        $scope.showHeight = false;
        $scope.showEducation = false;
        $scope.showOccupation = false;



        function selectCountry(){


            $http({
                method: 'GET',
                url: resourceUrl.url()+'populate?id_country='+$scope.step2.country
            }).then(function successCallback(response) {
                $scope.stateList = response.data.states;
                $scope.step2.state = "0";
                $scope.step2.city = "0";
            }, function errorCallback(response) {

            });


        }

        function selectState(){

            $http({
                method: 'GET',
                url: resourceUrl.url()+'populate?id_state='+$scope.step2.state
            }).then(function successCallback(response) {
                $scope.cityList = response.data.cities;
            }, function errorCallback(response) {

            });


        }        vm.registerCandidateStep2 = function () {
            $scope.showMS = false;
            $scope.showCaste = false;
            $scope.showCountry = false;
            $scope.showState = false;
            $scope.showCity = false;
            $scope.showHeight = false;
            $scope.showEducation = false;
            $scope.showOccupation = false;


            if($scope.step2.marital_status == ''){
                $scope.showMS = true;
            }
            if($scope.step2.caste == '0'){
                $scope.showCaste = true;
            }
            if($scope.step2.country == "0" || $scope.step2.country == ''){
                $scope.showCountry = true;
            }
            if($scope.step2.state == "0" || $scope.step2.state == ''){
                $scope.showState = true;
            }
            if($scope.step2.city == "0" || $scope.step2.city == ''){
                $scope.showCity = true;
            }
            if($scope.step2.height == "0" || $scope.step2.height == ''){
                $scope.showHeight = true;
            }
            console.log($scope.step2);
            if($scope.setProfession.education != null){
                $scope.edu_id = $scope.setProfession.education.id_education;
            }
            else{
                $scope.showEducation = true;
                $scope.showEducation = true;

            }
            if($scope.setProfession.occupation != null){
                $scope.pro_id = $scope.setProfession.occupation.id_occupation;
            }
            else{
                $scope.showOccupation = true;
            }

            if(!$scope.showMS && !$scope.showCaste
                && !$scope.showCountry && !$scope.showState && !$scope.showCity
                && !$scope.showHeight && !$scope.showEducation && !$scope.showOccupation) {
                $http({
                    method: 'POST',
                    url: resourceUrl.url() + 'user?id_people=' + storageService.get("id") +
                    '&marital_status=' + $scope.step2.marital_status + '&' +
                    'caste=' + $scope.step2.caste + '&' +
                    'country=' + $scope.step2.country + '&' +
                    'state=' + $scope.step2.state + '&' +
                    'city=' + $scope.step2.city + '&' +
                    'height=' + $scope.step2.height + '&' +
                    'education=' + $scope.edu_id +
                    '&occupation=' + $scope.pro_id +
                    '&step=2&' +
                    'token=' + storageService.get("token")
                }).then(function successCallback(response) {
                    if(response.error){
                        $scope.message = response.data.message;

                    }else {
                        $state.go('step2')
                    }
                }, function errorCallback(response) {
                    console.log(response);


                });
            }


        };
    }

    //}
   })();