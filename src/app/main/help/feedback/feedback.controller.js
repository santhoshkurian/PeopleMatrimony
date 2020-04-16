(function()
{
    'use strict';

    angular
        .module('dashboard')
        .controller('feedbackController', feedbackController)
        .controller('feedbackModalController', feedbackModalController);

    /** @ngInject */
    function feedbackController($http,$scope,storageService,resourceUrl,$state,$stateParams,$uibModal)
    {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $scope.messageVal = true;
        console.log("feedbackController");
        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");

        $scope.business = {name:$scope.name,id:$scope.id,feedback:'',priority:'',category:'',message:''}
        if($scope.id == null){
            $scope.checked = false;
        }else{
            $scope.checked = true;

        }
        $scope.logout = logout;
        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.clear();
                $state.go('login');
            }, function errorCallback(response) {

            });
        }

        $scope.submit = submit;
        function submit(){
            if($scope.business.message == '' || $scope.business.message == null){
                $scope.messageVal = false;
            }

            if($scope.messageVal) {
                $http({
                    method: 'POST',
                    url: resourceUrl.url() + 'feedback?token=' + storageService.get("token") +
                    '&id=' + $scope.business.id + "&name=" + $scope.business.name +
                    "&priority=" + $scope.business.priority + "&message=" + $scope.business.message +
                    "&category=" + $scope.business.category,
                }).then(function successCallback(response) {
                    console.log("success", response);
                    if(!response.data.error){
                        $scope.open();

                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    }

                }, function errorCallback(response) {
                    console.log("error", response);

                });
            }

        };

        $scope.open = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'feedBackModal.html',
                controller: 'feedbackModalController',
                controllerAs: '$ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return $scope.details;
                    }
                }
            });
        }



    }
    function feedbackModalController($uibModalInstance, items,$state){
        var $ctrl = this;
        $ctrl.items = items;
        console.log("cheeeeeeeeeeeeeeeek",$ctrl.items);
        //$ctrl.selected = {
        //    item: $ctrl.items[0]
        //};

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
