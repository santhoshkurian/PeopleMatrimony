(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($http, $scope, storageService) {
        $scope.about = false;
        $scope.basic = false;

        $http({
            method: 'GET',
            url: 'https://devapi.peoplematrimony.com/user/view?' +
            'view_id=' + storageService.get("id") + '&token=' + storageService.get("token")
        }).then(function successCallback(response) {
            console.log(response)
            $scope.profile = response.data;
        }, function errorCallback(response) {
            console.log(response)

        });

        $scope.editAction = editAction;
        $scope.aboutme = aboutme;
        $scope.basic = basic;

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
        function basic() {
            console.log($scope.profile)
            $http({
                method: 'PUT',
                url: 'https://devapi.peoplematrimony.com/user/edit/' + storageService.get('id') + '?' +
                'block=basic&' +
                'age=' + $scope.profile.login_user.age +
                '&weight=' + $scope.profile.login_user.weight +
                '&height=' + $scope.profile.login_user.height +
                '&mothertongue=' + $scope.profile.login_user.mothertongue +
                '&marital_status=' + $scope.profile.login_user.marital_status +
                '&physical_status=' + $scope.profile.login_user.physical_status +
                '&eating_habit=' + $scope.profile.login_user.eating_habit +
                '&drinking_habit=' + $scope.profile.login_user.drinking_habit +
                '&smoking_habit=' + $scope.profile.login_user.smoking_habit +
                '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
console.log("success",response)
            }, function errorCallback(response) {
                console.log("error",response)

            });
        }


    };

    //}
})();