(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('RegistrationController', RegistrationController);

    /** @ngInject */
    function RegistrationController(storageService,$scope,$http,$stateParams,$state,populate) {
        //var vm = this;
        console.log("RegistrationController");
        console.log("stateParams",$stateParams.reg_id);

        var vm = this;
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

        $scope.selectCountry = selectCountry;
        $scope.selectState = selectState;

        $http({
            method: 'GET',
            url: 'http://devapi.peoplematrimony.com/populate?id_mothertongue=1&id_religion='+$stateParams.reg_id
        }).then(function successCallback(response) {
            $scope.castList = response.data.caste;
        }, function errorCallback(response) {

        });


        $scope.step2 = {
            marital_status:null,
            mothertongue:null,
            caste:null,
            country:null,
            state:null,
            city:null,
            height:null,
            education:null,
            occupation:null,
            step:2,

        }

        function selectCountry(){


            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/populate?id_country='+$scope.step2.country
            }).then(function successCallback(response) {
                $scope.stateList = response.data.states;
            }, function errorCallback(response) {

            });


        }

        function selectState(){

            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/populate?id_state='+$scope.step2.state
            }).then(function successCallback(response) {
                $scope.cityList = response.data.cities;
            }, function errorCallback(response) {

            });


        }


        //
        //$http({
        //    method: 'GET',
        //    url: 'http://devapi.peoplematrimony.com/populate'
        //}).then(function successCallback(response) {
        //    console.log(response)
        //    $scope.countryList = response.data.countries;
        //    $scope.motherTongueList = response.data.mothertongue;
        //    $scope.religonList = response.data.religon;
        //    $scope.starsList = response.data.stars;
        //    $scope.occupationCategoryList = response.data.occupation_category;
        //    $scope.educationCategoryList = response.data.education_category;
        //    $http({
        //        method: 'GET',
        //        url: 'https://devapi.peoplematrimony.com/user/view?' +
        //        'view_id=' + storageService.get("id") + '&token=' + storageService.get("token")
        //    }).then(function successCallback(response) {
        //        console.log(response)
        //        $scope.profile = response.data;
        //
        //    }, function errorCallback(response) {
        //        console.log(response)
        //
        //    });
        //    //$scope.profile = response.data;
        //}, function errorCallback(response) {
        //    //console.log(response)
        //
        //});


        vm.registerCandidateStep2 = function () {
            console.log($scope.reg);
            $http({
                method: 'POST',
                url: 'https://devapi.peoplematrimony.com/user?id_people=' +storageService.get('id')+
                '&marital_status='+$scope.step2.marital_status+'&' +
                'caste='+$scope.step2.caste+'&' +
                'country='+$scope.step2.country+'&' +
                'state='+$scope.step2.state+'&' +
                'city='+$scope.step2.city+'&' +
                'height='+$scope.step2.height+'&' +
                'education=1&' +
                'occupation=1&' +
                'step=2&' +
                'token='+storageService.get('token')
            }).then(function successCallback(response) {
                //console.log(response.data.access_token);
                //storageService.set("token", response.data.access_token)
                //storageService.set("id", response.data.id_people)

                $state.go('login')


            }, function errorCallback(response) {
                console.log(response);
                $scope.message = response.data.message;


            });


        };
    }

    //}
   })();