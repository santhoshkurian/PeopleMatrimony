//(function()
//{
//    'use strict';
//
//    angular
//        .module('toolbar')
//        .controller('DashboardToolbarController', DashboardToolbarController);
//
//    /** @ngInject */
//    function DashboardToolbarController($http,$scope,$location,storageService,$state)
//    {
//
//        console.log("DashboardToolbarController")
//        $scope.logout = logout;
//
//        $scope.isActive = function (viewLocation) {
//            return viewLocation === $location.path();
//        };
//
//        function logout(){
//            $http({
//                method: 'GET',
//                url: resourceUrl.url()+'user/logout?'+
//                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
//            }).then(function successCallback(response) {
//                storageService.set("token",null);
//                storageService.set("id",null);
//                $state.go('login');
//
//            }, function errorCallback(response) {
//
//            });
//        }
//    }
//})();