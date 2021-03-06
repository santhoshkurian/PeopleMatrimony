(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('AccountSettingsController', AccountSettingsController);

    /** @ngInject */
    function AccountSettingsController(resourceUrl,account,$scope,storageService,$state,$http,$stateParams) {
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");

        $scope.email = account.email;
        $scope.copyemail= angular.copy($scope.email);
        $scope.passwordMsg = null;
        $scope.confirmPasswordMsg = '';
        $scope.emailMsg = '';
        $scope.confirmPassword = false;

        $scope.changeEmail = changeEmail;
        $scope.resetPassword = resetPassword;
        $scope.SavePassword = SavePassword;
        $scope.password = {current:'',newPassword:'',confirmPassword:''};

        function resetPassword(){
            $scope.email = $scope.copyemail;

        }

        function changeEmail(){

            if($scope.email == ''){
                $scope.emailMsg = "Please enter valid email id";
            }else {
                $http({
                    method: 'POST',
                    url: resourceUrl.url() + 'user/contact?' +
                    'token=' + storageService.get('token') +
                    '&id_people=' + storageService.get('id') +
                    '&type=email&' +
                    'email=' + $scope.email

                }).then(function successCallback(response) {
                    console.log(response);
                    if (response.data.code == 200) {
                        $scope.emailMsg = "Email changed successfully";
                    }
                    //$state.transitionTo($state.current, $stateParams, {
                    //    reload: true,
                    //    inherit: false,
                    //    notify: true
                    //});
                }, function errorCallback(response) {
                    console.log("error", response)

                });
            }
        }

        function SavePassword() {
            console.log($scope.password)
            $scope.passwordMsg = null;

            $scope.confirmPassword = false;
            if ($scope.password.current == ''
                || $scope.password.newPassword == ''
                || $scope.password.confirmPassword == '' || $scope.password.newPassword != $scope.password.confirmPassword) {

                if($scope.password.newPassword == '' || $scope.password.confirmPassword == ''){
                    $scope.confirmPasswordMsg = "Please enter new Password and Confirm Password";
                    $scope.confirmPassword = true;
                }
                if(!$scope.confirmPassword && $scope.password.current == ''){
                    $scope.confirmPasswordMsg = "Please enter current Password Password";
                    $scope.confirmPassword = true;
                }
                if(!$scope.confirmPassword && $scope.password.newPassword != $scope.password.confirmPassword){
                    $scope.confirmPasswordMsg = "New password and confirm password not matching";
                    $scope.confirmPassword = true;
                }
            }
            if (!$scope.confirmPassword) {
                $http({
                    method: 'POST',
                    url: resourceUrl.url() + 'settings/account?' +
                    'token=' + storageService.get('token') +
                    '&id_people=' + storageService.get('id') +
                    '&current=' + $scope.password.current +
                    '&new=' + $scope.password.newPassword
                }).then(function successCallback(response) {
                    console.log("r",response)
                    if(response.data.code == 200) {
                        $scope.passwordMsg = "Password changed successfully";
                        $scope.password = {current: '', newPassword: '', confirmPassword: ''};
                    }else{
                        $scope.passwordMsg = "Invalid Password";
                        $scope.password = {current: '', newPassword: '', confirmPassword: ''};
                    }

                }, function errorCallback(response) {
                    $scope.passwordMsg = response.data.message;


                });
            }
        }






            }
})();
