(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SearchByIdController', SearchByIdController);

    /** @ngInject */
    function SearchByIdController($scope,$http,resourceUrl,storageService) {
        var vm = this;
        console.log("SearchByIdController");
        $scope.viewId = '';
        $scope.gender = null;
        $scope.item=null;

        $scope.viewById = viewById;

        function viewById(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/view?'+
                'view_id='+$scope.viewId+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                console.log(response)
                $scope.item = response.data.user;
                $scope.gender= response.data.user.gender;
            }, function errorCallback(response) {
                console.log(response)

            });
        }

    }
})();
