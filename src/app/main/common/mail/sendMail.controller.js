(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('sendMailController', sendMailController);

    /** @ngInject */
    function sendMailController($scope,$uibModalInstance,$http, $timeout,$state,items,storageService,resourceUrl, $stateParams) {
        var $ctrl = this;
        $ctrl.items = items;
        console.log($ctrl.items)


        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();