(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($http, $scope,$location, $state, resourceUrl, storageService, $stateParams, populate, profile, $window) {

        $('html, body').animate({
            scrollTop: 0
        }, 'fast');

        $scope.focustype = $stateParams.type;

        console.log("profile",profile)



        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.setLocation = {
            country: null,
            state: null,
            city: null,
            nationality: null,
            nationality_name: null
        };
        $scope.setPartnerLocation = {
            country: null,
            state: null,
            city: null,
            nationality: null,
            nationality_name: null
        };
        $scope.setPartnerBasic = {
            eating_habits: [],
            drinking_habits: [],
            smoking_habits:[],
            marital_status:[],
            mother_tongue_list:[],
            physical_status:[]
        };
        $scope.setReligion = {
            religion: null,
            caste: null,
            star: null
        };
        $scope.setPartnerReligion = {
            religion: [],
            caste: [],
            star: []
        };
        $scope.setProfession = {
            education: null,
            occupation: null,
            occupation_cat: null
        };
        $scope.setPartnerProfession = {
            education: [],
            occupation: [],
            occupation_cat: []
        };
        $scope.setFamily = {
            orgin: null,
            orgin_name: null
        };
        $scope.countryList = populate.countries;
        $scope.selectLanguage = {
            motherTongue: null
        };
        $scope.sisDis = false;
        $scope.broDis = false;

        $scope.displayAboutme = 75;
        $scope.displayAboutFamily = 75;
        $scope.displayAboutlookingFor = 75;
        $scope.showFullDetails = showFullDetails;

        function showFullDetails(obj1,obj2){
            $scope[obj1] = obj2.length;

        }




        $scope.motherTongueList = populate.mothertongue;
        $scope.religonList = populate.religon;
        $scope.eatingHabitsList = ["Vegetarian","Nonvegetarian","Eggeterian"];
        $scope.smokingHabitsList = ["Yes","No","Occationally"];
        $scope.drinkingHabitsList = ["Yes","No","Occationally"];
        $scope.martialStatusList = ["Never Married","Widowed","Divorced","Awaiting divorce"];
        $scope.physicalStatusList = ["Normal","Challenged","Any"];
        $scope.starsList = populate.stars;
        $scope.occupationCategoryList = populate.occupation_category;
        $scope.educationCategoryList = populate.education_category;
        $scope.educationList = populate.education;
        $scope.occupation = populate.occupation;
        $scope.profile = profile;

        console.log("profile", $scope.profile);
        if ($scope.profile.login_user.id_mothertongue != null && $scope.profile.login_user.id_mothertongue != 0) {
            $scope.motherTongueList.filter(function(a) {
                if (a.id_mothertongue === $scope.profile.login_user.id_mothertongue) {
                    $scope.selectLanguage.motherTongue = a;
                }

            })
        }
        if ($scope.profile.login_user.nationality != null && $scope.profile.login_user.nationality != 0) {


            $scope.countryList.filter(function(a) {
                if (a.id_country === $scope.profile.login_user.nationality) {
                    $scope.setLocation.nationality_name = a.country_name;
                }

            })
        }
        if ($scope.profile.login_user.ancestral_origin != null && $scope.profile.login_user.ancestral_origin != 0) {
            $scope.countryList.filter(function(a) {
                if (a.id_country === $scope.profile.login_user.ancestral_origin) {
                    $scope.setFamily.orgin_name = a.country_name;
                }
            })
        }

        console.log("profile", $scope.profile)



        $scope.about = false;
        $scope.fabout = false;
        $scope.basicDetails = false;
        $scope.basic = false;
        $scope.location = true;
        $scope.relogious = true;
        $scope.education = true;
        $scope.fdetails = true;
        $scope.preligion = true;
        $scope.pLocation = true;
        $scope.pedu = true;
        $scope.ptype = true;

        $scope.partnerBasic = true;

        $scope.stateList = [];
        $scope.cityList = [];
        $scope.castList = [];


        $scope.editAction = editAction;
        $scope.editReligion = editReligion;
        $scope.editLocation = editLocation;
        $scope.editPartnerLocation = editPartnerLocation;
        $scope.editProfession = editProfession;
        $scope.editFamilyDetails = editFamilyDetails;
        $scope.editPartnerBasic = editPartnerBasic;
        $scope.editPartnerType = editPartnerType;
        $scope.editPartnerReligion = editPartnerReligion;
        $scope.editPartnerEdu = editPartnerEdu;
        $scope.aboutme = aboutme;
        $scope.savePartnerAbout = savePartnerAbout;
        $scope.aboutfamily = aboutfamily;
        $scope.basic = basic;
        $scope.selectCountry = selectCountry;
        $scope.selectState = selectState;
        $scope.selectReliegion = selectReliegion;
        $scope.saveReliegion = saveReliegion;
        $scope.savePartnerReliegion = savePartnerReliegion;
        $scope.saveLocation = saveLocation;
        $scope.savePartnerLocation = savePartnerLocation;
        $scope.saveProfession = saveProfession;
        $scope.savePartnerProfession = savePartnerProfession;
        $scope.saveFamilyDetails = saveFamilyDetails;
        $scope.savePartnerBasic = savePartnerBasic;

        $scope.calculateHeight = calculateHeight;
        $scope.commaSeperatedValue = commaSeperatedValue;
        if($scope.focustype == 'partner'){
            $location.hash('partnerPreferences');

        }

        if($scope.focustype == 'add_drinking' ||
            $scope.focustype == 'add_smoking'){
            $location.hash('basicdetails');
            $scope.basicDetails = true;
        }
        if($scope.focustype == 'add_income' || $scope.focustype == 'add_occupation'){
                    $location.hash('prof_info');
                    $scope.education = true;
        }
        if($scope.focustype == 'add_about_family'){
                    $location.hash('prof_info');
                    $scope.education = true;
        }
        if($scope.focustype == 'add_family' ||
            $scope.focustype == 'add_family_status' ||
            $scope.focustype == 'add_origin'){
                    $location.hash('family_details');
                    $scope.fdetails = true;
        }


        $scope.$watch('setPartnerReligion.religion', selectRegliousPreference);


        function calculateHeight(obj) {
            var h;

            if (obj == 137) h = "4ft 6in- 137 cm";

            if (obj == 139) h = "4ft 7in- 139 cm";

            if (obj == 142) h = "4ft 8in- 142 cm";

            if (obj == 144) h = "4ft 9in- 144 cm";

            if (obj == 147) h = "4ft 10in- 147 cm";

            if (obj == 149) h = "4ft 11in- 149 cm";

            if (obj == 152) h = "5ft- 152 cm";

            if (obj == 154) h = "5ft 1in- 154 cm";

            if (obj == 157) h = "5ft 2in- 157 cm";

            if (obj == 160) h = "5ft 3in- 160 cm";

            if (obj == 160) h = "5ft 3in- 160 cm";

            if (obj == 162) h = "5ft 4in- 162 cm";

            if (obj == 165) h = "5ft 5in- 165 cm";

            if (obj == 167) h = "5ft 6in- 167 cm";

            if (obj == 170) h = "5ft 7in- 170 cm";

            if (obj == 172) h = "5ft 8in- 172 cm";

            if (obj == 175) h = "5ft 9in- 175 cm";

            if (obj == 177) h = "5ft 10in- 177 cm";

            if (obj == 180) h = "5ft 11in- 180 cm";

            if (obj == 182) h = "6ft- 182 cm";

            if (obj == 185) h = "6ft 1in- 185 cm";

            if (obj == 187) h = "6ft 2in- 187 cm";

            if (obj == 190) h = "6ft 3in- 190 cm";

            if (obj == 193) h = "6ft 4in- 193 cm";

            if (obj == 193) h = "6ft 4in- 193 cm";

            if (obj == 195) h = "6ft 5in- 195 cm";

            if (obj == 198) h = "6ft 6in- 198 cm";

            if (obj == 200) h = "6ft 7in- 200 cm";

            if (obj == 203) h = "6ft 8in- 203 cm";

            if (obj == 205) h = "6ft 9in- 205 cm";

            if (obj == 208) h = "6ft 10in- 208 cm";

            if (obj == 210) h = "6ft 11in- 210 cm";

            return h;
        }

        function commaSeperatedValue(obj){
            if(obj != null) {
                return obj.split('~').join(', ');
            }
        }



        function selectRegliousPreference() {

            if ($scope.setPartnerReligion.religion.length > 0) {
                var ids = [];
                $scope.setPartnerReligion.religion.filter(function(a) {
                    ids.push(a.id_religion)

                });

                console.log(ids.join(','))
                ids = ids.join(',');
                $http({
                    method: 'GET',
                    url: resourceUrl.url() + 'populate?id_religions=' + ids
                }).then(function successCallback(response) {
                    $scope.castList = response.data.caste;
                    console.log(response)

                }, function errorCallback(response) {

                });
            }

        }

        $scope.cancel = cancel;
        if ($scope.profile.login_user.id_religion != null) {
            $scope.selectReliegion($scope.profile.login_user.id_religion);
        }

        function cancel() {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });

        }

        function selectCountry(obj) {
            if (obj != null) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url() + 'populate?id_country=' + obj.id_country
                }).then(function successCallback(response) {
                    $scope.stateList = response.data.states;
                    $scope.cityList = []
                    $scope.setLocation.state = '';
                    $scope.setLocation.city = '';

                }, function errorCallback(response) {

                });
            }
        }

        function selectState(obj) {
            if (obj != null) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url() + 'populate?id_state=' + obj.id_state
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.cityList = response.data.cities;
                    $scope.setLocation.city = '';
                }, function errorCallback(response) {

                });
            }
        }

        function selectReliegion(religion) {

            console.log(religion)
            if (religion != null) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url() + 'populate?id_mothertongue=' + $scope.profile.login_user.id_mothertongue + '&id_religion=' + religion.id_religion
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.castList = response.data.caste;
                }, function errorCallback(response) {

                });
            }
        }

        function editAction(action) {
            $scope[action] = !$scope[action];
        }

        function editReligion(relogious) {
            $scope[relogious] = !$scope[relogious];
            if ($scope.profile.login_user.id_religion != null || $scope.profile.login_user.id_religion != 0) {
                $scope.religonList.filter(function(a) {
                    if (a.id_religion === $scope.profile.login_user.id_religion) {
                        $scope.setReligion.religion = a;
                    }
                })
                $http({
                    method: 'GET',
                    url: resourceUrl.url() + 'populate?id_mothertongue=' + $scope.profile.login_user.id_mothertongue + '&id_religion=' + $scope.profile.login_user.id_religion
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.castList = response.data.caste;
                    $scope.castList.filter(function(a) {
                        if (a.id_caste === $scope.profile.login_user.id_caste) {
                            $scope.setReligion.caste = a;
                        }
                    })
                }, function errorCallback(response) {

                });


            }

            if ($scope.profile.login_user.id_star != null && $scope.profile.login_user.id_star != 0) {
                $scope.starsList.filter(function(a) {
                    if (a.id_star === $scope.profile.login_user.id_star) {
                        $scope.setReligion.star = a;
                    }
                })
            }
        }

        function editLocation(obj) {
            $scope[obj] = !$scope[obj];
            if ($scope.profile.login_user.id_country != 0) {
                $scope.countryList.filter(function(a) {
                    if (a.id_country === $scope.profile.login_user.id_country) {
                        $scope.setLocation.country = a;
                    }
                    if (a.id_country === $scope.profile.login_user.nationality) {
                        $scope.setLocation.nationality = a;
                    }

                })
                if ($scope.profile.login_user.id_state != 0) {
                    $http({
                        method: 'GET',
                        url: resourceUrl.url() + 'populate?id_country=' + $scope.profile.login_user.id_country
                    }).then(function successCallback(response) {
                        $scope.stateList = response.data.states;
                        $scope.stateList.filter(function(a) {
                            if (a.id_state === $scope.profile.login_user.id_state) {
                                $scope.setLocation.state = a;
                            }
                        })
                        if ($scope.profile.login_user.id_city != 0) {

                            $http({
                                method: 'GET',
                                url: resourceUrl.url() + 'populate?id_state=' + $scope.profile.login_user.id_state
                            }).then(function successCallback(response) {
                                $scope.cityList = response.data.cities;
                                $scope.cityList.filter(function(a) {
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

        function editPartnerLocation(obj) {
            $scope[obj] = !$scope[obj];
            if ($scope.profile.login_user.preferences.country != null && $scope.profile.login_user.preferences.country != 0) {
                $scope.countryList.filter(function(a) {
                    if (a.id_country == $scope.profile.login_user.preferences.country) {
                        $scope.setPartnerLocation.country = a;
                    }
                    if (a.id_country == $scope.profile.login_user.preferences.nationality) {
                        $scope.setPartnerLocation.nationality = a;
                    }

                })
                if ($scope.profile.login_user.preferences.state != null && $scope.profile.login_user.preferences.state != 0) {
                    $http({
                        method: 'GET',
                        url: resourceUrl.url() + 'populate?id_country=' + $scope.profile.login_user.preferences.country
                    }).then(function successCallback(response) {
                        $scope.stateList = response.data.states;
                        $scope.stateList.filter(function(a) {
                            if (a.id_state == $scope.profile.login_user.preferences.state) {
                                $scope.setPartnerLocation.state = a;
                            }
                        })
                        if ($scope.profile.login_user.preferences.city != null && $scope.profile.login_user.preferences.city != 0) {

                            $http({
                                method: 'GET',
                                url: resourceUrl.url() + 'populate?id_state=' + $scope.profile.login_user.preferences.state
                            }).then(function successCallback(response) {
                                $scope.cityList = response.data.cities;
                                $scope.cityList.filter(function(a) {
                                    if (a.id_city == $scope.profile.login_user.preferences.city) {
                                        $scope.setPartnerLocation.city = a;
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
            if ($scope.profile.login_user.id_education != null && $scope.profile.login_user.id_education != 0) {
                $scope.educationList.filter(function(a) {
                    if (a.id_education === $scope.profile.login_user.id_education) {
                        $scope.setProfession.education = a;
                    }
                })
            }

            if ($scope.profile.login_user.id_occupation != null && $scope.profile.login_user.id_occupation != 0) {
                $scope.occupation.filter(function(a) {
                    if (a.id_occupation === $scope.profile.login_user.id_occupation) {
                        $scope.setProfession.occupation = a;
                    }
                })
            }
            if ($scope.profile.login_user.id_occucategory != null && $scope.profile.login_user.id_occucategory != 0) {
                $scope.occupationCategoryList.filter(function(a) {
                    if (a.id_occupation_category === $scope.profile.login_user.id_occucategory) {
                        $scope.setProfession.occupation_cat = a;
                    }
                })
            }


        }

        function editFamilyDetails(obj) {
            $scope[obj] = !$scope[obj];
            if ($scope.profile.login_user.ancestral_origin != null && $scope.profile.login_user.ancestral_origin != 0) {
                $scope.countryList.filter(function(a) {
                    if (a.id_country === $scope.profile.login_user.ancestral_origin) {
                        $scope.setFamily.orgin = a;
                    }
                })
            }



        }


        function editPartnerBasic(obj) {
            if($scope.profile.login_user.preferences.marital_status !='')
            $scope.setPartnerBasic.eating_habits = $scope.profile.login_user.preferences.eating_habits.split("~");
            $scope.setPartnerBasic.drinking_habits = $scope.profile.login_user.preferences.drinking_habits.split("~");
            $scope.setPartnerBasic.smoking_habits = $scope.profile.login_user.preferences.smoking_habits.split("~");
            $scope.setPartnerBasic.marital_status = $scope.profile.login_user.preferences.marital_status.split(",");
            $scope.setPartnerBasic.mother_tongue_list = [];

            if ($scope.profile.login_user.preferences.mothertongue != null && $scope.profile.login_user.preferences.mothertongue != "null") {

                var array = $scope.profile.login_user.preferences.mothertongue.split('~');
                for (var i = 0; i < array.length; i++) {
                    $scope.motherTongueList.filter(function(a) {
                        if (a.id_mothertongue == array[i]) {
                            $scope.setPartnerBasic.mother_tongue_list.push(a);
                        }
                    })
                }

            }


            $scope[obj] = !$scope[obj];


        }

        function editPartnerType(obj) {
            $scope[obj] = !$scope[obj];
        }

        function editPartnerEdu(obj) {
            $scope[obj] = !$scope[obj];
            if ($scope.profile.login_user.preferences.education != null && $scope.profile.login_user.preferences.education != 0) {

                var array = $scope.profile.login_user.preferences.education.split('~');
                for (var i = 0; i < array.length; i++) {
                    $scope.educationList.filter(function(a) {
                        if (a.id_education == array[i]) {
                            $scope.setPartnerProfession.education.push(a);
                        }
                    })
                }

            }

            if ($scope.profile.login_user.preferences.occupation != null && $scope.profile.login_user.preferences.occupation != 0) {
                var array = $scope.profile.login_user.preferences.occupation.split('~');
                if (array != '' && array.length > 0) {

                    $scope.placeOccupation = array.length + ' selected';

                    for (var i = 0; i < array.length; i++) {
                        $scope.occupation.filter(function(a) {
                            if (a.id_occupation == array[i]) {
                                $scope.setPartnerProfession.occupation.push(a);
                            }
                        })
                    }
                }


            }
        }

        $scope.placeReligion = 'Any';
        $scope.placeCaste = 'Any';
        $scope.placeStar = 'Any';
        $scope.placeOccupation = 'Any';




        function editPartnerReligion(obj) {
            $scope[obj] = !$scope[obj];
            console.log($scope.profile)
            if ($scope.profile.login_user.preferences.religion != null &&
                $scope.profile.login_user.preferences.religion != 0) {

                var array = $scope.profile.login_user.preferences.religion.split('~');
                if (array != '' && array.length > 0) {
                    $scope.placeReligion = array.length + ' selected';
                    for (var i = 0; i < array.length; i++) {
                        console.log(array[i])
                        $scope.religonList.filter(function(a) {
                            if (a.id_religion == array[i]) {
                                $scope.setPartnerReligion.religion.push(a);
                            }
                        })
                    }
                    $http({
                        method: 'GET',
                        url: resourceUrl.url() + 'populate?id_religions=' + array.join(',')
                    }).then(function successCallback(response) {
                        $scope.castList = response.data.caste;
                        console.log(response)
                        var array1 = $scope.profile.login_user.preferences.caste.split('~');
                        if (array1 != '' && array1.length > 0) {
                            $scope.placeCaste = array1.length + ' selected';

                            for (var i = 0; i < array1.length; i++) {
                                $scope.castList.filter(function(a) {
                                    if (a.id_caste == array[i]) {
                                        $scope.setPartnerReligion.caste.push(a);
                                    }
                                })
                            }
                        }



                    }, function errorCallback(response) {
                        $scope.placeReligion = 'Any';

                    });
                } else {

                }


            }

            if ($scope.profile.login_user.preferences.star != null && $scope.profile.login_user.preferences.star != 0) {
                var array = $scope.profile.login_user.preferences.star.split('~');
                if (array != '' && array.length > 0) {
                    $scope.placeStar = array.length + ' selected';

                    for (var i = 0; i < array.length; i++) {
                        console.log(array[i])
                        $scope.starsList.filter(function(a) {
                            if (a.id_star == array[i]) {
                                $scope.setPartnerReligion.star.push(a);
                            }
                        })
                    }
                }

            }
        }



        function aboutme() {
            $scope.showAboutMeError = false;
            if ($scope.profile.login_user.aboutme != null && $scope.profile.login_user.aboutme.length > 50) {
                $http({
                    method: 'PUT',
                    url: resourceUrl.url() + 'user/edit/' + storageService.get('id') + '?' +
                    'block=about&about=' + $scope.profile.login_user.aboutme + '&token=' + storageService.get("token")
                }).then(function successCallback(response) {
                    $scope.about = !$scope.about;

                }, function errorCallback(response) {});
            } else {
                $scope.showAboutMeError = true;
            }
        }

        function savePartnerAbout() {

            $http({
                method: 'PUT',
                url: resourceUrl.url() + 'user/edit/pref/' + storageService.get('id') + '?' +
                'block=about' +
                '&about=' + $scope.profile.login_user.preferences.about_partner + '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $scope.ptype = !$scope.ptype;

            }, function errorCallback(response) {});
        }

        function aboutfamily() {
            $http({
                method: 'PUT',
                url: resourceUrl.url() + 'user/edit/' + storageService.get('id') + '?' +
                'block=fdetail&about=' + $scope.profile.login_user.about_family + '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $scope.fabout = !$scope.fabout;

            }, function errorCallback(response) {});
        }

        function basic() {
            console.log($scope.profile)
            console.log($scope.selectMotherTounge);
            var selectMother = 0;
            if ($scope.selectLanguage.motherTongue != null) {
                selectMother = $scope.selectLanguage.motherTongue.id_mothertongue;
            }
            $http({
                method: 'PUT',
                url: resourceUrl.url() + 'user/edit/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") + '&block=basic&' +
                '&weight=' + $scope.profile.login_user.weight +
                '&profile_for=' + $scope.profile.login_user.profile_for +
                '&body_type=' + $scope.profile.login_user.body_type +
                '&height=' + $scope.profile.login_user.height +
                '&mothertongue=' + selectMother +
                '&marital_status=' + $scope.profile.login_user.marital_status +
                '&complexion=' + $scope.profile.login_user.complexion +
                '&physical_type=' + $scope.profile.login_user.physical_status +
                '&eating_habits=' + $scope.profile.login_user.eating_habit +
                '&drinking_habits=' + $scope.profile.login_user.drinking_habit +
                '&smoking_habits=' + $scope.profile.login_user.smoking_habit
            }).then(function successCallback(response) {
                console.log("success", response)
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });

            }, function errorCallback(response) {
                console.log("error", response)

            });
        }

        function savePartnerBasic() {
            var mt_id = null;


            console.log($scope.setPartnerBasic.physical_status.join("~"));

            if ($scope.setPartnerBasic.mother_tongue_list.length > 0) {
                var mt_arr = [];
                for (var i = 0; i < $scope.setPartnerBasic.mother_tongue_list.length; i++) {
                    mt_arr.push($scope.setPartnerBasic.mother_tongue_list[i].id_mothertongue);
                }
                mt_id = mt_arr.join('~');
            }
            console.log(mt_id)

            $http({
                method: 'PUT',
                url: resourceUrl.url() + 'user/edit/pref/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") + '&block=basic' +
                '&age_end=' + $scope.profile.login_user.preferences.age_end +
                '&age_start=' + $scope.profile.login_user.preferences.age_start +
                '&drinking_habits=' + $scope.setPartnerBasic.drinking_habits.join("~") +
                '&eating_habits=' + $scope.setPartnerBasic.eating_habits.join("~") +
                '&smoking_habits=' + $scope.setPartnerBasic.smoking_habits.join("~") +
                '&height_end=' + $scope.profile.login_user.preferences.height_end +
                '&height_start=' + $scope.profile.login_user.preferences.height_start +
                '&marital_status=' + $scope.setPartnerBasic.marital_status.join() +
                '&mothertongue=' + mt_id +
                '&physical_status=' + $scope.setPartnerBasic.physical_status.join("~")
            }).then(function successCallback(response) {
                console.log("success", response)
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });

            }, function errorCallback(response) {
                console.log("error", response)

            });
        }

        function saveReliegion() {
            var reg_id = 0;
            var caste_id = 0;
            var star_id = 0;
            if ($scope.setReligion.religion != null) {
                reg_id = $scope.setReligion.religion.id_religion;
            }
            if ($scope.setReligion.star != null) {
                star_id = $scope.setReligion.star.id_star;
            }
            if ($scope.setReligion.caste != null) {
                caste_id = $scope.setReligion.caste.id_caste;
            }
            $http({
                method: 'PUT',
                url: resourceUrl.url() + 'user/edit/' + storageService.get('id') + '?' +
                'block=religious&' +
                'religion=' + reg_id +
                '&caste=' + caste_id +
                '&gothra=' + $scope.profile.login_user.gothra +
                '&mothertongue=' + $scope.profile.login_user.id_mothertongue +
                '&star=' + star_id +
                '&dosham=' + $scope.profile.login_user.dosham +
                '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }, function errorCallback(response) {
                console.log("error", response)

            });
        }

        function savePartnerReliegion() {
            var reg_id = 0;
            var caste_id = 0;
            var star_id = 0;
            console.log($scope.setPartnerReligion.religion)
            console.log($scope.setPartnerReligion.star)
            console.log($scope.setPartnerReligion.caste)

            if ($scope.setPartnerReligion.religion.length > 0) {
                var reg_arr = [];
                for (var i = 0; i < $scope.setPartnerReligion.religion.length; i++) {
                    reg_arr.push($scope.setPartnerReligion.religion[i].id_religion);
                }
                reg_id = reg_arr.join('~');
            }
            if ($scope.setPartnerReligion.star.length > 0) {
                var star_arr = [];
                for (var i = 0; i < $scope.setPartnerReligion.star.length; i++) {
                    star_arr.push($scope.setPartnerReligion.star[i].id_star);
                }
                star_id = star_arr.join('~');
            }
            if ($scope.setPartnerReligion.caste.length > 0) {
                var caste_arr = [];
                for (var i = 0; i < $scope.setPartnerReligion.caste.length; i++) {
                    caste_arr.push($scope.setPartnerReligion.caste[i].id_caste);
                }
                caste_id = caste_arr.join('~');
            }


            $http({
                method: 'PUT',
                url: resourceUrl.url() + 'user/edit/pref/' + storageService.get('id') + '?' +
                'block=religious&' +
                'religion=' + reg_id +
                '&caste=' + caste_id +
                '&gothra=' + $scope.profile.login_user.preferences.gothra +
                '&star=' + star_id +
                '&dosham=' + $scope.profile.login_user.preferences.dosham +
                '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }, function errorCallback(response) {
                console.log("error", response)

            });
        }

        function saveLocation() {
            var country_id = 0;
            var state_id = 0;
            var city_id = 0;
            var nationality_id = 0;
            if ($scope.setLocation.country != null) {
                country_id = $scope.setLocation.country.id_country
            }
            if ($scope.setLocation.state != null) {
                state_id = $scope.setLocation.state.id_state
            }
            if ($scope.setLocation.city != null) {
                city_id = $scope.setLocation.city.id_city
            }
            if ($scope.setLocation.nationality != null) {
                nationality_id = $scope.setLocation.nationality.id_country
            }
            $http({
                method: 'PUT',
                url: resourceUrl.url() + 'user/edit/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") + '&block=location&' +
                '&country=' + country_id +
                '&state=' + state_id +
                '&city=' + city_id +
                '&nationality=' + nationality_id
            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }, function errorCallback(response) {
                console.log("error", response)

            });
        }

        function savePartnerLocation() {
            var country_id = 0;
            var state_id = 0;
            var city_id = 0;
            var nationality_id = 0;
            if ($scope.setPartnerLocation.country != null) {
                country_id = $scope.setPartnerLocation.country.id_country
            }
            if ($scope.setPartnerLocation.state != null) {
                state_id = $scope.setPartnerLocation.state.id_state
            }

            if ($scope.setPartnerLocation.city != null) {
                city_id = $scope.setPartnerLocation.city.id_city
            }
            if ($scope.setPartnerLocation.nationality != null) {
                nationality_id = $scope.setPartnerLocation.nationality.id_country
            }

            $http({
                method: 'PUT',
                url: resourceUrl.url() + 'user/edit/pref/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") + '&block=location' +
                '&country=' + country_id +
                '&state=' + state_id +
                '&city=' + city_id +
                '&nationality=' + nationality_id
            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }, function errorCallback(response) {
                console.log("error", response)

            });
        }

        function saveProfession() {
            var edu_id = 0;
            var occu_id = 0;
            var cat_id = 0;
            if ($scope.setProfession.education != null) {
                edu_id = $scope.setProfession.education.id_education;
            }
            if ($scope.setProfession.occupation_cat != null) {
                cat_id = $scope.setProfession.occupation_cat.id_occupation_category;
            }
            if ($scope.setProfession.occupation != null) {
                occu_id = $scope.setProfession.occupation.id_occupation;
            }
            $http({
                method: 'PUT',
                url: resourceUrl.url() + 'user/edit/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") + '&block=profession&' +
                '&edu_detail=' + $scope.profile.login_user.education_detail +
                '&education=' + edu_id +
                '&income=' + $scope.profile.login_user.income +
                '&occu_cat=' + cat_id +
                '&occupation=' + occu_id
            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }, function errorCallback(response) {
                console.log("error", response)

            });
        }

        function savePartnerProfession() {
            var edu_id = 0;
            var occu_id = 0;
            var cat_id = 0;
            if ($scope.setPartnerProfession.education.length > 0) {
                var edu_arr = [];
                for (var i = 0; i < $scope.setPartnerProfession.education.length; i++) {
                    edu_arr.push($scope.setPartnerProfession.education[i].id_education);
                }
                edu_id = edu_arr.join('~');
            }
            if ($scope.setPartnerProfession.occupation.length > 0) {
                var occ_arr = [];
                for (var i = 0; i < $scope.setPartnerProfession.occupation.length; i++) {
                    occ_arr.push($scope.setPartnerProfession.occupation[i].id_occupation);
                }
                occu_id = occ_arr.join('~');
            }

            $http({
                method: 'PUT',
                url: resourceUrl.url() + 'user/edit/pref/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") + '&block=profession' +
                '&id=' + storageService.get('id') +
                '&education=' + edu_id +
                '&income=' + $scope.profile.login_user.preferences.income +
                '&occupation=' + occu_id
            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }, function errorCallback(response) {
                console.log("error", response)

            });
        }

        function saveFamilyDetails() {
            var orginId = 0;
            if ($scope.setFamily.orgin != null) {
                orginId = $scope.setFamily.orgin.id_country;
            }
            $http({
                method: 'PUT',
                url: resourceUrl.url() + 'user/edit/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") +
                '&block=family' +
                '&brother=' + $scope.profile.login_user.brother +
                '&brother_married=' + $scope.profile.login_user.brother_married +
                '&family_status=' + $scope.profile.login_user.family_status +
                '&father_status=' + $scope.profile.login_user.father_status +
                '&mother_status=' + $scope.profile.login_user.mother_status +
                '&origin=' + orginId +
                '&sister=' + $scope.profile.login_user.sister +
                '&sister_married=' + $scope.profile.login_user.sister_married +
                '&type=' + $scope.profile.login_user.family_type +
                '&values=' + $scope.profile.login_user.family_values
            }).then(function successCallback(response) {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }, function errorCallback(response) {
                console.log("error", response)

            });
        }
        $scope.createCommaSeperate = function(obj) {
            return obj.split(',').join(", ")
        }

        $scope.SelectBrother = function() {
            console.log($scope.profile.login_user.brother)
            if ($scope.profile.login_user.brother == 0) {
                $scope.profile.login_user.brother_married = 0;
                $scope.broDis = true;
            } else {
                $scope.broDis = false;
            }
        }
        $scope.SelectSister = function() {
            if ($scope.profile.login_user.sister == 0) {
                $scope.profile.login_user.sister_married = 0;
                $scope.sisDis = true
            } else {
                $scope.sisDis = false

            }
        }

        $scope.logout = logout;

        function logout() {
            $http({
                method: 'GET',
                url: resourceUrl.url() + 'user/logout?' +
                'id_people=' + storageService.get("id") + '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token", '');
                storageService.set("id", '');
                storageService.set("image_url", '');
                storageService.set("name", '');
                storageService.set("package", '');
                storageService.set("regular_search", '');
                $state.go('login');
            }, function errorCallback(response) {

            });
        }


    };

    //}
})();