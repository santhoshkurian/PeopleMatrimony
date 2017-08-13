(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ManagePhotoController', ManagePhotoController);

    /** @ngInject */
    function ManagePhotoController($scope) {
        console.log("ManagePhotoController");
        $scope.viewType = 'managephoto';
        $scope.selectType = selectType;
        function selectType(type){
            $scope.viewType = type;
        }


        $scope.images = [
            {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 01 description"},
            {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 02 description"},
            {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 03 description"},
            {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 04 description"},
            {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 05 description"}
        ];

    }


})();