(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ContactDetailsController', ContactDetailsController);

    /** @ngInject */
    function ContactDetailsController(resourceUrl,contactDetails,storageService,$scope,$http,$stateParams,$state,populate) {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        console.log("ContactDetailsController");
        console.log(contactDetails.contact);
        $scope.cd = contactDetails.contact;


        $scope.contact = {
            mobile:$scope.cd.mobile,
            email:$scope.cd.email,
            parent_mobile:$scope.cd.parent_mobile,
            whom_to_contact:$scope.cd.whom_to_contact,
            contact_person:$scope.cd.contact_person,
            available_time:$scope.cd.available_time,
            comments:$scope.cd.comments
        };

        $scope.saveContactDetails = saveContactDetails;

        function saveContactDetails(){
            console.log($scope.contact)

            $http({
                method: 'POST',
                url: resourceUrl.url() + 'user/edit_contact?id=' +storageService.get('id')+
                '&mobile=' + $scope.contact.mobile +
                '&email=' + $scope.contact.email +
                '&parent_mobile=' + $scope.contact.parent_mobile +
                '&whom_to_contact=' + $scope.contact.whom_to_contact +
                '&contact_person=' + $scope.contact.contact_person +
                '&available_time=' + $scope.contact.available_time +
                '&comments=' + $scope.contact.comments +
                '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                $scope.ptype = !$scope.ptype;

            }, function errorCallback(response) {});
        }




    }

    //}
   })();