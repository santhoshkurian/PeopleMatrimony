(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($http, $scope,$state,resourceUrl,storageService,$stateParams,populate,profile,$window) {
        window.scroll(0, 1000);

        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.setLocation= {country:null,state:null,city:null,nationality:null,nationality_name:null};
        $scope.setPartnerLocation= {country:null,state:null,city:null,nationality:null,nationality_name:null};
        $scope.setReligion= {religion:null,caste:null,star:null};
        $scope.setPartnerReligion= {religion:[],caste:[],star:[]};
        $scope.setProfession= {education:null,occupation:null,occupation_cat:null};
        $scope.setPartnerProfession= {education:[],occupation:[],occupation_cat:[]};
        $scope.setFamily= {orgin:null,orgin_name:null};
        $scope.countryList = populate.countries;
        $scope.selectLanguage = {motherTongue:null};
        $scope.sisDis = false;
        $scope.broDis = false;





        $scope.motherTongueList = populate.mothertongue;
        $scope.religonList = populate.religon;
        $scope.starsList = populate.stars;
        $scope.occupationCategoryList = populate.occupation_category;
        $scope.educationCategoryList = populate.education_category;
        $scope.educationList = populate.education;
        $scope.occupation = populate.occupation;
        $scope.profile= profile;

        if($scope.profile.login_user.id_mothertongue != null && $scope.profile.login_user.id_mothertongue != 0){
            $scope.motherTongueList.filter(function (a) {
                if (a.id_mothertongue === $scope.profile.login_user.id_mothertongue) {
                    $scope.selectLanguage.motherTongue = a;
                }

            })
        }
        if($scope.profile.login_user.nationality != null && $scope.profile.login_user.nationality != 0) {


            $scope.countryList.filter(function (a) {
                if (a.id_country === $scope.profile.login_user.nationality) {
                    $scope.setLocation.nationality_name = a.country_name;
                }

            })
        }
        if($scope.profile.login_user.ancestral_origin != null && $scope.profile.login_user.ancestral_origin != 0) {
            $scope.countryList.filter(function (a) {
                if (a.id_country === $scope.profile.login_user.ancestral_origin) {
                    $scope.setFamily.orgin_name = a.country_name;
                }
            })
        }

        console.log("profile",$scope.profile)



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
        $scope.editFamilyDetails = editFamilyDetails
        ;
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

        $scope.selectRegliousPreference = selectRegliousPreference;

        function selectRegliousPreference(){
            console.log("change")
        }

        $scope.cancel = cancel;
        if($scope.profile.login_user.id_religion != null){
            $scope.selectReliegion($scope.profile.login_user.id_religion);
        }
        function cancel(){
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });

        }

        function selectCountry(obj){
            if(obj != null) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url()+'populate?id_country=' + obj.id_country
                }).then(function successCallback(response) {
                    $scope.stateList = response.data.states;
                    $scope.cityList =[]
                    $scope.setLocation.state = '';
                    $scope.setLocation.city = '';

                }, function errorCallback(response) {

                });
            }
        }
        function selectState(obj){
            if(obj != null) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url()+'populate?id_state=' + obj.id_state
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.cityList = response.data.cities;
                    $scope.setLocation.city = '';
                }, function errorCallback(response) {

                });
            }
        }
        function selectReliegion(religion){

            console.log(religion)
            if(religion != null) {
                $http({
                    method: 'GET',
                    url: resourceUrl.url()+'populate?id_mothertongue=' + $scope.profile.login_user.id_mothertongue + '&id_religion=' + religion.id_religion
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
            if($scope.profile.login_user.id_religion != null|| $scope.profile.login_user.id_religion != 0){
                $scope.religonList.filter(function (a) {
                    if (a.id_religion === $scope.profile.login_user.id_religion) {
                        $scope.setReligion.religion = a;
                    }
                })
                $http({
                    method: 'GET',
                    url: resourceUrl.url()+'populate?id_mothertongue=' + $scope.profile.login_user.id_mothertongue + '&id_religion=' + $scope.profile.login_user.id_religion
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
                        url: resourceUrl.url()+'populate?id_country=' + $scope.profile.login_user.id_country
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
                                url: resourceUrl.url()+'populate?id_state='+$scope.profile.login_user.id_state
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
        function editPartnerLocation(obj) {
            $scope[obj] = !$scope[obj];
            if($scope.profile.login_user.preferences.country != null && $scope.profile.login_user.preferences.country != 0) {
                $scope.countryList.filter(function (a) {
                    if (a.id_country == $scope.profile.login_user.preferences.country) {
                        $scope.setPartnerLocation.country = a;
                    }
                    if (a.id_country == $scope.profile.login_user.preferences.nationality) {
                        $scope.setPartnerLocation.nationality = a;
                    }

                })
                if($scope.profile.login_user.preferences.state != null
                    && $scope.profile.login_user.preferences.state != 0) {
                    $http({
                        method: 'GET',
                        url: resourceUrl.url()+'populate?id_country=' + $scope.profile.login_user.preferences.country
                    }).then(function successCallback(response) {
                        $scope.stateList = response.data.states;
                        $scope.stateList.filter(function (a) {
                            if (a.id_state == $scope.profile.login_user.preferences.state) {
                                $scope.setPartnerLocation.state = a;
                            }
                        })
                        if($scope.profile.login_user.preferences.city != null && $scope.profile.login_user.preferences.city != 0) {

                            $http({
                                method: 'GET',
                                url: resourceUrl.url()+'populate?id_state='+$scope.profile.login_user.preferences.state
                            }).then(function successCallback(response) {
                                $scope.cityList = response.data.cities;
                                $scope.cityList.filter(function (a) {
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
        function editFamilyDetails(obj) {
            $scope[obj] = !$scope[obj];
            if($scope.profile.login_user.ancestral_origin != null && $scope.profile.login_user.ancestral_origin != 0) {
                $scope.countryList.filter(function (a) {
                    if (a.id_country === $scope.profile.login_user.ancestral_origin) {
                        $scope.setFamily.orgin = a;
                    }
                })
            }



        }


        function editPartnerBasic(obj) {
            $scope[obj] = !$scope[obj];
        }
        function editPartnerType(obj) {
            $scope[obj] = !$scope[obj];
        }

        function editPartnerEdu(obj) {
            $scope[obj] = !$scope[obj];
            if($scope.profile.login_user.preferences.education != null && $scope.profile.login_user.preferences.education != 0) {

                var array = $scope.profile.login_user.preferences.education.split('~');
                for (var i = 0; i < array.length; i++) {
                    $scope.educationList.filter(function (a) {
                        if (a.id_education == array[i]) {
                            $scope.setPartnerProfession.education.push(a);
                        }
                    })
                }

            }

            if($scope.profile.login_user.preferences.occupation != null && $scope.profile.login_user.preferences.occupation != 0) {
                var array = $scope.profile.login_user.preferences.occupation.split('~');

                for (var i = 0; i < array.length; i++) {
                    $scope.occupation.filter(function (a) {
                        if (a.id_occupation == array[i]) {
                            $scope.setPartnerProfession.occupation.push(a);
                        }
                    })
                }


            }
        }
        function editPartnerReligion(obj) {
            $scope[obj] = !$scope[obj];
            console.log($scope.profile)
            if($scope.profile.login_user.preferences.religion != null &&
                $scope.profile.login_user.preferences.religion != 0){

                var array = $scope.profile.login_user.preferences.religion.split('~');
                for (var i = 0; i < array.length; i++) {
                    console.log(array[i])
                    $scope.religonList.filter(function (a) {
                        if (a.id_religion == array[i]) {
                            $scope.setPartnerReligion.religion.push(a);
                        }
                    })
                }

                //$http({
                //    method: 'GET',
                //    url: resourceUrl.url()+'populate?id_mothertongue=' + $scope.profile.login_user.id_mothertongue + '&id_religion=' + $scope.profile.login_user.preferences.religion
                //}).then(function successCallback(response) {
                //    console.log(response)
                //    $scope.castList = response.data.caste;
                //    $scope.castList.filter(function (a) {
                //        if (a.id_caste == $scope.profile.login_user.preferences.caste) {
                //            $scope.setPartnerReligion.caste = a;
                //        }
                //    })
                //}, function errorCallback(response) {
                //
                //});


            }

            if($scope.profile.login_user.preferences.star != null && $scope.profile.login_user.preferences.star != 0){
                var array = $scope.profile.login_user.preferences.star.split('~');
                for (var i = 0; i < array.length; i++) {
                    console.log(array[i])
                    $scope.starsList.filter(function (a) {
                        if (a.id_star == array[i]) {
                            $scope.setPartnerReligion.star.push(a);
                        }
                    })
                }

            }
        }



        function aboutme() {
            $scope.showAboutMeError = false;
            if($scope.profile.login_user.aboutme != null && $scope.profile.login_user.aboutme.length > 50) {
                $http({
                    method: 'PUT',
                    url: resourceUrl.url() + 'user/edit/' + storageService.get('id') + '?' +
                    'block=about&about=' + $scope.profile.login_user.aboutme + '&token=' + storageService.get("token")
                }).then(function successCallback(response) {
                    $scope.about = !$scope.about;

                }, function errorCallback(response) {
                });
            }else{
                $scope.showAboutMeError = true;
            }
        }
        function savePartnerAbout() {

              $http({
                method: 'PUT',
                url: resourceUrl.url()+'user/edit/pref/' + storageService.get('id') + '?' +
                'block=about' +
                '&about=' + $scope.profile.login_user.preferences.about_partner + '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $scope.ptype = !$scope.ptype;

            }, function errorCallback(response) {
            });
        }
        function aboutfamily() {
            $http({
                method: 'PUT',
                url: resourceUrl.url()+'user/edit/' + storageService.get('id') + '?' +
                'block=fdetail&about=' + $scope.profile.login_user.about_family + '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $scope.fabout = !$scope.fabout;

            }, function errorCallback(response) {
            });
        }
        function basic() {
            console.log($scope.profile)
            console.log($scope.selectMotherTounge);
            var selectMother = 0;
            if($scope.selectLanguage.motherTongue != null){
                selectMother = $scope.selectLanguage.motherTongue.id_mothertongue;
            }
            $http({
                method: 'PUT',
                url: resourceUrl.url()+'user/edit/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token")+'&block=basic&' +
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

        function savePartnerBasic() {


            $http({
                method: 'PUT',
                url: resourceUrl.url()+'user/edit/pref/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token")+'&block=basic' +
                '&age_end=' + $scope.profile.login_user.preferences.age_end +
                '&age_start=' + $scope.profile.login_user.preferences.age_start +
                '&drinking_habits=' + $scope.profile.login_user.preferences.drinking_habits +
                '&eating_habits=' + $scope.profile.login_user.preferences.eating_habits +
                '&smoking_habits=' + $scope.profile.login_user.preferences.smoking_habits+
                '&height_end=' + $scope.profile.login_user.preferences.height_end +
                '&height_start=' + $scope.profile.login_user.preferences.height_start +
                '&marital_status=' + $scope.profile.login_user.preferences.marital_status +
                '&mothertongue=' + parseInt($scope.profile.login_user.preferences.mothertongue) +
                '&physical_status=' + $scope.profile.login_user.preferences.physical_status
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
            var reg_id = 0;
            var caste_id = 0;
            var star_id = 0;
            if($scope.setReligion.religion != null){
                reg_id = $scope.setReligion.religion.id_religion;
            }
            if($scope.setReligion.star != null){
                star_id = $scope.setReligion.star.id_star;
            }
            if($scope.setReligion.caste != null){
                caste_id = $scope.setReligion.caste.id_caste;
            }
            $http({
                method: 'PUT',
                url: resourceUrl.url()+'user/edit/' + storageService.get('id') + '?' +
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
                console.log("error",response)

            });
        }
        function savePartnerReliegion() {
            var reg_id = 0;
            var caste_id = 0;
            var star_id = 0;
            console.log($scope.setPartnerReligion.religion)
            console.log($scope.setPartnerReligion.star)
            console.log($scope.setPartnerReligion.caste)

            if($scope.setPartnerReligion.religion.length > 0){
                var reg_arr = [];
                for (var i = 0; i < $scope.setPartnerReligion.religion.length; i++) {
                    reg_arr.push($scope.setPartnerReligion.religion[i].id_religion);
                }
                reg_id = reg_arr.join('~');
            }
            if($scope.setPartnerReligion.star.length > 0){
                var star_arr = [];
                for (var i = 0; i < $scope.setPartnerReligion.star.length; i++) {
                    star_arr.push($scope.setPartnerReligion.star[i].id_star);
                }
                star_id = star_arr.join('~');
            }
            if($scope.setPartnerReligion.caste.length > 0){
                var caste_arr = [];
                for (var i = 0; i < $scope.setPartnerReligion.caste.length; i++) {
                    caste_arr.push($scope.setPartnerReligion.caste[i].id_star);
                }
                caste_id = caste_arr.join('~');
            }


            $http({
                method: 'PUT',
                url: resourceUrl.url()+'user/edit/pref/' + storageService.get('id') + '?' +
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
                console.log("error",response)

            });
        }
        function saveLocation() {
            var country_id = 0;
            var state_id = 0;
            var city_id = 0;
            var nationality_id = 0;
            if($scope.setLocation.country != null){
                country_id = $scope.setLocation.country.id_country
            }
            if($scope.setLocation.state != null){
                state_id = $scope.setLocation.state.id_state
            }
            if($scope.setLocation.city != null){
                city_id = $scope.setLocation.city.id_city
            }
            if($scope.setLocation.nationality != null){
                nationality_id = $scope.setLocation.nationality.id_country
            }
            $http({
                method: 'PUT',
                url: resourceUrl.url()+'user/edit/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") +'&block=location&' +
                '&country=' + country_id +
                '&state=' + state_id +
                '&city=' + city_id +
                '&nationality='+nationality_id
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
        function savePartnerLocation() {
            var country_id = 0;
            var state_id = 0;
            var city_id = 0;
            var nationality_id = 0;
            if($scope.setPartnerLocation.country != null){
                country_id = $scope.setPartnerLocation.country.id_country
            }
            if($scope.setPartnerLocation.state != null){
                state_id = $scope.setPartnerLocation.state.id_state
            }

            if($scope.setPartnerLocation.city != null){
                city_id = $scope.setPartnerLocation.city.id_city
            }
            if($scope.setPartnerLocation.nationality != null){
                nationality_id = $scope.setPartnerLocation.nationality.id_country
            }

            $http({
                method: 'PUT',
                url: resourceUrl.url()+'user/edit/pref/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") +'&block=location' +
                '&country=' + country_id +
                '&state=' + state_id +
                '&city=' + city_id +
                '&nationality='+nationality_id
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
            var edu_id = 0;
            var occu_id = 0;
            var cat_id = 0;
            if($scope.setProfession.education != null){
                edu_id = $scope.setProfession.education.id_education;
            }
            if($scope.setProfession.occupation_cat != null){
                cat_id = $scope.setProfession.occupation_cat.id_occupation_category;
            }
            if($scope.setProfession.occupation != null){
                occu_id = $scope.setProfession.occupation.id_occupation;
            }
            $http({
                method: 'PUT',
                url: resourceUrl.url()+'user/edit/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") +'&block=profession&' +
                '&edu_detail=' + $scope.profile.login_user.education_detail +
                '&education=' + edu_id +
                '&income=' + $scope.profile.login_user.income +
                '&occu_cat=' + cat_id +
                '&occupation='+occu_id
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
        function savePartnerProfession() {
            var edu_id = 0;
            var occu_id = 0;
            var cat_id = 0;
            if($scope.setPartnerProfession.education.length > 0){
                var edu_arr = [];
                for (var i = 0; i < $scope.setPartnerProfession.education.length; i++) {
                    edu_arr.push($scope.setPartnerProfession.education[i].id_education);
                }
                edu_id = edu_arr.join('~');
            }
            if($scope.setPartnerProfession.occupation.length > 0){
                var occ_arr = [];
                for (var i = 0; i < $scope.setPartnerProfession.occupation.length; i++) {
                    occ_arr.push($scope.setPartnerProfession.occupation[i].id_occupation);
                }
                occu_id = occ_arr.join('~');
            }

            $http({
                method: 'PUT',
                url: resourceUrl.url()+'user/edit/pref/' + storageService.get('id') + '?' +
                'token=' + storageService.get("token") +'&block=profession' +
                '&id=' + storageService.get('id') +
                '&education=' + edu_id +
                '&income=' + $scope.profile.login_user.preferences.income +
                '&occupation='+occu_id
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
        function saveFamilyDetails() {
            var orginId = 0;
            if($scope.setFamily.orgin != null){
                orginId =  $scope.setFamily.orgin.id_country;
            }
            $http({
                method: 'PUT',
                url: resourceUrl.url()+'user/edit/' + storageService.get('id') + '?' +
                'token=' +storageService.get("token") +
                '&block=family' +
                '&brother=' +$scope.profile.login_user.brother +
                '&brother_married=' +$scope.profile.login_user.brother_married +
                '&family_status=' +$scope.profile.login_user.family_status +
                '&father_status=' +$scope.profile.login_user.father_status +
                '&mother_status=' +$scope.profile.login_user.mother_status +
                '&origin=' +orginId +
                '&sister=' +$scope.profile.login_user.sister +
                '&sister_married=' +$scope.profile.login_user.sister_married +
                '&type=' +$scope.profile.login_user.family_type +
                '&values='+$scope.profile.login_user.family_values
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
        $scope.createCommaSeperate = function(obj){
           return obj.split(',').join(", ")
        }

        $scope.SelectBrother = function(){
           console.log($scope.profile.login_user.brother)
            if($scope.profile.login_user.brother == 0) {
                $scope.profile.login_user.brother_married = 0;
                $scope.broDis = true;
            }else{
                $scope.broDis = false;
            }
        }
        $scope.SelectSister = function(){
            if($scope.profile.login_user.sister == 0) {
                $scope.profile.login_user.sister_married = 0;
                $scope.sisDis = true
            }else{
                $scope.sisDis = false

            }
        }

        $scope.logout = logout;
        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token",'');
                storageService.set("id",'');
                storageService.set("image_url",'');
                storageService.set("name",'');
                storageService.set("package",'');
                storageService.set("regular_search",'');
                $state.go('login');
            }, function errorCallback(response) {

            });
        }


    };

    //}
})();