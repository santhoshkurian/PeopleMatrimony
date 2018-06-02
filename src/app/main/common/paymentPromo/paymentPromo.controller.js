(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('paymentPromoController', paymentPromoController);

    /** @ngInject */
    function paymentPromoController($scope,$uibModalInstance,$http, $timeout,$state,items,storageService,resourceUrl, $stateParams) {
        var $ctrl = this;
        $ctrl.items = items;
        console.log("cheeeeeeeeeeeeeeeek", $ctrl.items);


        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $ctrl.upgrade = function () {
            $uibModalInstance.dismiss('cancel');
            $state.go('payment')
        };
    }
})();