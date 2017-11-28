(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ViewProfileController', ViewProfileController);

    /** @ngInject */
    function ViewProfileController($scope,$http,storageService,resourceUrl,viewProfile) {

        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.viewType = 'personal';
        $scope.selectType = selectType;
        function selectType(type){
            $scope.viewType = type;
        }

        $scope.view = viewProfile.user;
        $scope.pref = viewProfile.user.preferences;
       console.log("view Profile",JSON.stringify(viewProfile));


    }
})();