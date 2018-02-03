(function()
{
    'use strict';

    angular
        .module('dashboard')
        .controller('busEnqController', busEnqController);

    /** @ngInject */
    function busEnqController($http,$scope,storageService,resourceUrl)
    {

        console.log("busEnqController");
        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");




        $scope.business = {
            name:$scope.name,
            id:$scope.id,
            company:'',
            address:'',
            description:'',
            email:'',
            business_type:'',
            phone:''};

        $scope.logout = logout;
        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.clear();
                $state.go('login');
            }, function errorCallback(response) {

            });
        }

        $scope.nameVal = true;
        $scope.companyVal = true;
        $scope.descriptionVal = true;
        $scope.emailVal = true;
        $scope.phoneVal = true;


        $scope.submit = submit;
        function submit(){
            $scope.nameVal = true;
            $scope.companyVal = true;
            $scope.descriptionVal = true;
            $scope.emailVal = true;
            $scope.phoneVal = true;


            if($scope.business.name == '' || $scope.business.name == null){
                $scope.nameVal = false;
            }
            if($scope.business.company == '' || $scope.business.company == null){
                $scope.companyVal = false;
            }

            if($scope.business.description == '' || $scope.business.description == null){
                $scope.descriptionVal = false;
            }
            if($scope.business.email == '' || $scope.business.email == null){
                $scope.emailVal = false;
            }
            if($scope.business.phone == '' || $scope.business.phone == null){
                $scope.phoneVal = false;
            }
            if($scope.nameVal &&
                $scope.companyVal &&
                $scope.descriptionVal &&
                $scope.emailVal &&
                $scope.phoneVal) {
                $http({
                    method: 'POST',
                    url: resourceUrl.url() + 'business_enquiry?token=' + storageService.get("token") +
                    '&id=' + $scope.business.id + "&name=" + $scope.business.name +
                    "&company=" + $scope.business.company + "&address=" + $scope.business.address +
                    "&description=" + $scope.business.description + '&email=' + $scope.business.email +
                    "&business_type=" + $scope.business.business_type + "&phone=" + $scope.business.phone,
                }).then(function successCallback(response) {
                    console.log("success", response);

                }, function errorCallback(response) {
                    console.log("error", response);

                });
            }
        }



    }
})();
