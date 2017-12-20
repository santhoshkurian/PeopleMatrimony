(function () {
    'use strict';
    angular
        .module('dashboard')
        .controller('PaymentController', PaymentController);

    /** @ngInject */
    function PaymentController($http, $scope, storageService) {

        $scope.viewType = 'classic';
        $scope.paymentCompletion = false;
        $scope.selectType = selectType;
        function selectType(type){
            $scope.viewType = type;
        }
        $scope.selectedOption = 'classic-classic';
        $scope.setSelectedOption = setSelectedOption;
        function setSelectedOption(type){
            $scope.selectedOption = type;
        }

        $scope.selectedPayment = 'Credit';
        $scope.setSelectedPayment = setSelectedPayment;

        function setSelectedPayment(type){
            $scope.selectedPayment = type;
        }
        $scope.continuePayment = continuePayment;
        function continuePayment(){
            $scope.paymentCompletion = !$scope.paymentCompletion
        }
    }
}());

