(function () {
    'use strict';
    angular
        .module('dashboard')
        .controller('PaymentController', PaymentController);

    /** @ngInject */
    function PaymentController($http, $scope, storageService) {

        $scope.viewType = 'classic';
        $scope.selectType = selectType;
        function selectType(type){
            $scope.viewType = type;
        }
    }
}());

