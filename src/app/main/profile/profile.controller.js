(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($http, $scope,$state, storageService,$stateParams,populate,profile,$window) {

        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.setLocation= {country:null,state:null,city:null,nationality:null,nationality_name:null};
        $scope.setReligion= {religion:null,caste:null,star:null};
        $scope.setProfession= {education:null,occupation:null,occupation_cat:null};
        $scope.countryList = populate.countries;




        $scope.motherTongueList = populate.mothertongue;
        $scope.religonList = populate.religon;
        $scope.starsList = populate.stars;
        $scope.occupationCategoryList = populate.occupation_category;
        $scope.educationCategoryList = populate.education_category;
        $scope.educationList = populate.education;
        console.log( $scope.educationList)
        $scope.occupation = populate.occupation;
        $scope.profile= profile;
        if($scope.profile.login_user.nationality != 0) {
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
        $scope.castList = [];


        $scope.editAction = editAction;
        $scope.editReligion = editReligion;
        $scope.editLocation = editLocation;
        $scope.editProfession = editProfession;


        $scope.aboutme = aboutme;
        $scope.aboutfamily = aboutfamily;
        $scope.basic = basic;
        $scope.selectCountry = selectCountry;
        $scope.selectState = selectState;
        $scope.selectReliegion = selectReliegion;
        $scope.saveReliegion = saveReliegion;
        $scope.saveLocation = saveLocation;
        $scope.saveProfession = saveProfession;

        if($scope.profile.login_user.id_religion != null){
            $scope.selectReliegion($scope.profile.login_user.id_religion);
        }








        function selectCountry(obj){
            if(obj != null) {
                $http({
                    method: 'GET',
                    url: 'http://devapi.peoplematrimony.com/populate?id_country=' + obj.id_country
                }).then(function successCallback(response) {
                    $scope.stateList = response.data.states;
                }, function errorCallback(response) {

                });
            }
        }

        function selectState(obj){
            if(obj != null) {
                $http({
                    method: 'GET',
                    url: 'http://devapi.peoplematrimony.com/populate?id_state=' + obj.id_state
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.cityList = response.data.cities;
                }, function errorCallback(response) {

                });
            }
        }

        function selectReliegion(religion){

            console.log(religion)
            if(religion != null) {
                $http({
                    method: 'GET',
                    url: 'http://devapi.peoplematrimony.com/populate?id_mothertongue=' + $scope.profile.login_user.id_mothertongue + '&id_religion=' + religion.id_religion
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.castList = response.data.caste;
                }, function errorCallback(response) {

                });
            }
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
            if($scope.profile.login_user.id_religion != null|| $scope.profile.login_user.id_religion != 0){
                $scope.religonList.filter(function (a) {
                    if (a.id_religion === $scope.profile.login_user.id_religion) {
                        $scope.setReligion.religion = a;
                    }
                })
                $http({
                    method: 'GET',
                    url: 'http://devapi.peoplematrimony.com/populate?id_mothertongue=' + $scope.profile.login_user.id_mothertongue + '&id_religion=' + $scope.profile.login_user.id_religion
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.castList = response.data.caste;
                    $scope.castList.filter(function (a) {
                        if (a.id_caste === $scope.profile.login_user.id_caste) {
                            $scope.setReligion.caste = a;
                        }
                    })
                }, function errorCallback(response) {

                });


            }

            if($scope.profile.login_user.id_star != null && $scope.profile.login_user.id_star != 0){
                $scope.starsList.filter(function (a) {
                    if (a.id_star === $scope.profile.login_user.id_star) {
                        $scope.setReligion.star = a;
                    }
                })
            }
        }
        function editLocation(obj) {
            $scope[obj] = !$scope[obj];
            if($scope.profile.login_user.id_country != 0) {
                $scope.countryList.filter(function (a) {
                    if (a.id_country === $scope.profile.login_user.id_country) {
                        $scope.setLocation.country = a;
                    }
                    if (a.id_country === $scope.profile.login_user.nationality) {
                        $scope.setLocation.nationality = a;
                    }

                })
                if($scope.profile.login_user.id_state != 0) {
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
                        if($scope.profile.login_user.id_city != 0) {

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

        function editProfession(obj) {
            $scope[obj] = !$scope[obj];
            if($scope.profile.login_user.id_education != null && $scope.profile.login_user.id_education != 0) {
                $scope.educationList.filter(function (a) {
                    if (a.id_education === $scope.profile.login_user.id_education) {
                        $scope.setProfession.education = a;
                    }
                })
            }

            if($scope.profile.login_user.id_occupation != null && $scope.profile.login_user.id_occupation != 0) {
                $scope.occupation.filter(function (a) {
                    if (a.id_occupation === $scope.profile.login_user.id_occupation) {
                        $scope.setProfession.occupation = a;
                    }
                })
            }
            if($scope.profile.login_user.id_occucategory != null && $scope.profile.login_user.id_occucategory != 0) {
                $scope.occupationCategoryList.filter(function (a) {
                    if (a.id_occupation_category === $scope.profile.login_user.id_occucategory) {
                        $scope.setProfession.occupation_cat = a;
                    }
                })
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
                '&physical_type=' + $scope.profile.login_user.physical_status +
                '&eating_habits=' + $scope.profile.login_user.eating_habit +
                '&drinking_habits=' + $scope.profile.login_user.drinking_habit +
                '&smoking_habits=' + $scope.profile.login_user.smoking_habit
            }).then(function successCallback(response) {
                console.log("success",response)
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });

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
                'religion=' + $scope.setReligion.religion.id_religion +
                '&caste=' + $scope.setReligion.caste.id_caste +
                '&gothra=' + $scope.profile.login_user.gothra +
                '&mothertongue=' + $scope.profile.login_user.id_mothertongue +
                '&star=' + $scope.setReligion.star.id_star +
                '&dosham=' + $scope.profile.login_user.dosham +
                '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }, function errorCallback(response) {
                console.log("error",response)

            });
        }
        function saveLocation() {
            $http({
                method: 'PUT',
                url: 'https://devapi.peoplematrimony.com/user/edit/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") +'&block=location&' +
                '&country=' + $scope.setLocation.country.id_country +
                '&state=' + $scope.setLocation.state.id_state +
                '&city=' + $scope.setLocation.city.id_city +
                '&nationality='+$scope.setLocation.nationality.id_country
            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
                           }, function errorCallback(response) {
                console.log("error",response)

            });
        }

        function saveProfession() {
            $http({
                method: 'PUT',
                url: 'https://devapi.peoplematrimony.com/user/edit/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") +'&block=profession&' +
                '&edu_detail=' + $scope.profile.login_user.education_detail +
                '&education=' + $scope.setProfession.education.id_education +
                '&income=' + $scope.profile.login_user.income +
                '&occu_cat=' + $scope.setProfession.occupation_cat.id_occupation_category +
                '&occupation='+$scope.setProfession.occupation.id_occupation
            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
                           }, function errorCallback(response) {
                console.log("error",response)

            });
        }


    };

    //}
})();