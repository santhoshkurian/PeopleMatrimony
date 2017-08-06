(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($uibModal,$state,$http,$scope,storageService) {
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
            $http({
                method: 'POST',
                url: 'https://devapi.peoplematrimony.com/user?step=1&profile_for='+$scope.reg.profile_for+'&' +
                'name='+$scope.reg.name+'&gender='+$scope.reg.gender+'&dob='+$scope.reg.dob+'&religion='+parseInt($scope.reg.religion)+'&mothertongue=5&' +
                'country_code='+$scope.reg+'&email='+$scope.reg.email+'&' +
                'mobile='+$scope.reg.mobile+'&password='+$scope.reg.password+'&source=111'
            }).then(function successCallback(response) {
                console.log(response.data.access_token);
                storageService.set("token",response.data.access_token)
                storageService.set("id",response.data.id_people)

                //$state.go('reg')


            }, function errorCallback(response) {
                console.log(response);


            });
            //$state.go('reg')

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