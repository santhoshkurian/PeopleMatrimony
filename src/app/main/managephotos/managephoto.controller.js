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

    }


})();