(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ViewProfileController', ViewProfileController);

    /** @ngInject */
    function ViewProfileController($scope,$http,storageService) {

        $scope.viewType = 'personal';
        $scope.selectType = selectType;
        function selectType(type){
            $scope.viewType = type;
        }

        $http({
            method: 'GET',
            url: resourceUrl.url()+'user/view?'+
            'view_id='+storageService.get("id")+'&token='+storageService.get("token")
        }).then(function successCallback(response) {
           console.log(response)
        }, function errorCallback(response) {
            console.log(response)

        });



    }
})();