(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('viewContactController', viewContactController);

    /** @ngInject */
    function viewContactController($scope,$uibModalInstance,$http, $timeout,$state,items,storageService,resourceUrl, $stateParams) {
        var $ctrl = this;
        $ctrl.items = items;
        console.log($ctrl.items)
        $scope.header = "Profile Blocked";


        $ctrl.unBlock = function (obj) {


            $http({
                method: 'GET',
                url: resourceUrl.url() + 'do/unblock?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + $ctrl.items.id
            }).then(function successCallback(response) {
                console.log(response);

                $scope.header = 'User unBlocked Successfully';


                $timeout(function () {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                    $uibModalInstance.dismiss('cancel');
                }, 2000);
            }, function errorCallback(response) {
                console.log(response);
            });
        };
        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();