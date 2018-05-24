(function () {
    'use strict';
    angular
        .module('dashboard')
        .controller('PaymentController', PaymentController);

    /** @ngInject */
    function PaymentController($http, $scope, storageService,paymentList,resourceUrl,$state) {
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");

        $scope.payment = paymentList;
        console.log("payment",$scope.payment);
        $scope.message = '';
        $scope.proceedPayment = false;
        $scope.selectPayment = null;
        $scope.selectPackageDetails = 'classic3';
        $scope.makePayment = {c_no:null,c_name:null,month:null,year:null,ccv:null};
        $scope.check = {
            valid_c_no:false,
            valid_c_name:false,
            valid_month:false,
            valid_year:false,
            valid_ccv:false
        };

        $scope.offer = {msg:null,verifiedMobile:null}

        //$scope.payment = {
        //    classic3Months:null,
        //    classicAdv3Months:null,
        //    classic6Months:null,
        //    classicAdv6Months:null,
        //    flexible:null
        //}
        //
        //console.log($scope.payment);
        $scope.viewType = 'classic';
        $scope.paymentCompletion = false;
        $scope.selectType = selectType;
        function selectType(type){
            $scope.viewType = type;
        }
        $scope.selectedOption = 'classic-3months';
        $scope.setSelectedOption = setSelectedOption;
        function setSelectedOption(type){
            $scope.selectedOption = type;
        }

        $scope.selectedPayment = 'Credit';
        $scope.setSelectedPayment = setSelectedPayment;

        function setSelectedPayment(type){
            $scope.selectedPayment = type;
        }
        $scope.continuePayment = continuePayment;
        function continuePayment(){
            console.log($scope.makePayment);
            $scope.check = {
                valid_c_no:false,
                valid_c_name:false,
                valid_month:false,
                valid_year:false,
                valid_ccv:false
            };
            if($scope.makePayment.c_no == null || $scope.makePayment.c_no == ''){
                $scope.check.valid_c_no = true;
            }
            if($scope.makePayment.c_name == null || $scope.makePayment.c_name == ''){
                $scope.check.valid_c_name = true;

            }
            if($scope.makePayment.ccv == null || $scope.makePayment.ccv == ''){
                $scope.check.valid_ccv = true;

            }
            if($scope.makePayment.month == null || $scope.makePayment.month == ''){
                $scope.check.valid_month = true;

            }
            if($scope.makePayment.year == null || $scope.makePayment.year == ''){
                $scope.check.valid_year = true;
            }
            if(!$scope.check.valid_c_no
                && !$scope.check.valid_c_name
                && !$scope.check.valid_ccv
                && !$scope.check.valid_month
                && !$scope.check.valid_year
            ){
                $http({
                    method: 'POST',
                    url: resourceUrl.url() + 'membership?id_people=' + storageService.get('id') +
                    '&id_package=' + $scope.selectPayment.id_packages + '&' +
                    'payment_method=credit&' +
                    'c_no=' + $scope.makePayment.c_no + '&' +
                    'c_name=' + $scope.makePayment.c_name + '&' +
                    'c_expire=' + $scope.makePayment.month+'+'+$scope.makePayment.year+ '&' +
                    'ccn=' + $scope.makePayment.ccv + '&' +
                    'token=' + storageService.get('token')
                }).then(function successCallback(response) {
                    console.log(response);
                    if(response.data.code = 200){
                        $scope.proceedPayment = false;
                        $scope.message = response.data.message;
                    }



                }, function errorCallback(response) {
                    console.log(response);
                    //$scope.message = response.data.message;


                });

            }
        }


        $scope.selectPackage = selectPackage;
        function selectPackage(obj){
            console.log("check")
            $scope.selectPayment = obj;
            storageService.set("update_package_id",$scope.selectPayment.id_packages);


            //$scope.proceedPayment = true;

            $http({
                method: 'POST',
                url: resourceUrl.url() + 'membership?id_people=' + storageService.get('id') +
                '&id_package=' + $scope.selectPayment.id_packages + '&' +
                'payment_method=credit&' +
                'c_no=' + $scope.makePayment.c_no + '&' +
                'c_name=' + $scope.makePayment.c_name + '&' +
                'c_expire=' + $scope.makePayment.month+'+'+$scope.makePayment.year+ '&' +
                'ccn=' + $scope.makePayment.ccv + '&' +
                'token=' + storageService.get('token')
            }).then(function successCallback(response) {
                console.log(response);

                $http({
                    method: 'POST',
                    url: resourceUrl.url() + 'membership?id_people=' + storageService.get('id') +
                    '&id_package=' + $scope.selectPayment.id_packages + '&' +
                    'payment_method=credit&' +
                    'c_no=' + $scope.makePayment.c_no + '&' +
                    'c_name=' + $scope.makePayment.c_name + '&' +
                    'c_expire=' + $scope.makePayment.month+'+'+$scope.makePayment.year+ '&' +
                    'ccn=' + $scope.makePayment.ccv + '&' +
                    'token=' + storageService.get('token')
                }).then(function successCallback(response) {
                    console.log(response);
                    storageService.set("order_id",response.data.membership.payment.order_id);
                    document.getElementById("code").value = response.data.membership.payment.access_code;
                    document.getElementById("enc").value = response.data.membership.payment.encRequest;


                    document.getElementById("paymentForm").setAttribute("action",response.data.membership.payment.ccavenue_url);
                    document.getElementById("paymentForm").submit();

                }, function errorCallback(response) {
                    console.log(response);
                });

            }, function errorCallback(response) {
                console.log(response);


            });


        }

        $scope.offer = {msg:$scope.payment.classic3Months.send_sms,
            verifiedMobile:$scope.payment.classic3Months.access_verified_mobile_numbers}

        $scope.PackageDetails = PackageDetails;
        function PackageDetails(obj1,obj2){
            $scope.offer.msg = obj1.send_sms;
            $scope.offer.verifiedMobile = obj1.access_verified_mobile_numbers;

            $scope.selectPackageDetails = obj2;
            console.log(obj1)
            console.log(obj2)


        }

        $scope.logout = logout;
        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token",'');
                storageService.set("id",'');
                storageService.set("image_url",'');
                storageService.set("name",'');
                storageService.set("package",'');
                storageService.set("regular_search",'');
                $state.go('login');

            }, function errorCallback(response) {

            });
        }
    }
}());

