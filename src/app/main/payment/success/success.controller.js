(function () {
    'use strict';
    angular
        .module('dashboard')
        .controller('SuccessController', SuccessController);

    /** @ngInject */
    function SuccessController($http, $scope, storageService, resourceUrl,$state,viewProfile) {
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.order_id = storageService.get("order_id");
        $scope.package_id = storageService.get("update_package_id");
        $scope.user_id = viewProfile.login_user.id_user;

         $http({
             method: 'POST',
             url: resourceUrl.url() + 'membership/update?id_people=' + $scope.id +
             '&id_package=' + $scope.package_id + '&' +
             '&id_user=' + $scope.user_id + '&' +
             'transaction_no=' + $scope.order_id + '&' +
             '&token=' + storageService.get('token')
         }).then(function successCallback(response) {
             console.log(response);
         }, function errorCallback(response) {
             console.log(response);
         });
     }





}());

