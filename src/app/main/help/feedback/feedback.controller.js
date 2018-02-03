(function()
{
    'use strict';

    angular
        .module('dashboard')
        .controller('feedbackController', feedbackController);

    /** @ngInject */
    function feedbackController($http,$scope,storageService,resourceUrl)
    {
        window.scroll(0, 1000);
        $scope.messageVal = true;
        console.log("feedbackController");
        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        $scope.business = {name:$scope.name,id:$scope.id,feedback:'',priority:'',category:'',message:''}
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

        $scope.submit = submit;
        function submit(){
            if($scope.business.message == '' || $scope.business.message == null){
                $scope.messageVal = false;
            }

            if($scope.messageVal) {
                $http({
                    method: 'POST',
                    url: resourceUrl.url() + 'feedback?token=' + storageService.get("token") +
                    '&id=' + $scope.business.id + "&name=" + $scope.business.name +
                    "&priority=" + $scope.business.priority + "&message=" + $scope.business.message +
                    "&category=" + $scope.business.category,
                }).then(function successCallback(response) {
                    console.log("success", response);

                }, function errorCallback(response) {
                    console.log("error", response);

                });
            }

        };



    }
})();
