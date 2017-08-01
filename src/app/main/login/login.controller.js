(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($uibModal,$state,$http,$scope) {
        //var vm = this;
        console.log("LoginController");

        $scope.reg={

        };

        var vm = this;
        vm.open;

        vm.items = ['item1', 'item2', 'item3'];

        vm.animationsEnabled = true;

        //vm.open = function () {

            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm',
                resolve: {
                    items: function () {
                        return vm.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });



        vm.registerCandidate = function () {
            console.log($scope.reg);
            $http({
                method: 'POST',
                url: 'https://devapi.peoplematrimony.com/user?step=1&profile_for='+$scope.reg.profile_for+'&' +
                'name='+$scope.reg.name+'&gender='+$scope.reg.gender+'&dob='+$scope.reg.dob+'&religion='+parseInt($scope.reg.religion)+'&mothertongue=5&' +
                'country_code='+$scope.reg+'&email='+$scope.reg.email+'&' +
                'mobile='+$scope.reg.mobile+'&password='+$scope.reg.password+'&source=111&src=fb&fb_id=test'
            }).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                console.log(response);

                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };


    };

    //}
    angular.module('dashboard').controller('ModalInstanceCtrl', function ($uibModalInstance, items,$state) {
        var vm = this;
        vm.items = items;
        vm.selected = {
            item: vm.items[0]
        };

        vm.ok = function () {
            $state.go('app');
            $uibModalInstance.close(vm.selected.item);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();