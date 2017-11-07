(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($uibModal,$state,$http,$scope,storageService,$log) {
        //var vm = this;
        $scope.religonList = [];
        $scope.message=null;

        $scope.login = {
            username:null,password:null
        }
        console.log("LoginController");

        $scope.reg={

        };

        $http({
            method: 'GET',
            url: 'http://devapi.peoplematrimony.com/populate'
        }).then(function successCallback(response) {

            $scope.religonList = response.data.religon;

            //$scope.profile = response.data;
        }, function errorCallback(response) {
            //console.log(response)

        });

        var vm = this;
        vm.open;

        vm.items = ['item1', 'item2', 'item3'];

        vm.animationsEnabled = true;

        //vm.open = function () {
        /*if((storageService.get("token") == null && storageService.get("id") == null) ||
            (storageService.get("token") == 'null' && storageService.get("id") == 'null')){
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
        }else{
            $state.go("app");

        }*/

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
                'mobile='+$scope.reg.mobile+'&password='+$scope.reg.password+'&source=111'
            }).then(function successCallback(response) {
                //console.log(response.data.access_token);
                storageService.set("token",response.data.access_token)
                storageService.set("id",response.data.id_people)

                $state.go('reg',{
                    reg_id: $scope.reg.religion
                })


            }, function errorCallback(response) {
                console.log(response);
                $scope.message = response.data.message;


            });
            //$state.go('reg')

        };


    };

    //}
    angular.module('dashboard').controller('ModalInstanceCtrl', function ($scope,storageService,$http,$uibModalInstance, items,$state,$log) {
        var vm = this;

        vm.items = items;
        vm.selected = {
            item: vm.items[0]
        };




        vm.ok = function (login) {
            console.log(login);

            $http({
                method: 'GET',
                url: 'https://devapi.peoplematrimony.com/user/login?'+
                'username='+login.username+'&password='+login.password
            }).then(function successCallback(response) {
                $uibModalInstance.close(vm.selected.item);
                storageService.set("token",response.data.access_token)
                storageService.set("id",response.data.id_people);
                storageService.set("image_url",response.data.image);
                storageService.set("name",response.data.name);

                $state.go('app');

            }, function errorCallback(response) {
                $scope.message = response.data.message;
            });
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();