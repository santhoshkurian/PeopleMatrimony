(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($http, $scope, storageService,populate,profile,$window) {

        $window.pageYOffset
        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.setLocation= {country:null,state:null,city:null,nationality:null,nationality_name:null};
        $scope.countryList = populate.countries;




        $scope.motherTongueList = populate.mothertongue;
        $scope.religonList = populate.religon;
        $scope.starsList = populate.stars;
        $scope.occupationCategoryList = populate.occupation_category;
        $scope.educationCategoryList = populate.education_category;
        $scope.profile= profile;
        if($scope.profile.login_user.nationality != null) {
            $scope.countryList.filter(function (a) {
                if (a.id_country === $scope.profile.login_user.nationality) {
                    $scope.setLocation.nationality_name = a.country_name;
                }

            })
        }
        console.log("profile",$scope.profile)



        $scope.about = false;
        $scope.fabout = false;
        $scope.basic = false;
        $scope.location = true;
        $scope.relogious = true;
        $scope.education = true;

        $scope.stateList = [];
        $scope.cityList = [];
        $scope.occupationList = [];
        $scope.educationList = [];
        $scope.castList = [];


        $scope.editAction = editAction;
        $scope.editReligion = editReligion;
        $scope.editLocation = editLocation;


        $scope.aboutme = aboutme;
        $scope.aboutfamily = aboutfamily;
        $scope.basic = basic;
        $scope.selectCountry = selectCountry;
        $scope.selectState = selectState;
        $scope.selectReliegion = selectReliegion;
        $scope.saveReliegion = saveReliegion;
        $scope.saveLocation = saveLocation;

        if($scope.profile.login_user.id_religion != null){
            $scope.selectReliegion($scope.profile.login_user.id_religion);
        }








        function selectCountry(obj){
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/populate?id_country='+obj.id_country
            }).then(function successCallback(response) {
                $scope.stateList = response.data.states;
            }, function errorCallback(response) {

            });
        }

        function selectState(obj){
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/populate?id_state='+obj.id_state
            }).then(function successCallback(response) {
                console.log(response)
                $scope.cityList = response.data.cities;
            }, function errorCallback(response) {

            });
        }

        function selectReliegion(id){
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/populate?id_mothertongue='+$scope.profile.login_user.id_mothertongue+'&id_religion='+id
            }).then(function successCallback(response) {
                $scope.castList = response.data.caste;
            }, function errorCallback(response) {

            });
        }

        $scope.profile1 = {
            "login_user": {
                "id_user": 35,
                "id_people": "PM186113",
                "profile_for": "",
                "name": "san",
                "gender": "male",
                "age": 14,
                "height": null,
                "weight": null,
                "id_mothertongue": 5,
                "mothertongue": "Bhojpuri",
                "marital_status": null,
                "nationality": null,
                "validation_status": "unvalidated",
                "aboutme_status": "pending",
                "nationality_txt": null,
                "id_country": null,
                "country_name": null,
                "currency": null,
                "id_state": null,
                "state_name": null,
                "id_city": null,
                "city_name": null,
                "id_education": null,
                "education": null,
                "education_detail": null,
                "id_occucategory": null,
                "id_occupation": null,
                "occupation": null,
                "income": null,
                "id_religion": 1,
                "religion": "Hindu",
                "id_caste": null,
                "caste": null,
                "id_subcaste": null,
                "gothra": null,
                "id_star": null,
                "star": null,
                "dosham": null,
                "aboutme": "my",
                "is_online": "online",
                "hobbies": null,
                "drinking_habit": null,
                "smoking_habit": null,
                "eating_habit": null,
                "body_type": null,
                "complexion": null,
                "physical_status": null,
                "has_horoscope": "no",
                "id_familycountry": null,
                "id_familystate": null,
                "id_familycity": null,
                "family_country": null,
                "family_state": null,
                "family_city": null,
                "family_members": null,
                "father_status": null,
                "mother_status": null,
                "brother": null,
                "sister": null,
                "brother_married": null,
                "sister_married": null,
                "family_type": null,
                "family_values": null,
                "ancestral_origin": null,
                "family_status": null,
                "about_family": null,
                "occupation_category": null,
                "contact_view_credits": 3,
                "country_code": "[object Object]",
                "mobile": "1234567890",
                "is_mobile_verified": 0,
                "is_email_verified": 0,
                "email": "san@gmail.com",
                "preferences": {
                    "age_start": 1487,
                    "age_end": 60,
                    "height_start": null,
                    "height_end": null,
                    "country": null,
                    "state": null,
                    "city": null,
                    "religion": "1",
                    "caste": null,
                    "mothertongue": "5",
                    "edu_category": null,
                    "education": null,
                    "occu_category": null,
                    "occupation": null,
                    "marital_status": null,
                    "physical_status": "any",
                    "eating_habits": null,
                    "drinking_habits": null,
                    "smoking_habits": null,
                    "star": null,
                    "gothra": null,
                    "dosham": null,
                    "income": null,
                    "nationality": null,
                    "about_partner": null,
                    "country_txt": "",
                    "religion_txt": "Hindu",
                    "mothertongue_txt": "Bhojpuri"
                },
                "images": []
            },
            "shortlisted": false,
            "interest": "",
            "communication": {"received": [], "sent": []},
            "error": false,
            "code": 200,
            "message": "success"
        }

        function editAction(action) {
            $scope[action] = !$scope[action];
        }
        function editReligion(relogious) {
            $scope[relogious] = !$scope[relogious];
        }

        function editLocation(obj) {
            $scope[obj] = !$scope[obj];
            if($scope.profile.login_user.id_country != null) {
                $scope.countryList.filter(function (a) {
                    if (a.id_country === $scope.profile.login_user.id_country) {
                        $scope.setLocation.country = a;
                    }
                    if (a.id_country === $scope.profile.login_user.nationality) {
                        $scope.setLocation.nationality = a;
                    }

                })
                if($scope.profile.login_user.id_state != null) {
                    $http({
                        method: 'GET',
                        url: 'http://devapi.peoplematrimony.com/populate?id_country=' + $scope.profile.login_user.id_country
                    }).then(function successCallback(response) {
                        $scope.stateList = response.data.states;
                        $scope.stateList.filter(function (a) {
                            if (a.id_state === $scope.profile.login_user.id_state) {
                                $scope.setLocation.state = a;
                            }
                        })
                        if($scope.profile.login_user.id_city != null) {

                            $http({
                                method: 'GET',
                                url: 'http://devapi.peoplematrimony.com/populate?id_state='+$scope.profile.login_user.id_state
                            }).then(function successCallback(response) {
                                $scope.cityList = response.data.cities;
                                $scope.cityList.filter(function (a) {
                                    if (a.id_city === $scope.profile.login_user.id_city) {
                                        $scope.setLocation.city = a;
                                    }
                                });
                            }, function errorCallback(response) {

                            });
                        }

                        }, function errorCallback(response) {

                    });
                }




            }


        }



        function aboutme() {
            $http({
                method: 'PUT',
                url: 'https://devapi.peoplematrimony.com/user/edit/' + storageService.get('id') + '?' +
                'block=about&about=' + $scope.profile.login_user.aboutme + '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $scope.about = !$scope.about;

            }, function errorCallback(response) {
            });
        }
        function aboutfamily() {
            $http({
                method: 'PUT',
                url: 'https://devapi.peoplematrimony.com/user/edit/' + storageService.get('id') + '?' +
                'block=fdetail&about=' + $scope.profile.login_user.about_family + '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $scope.fabout = !$scope.fabout;

            }, function errorCallback(response) {
            });
        }
        function basic() {
            console.log($scope.profile)
            $http({
                method: 'PUT',
                url: 'https://devapi.peoplematrimony.com/user/edit/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token")+'&block=basic&' +
                '&weight=' + $scope.profile.login_user.weight +
                '&body_type=' + $scope.profile.login_user.body_type +
                '&height=' + $scope.profile.login_user.height +
                '&mothertongue=' + parseInt($scope.profile.login_user.id_mothertongue) +
                '&marital_status=' + $scope.profile.login_user.marital_status +
                '&complexion=' + $scope.profile.login_user.complexion +
                '&physical_status=' + $scope.profile.login_user.physical_status +
                '&eating_habits=' + $scope.profile.login_user.eating_habit +
                '&drinking_habits=' + $scope.profile.login_user.drinking_habit +
                '&smoking_habits=' + $scope.profile.login_user.smoking_habit
            }).then(function successCallback(response) {
                console.log("success",response)
            }, function errorCallback(response) {
                console.log("error",response)

            });
        }
        function saveReliegion() {
            console.log($scope.profile)
            $http({
                method: 'PUT',
                url: 'https://devapi.peoplematrimony.com/user/edit/' + storageService.get('id') + '?' +
                'block=religious&' +
                'religion=' + $scope.profile.login_user.id_religion +
                '&caste=' + $scope.profile.login_user.id_caste +
                //'gothra=' + $scope.profile.login_user.age +
                '&star=' + $scope.profile.login_user.id_star +
                '&dosham=' + $scope.profile.login_user.dosham +
                '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $scope.relogious = !$scope.relogious;
            }, function errorCallback(response) {
                console.log("error",response)

            });
        }


        function saveLocation() {
            console.log($scope.profile)
            $http({
                method: 'PUT',
                url: 'https://devapi.peoplematrimony.com/user/edit/' + storageService.get('id') + '?' +
                'block=location&' +
                '&country=' + $scope.profile.login_user.country +
                '&state=' + $scope.profile.login_user.id_star +
                '&city=' + $scope.profile.login_user.dosham +
                '&nationality=1'+
                '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $scope.relogious = !$scope.relogious;
            }, function errorCallback(response) {
                console.log("error",response)

            });
        }


    };

    //}
})();