(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ViewProfileController', ViewProfileController);

    /** @ngInject */
    function ViewProfileController($scope) {

        $scope.viewType = 'personal';
        $scope.selectType = selectType;
        function selectType(type){
            $scope.viewType = type;
        }
    }
})();