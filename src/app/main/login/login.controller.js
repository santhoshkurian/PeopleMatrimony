(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(resourceUrl,$uibModal,$state,$http,$scope,storageService,$log,populate) {
        //var vm = this;
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        console.log(populate);
        $scope.religonList = populate.religon;
        $scope.motherTongueList = populate.mothertongue;
        $scope.message=null;
        $scope.terms={agree:true};
        $scope.password = "password";
        $scope.ShowPass = ShowPass;
        function ShowPass(val){
            if(val == 'show'){
                $scope.password = "text";
            }
            if(val == 'hide'){
                $scope.password = "password";

            }

        }





        $scope.login = {
            username:null,password:null
        }
        console.log("LoginController");

        $scope.reg={code:91,mobile:''

        };

        $scope.selectProfileFor = function() {
            if ($scope.reg.profile_for == 'daughter' || $scope.reg.profile_for == 'sister') {
            $scope.reg.gender = 'female';
        }
            if ($scope.reg.profile_for == 'son' ||$scope.reg.profile_for == 'brother') {
            $scope.reg.gender = 'male';
        }
            if ($scope.reg.profile_for == 'myself' ||
            $scope.reg.profile_for == 'relative' ||
            $scope.reg.profile_for == 'friend' ) {
            $scope.reg.gender = '';
        }
        }


        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }



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


        vm.open = function () {
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

        }

        $scope.selectDob = {day:'',month:'',year:''};

        vm.registerCandidate = function () {
            console.log($scope.reg);

            $scope.showSelectProfile = false;
            $scope.showName = false;
            $scope.showGender = false;
            $scope.showDOB = false;
            $scope.showmt = false;
            $scope.showemail = false;
            $scope.showreligion = false;
            $scope.showMobileNumber = false;
            $scope.showPassword = false;

            $scope.dobMsg = '';
            $scope.moberror = '';
            $scope.nameMsg = '';
            $scope.passwordError = '';




            var date1 = $scope.reg.dob;
            date1 = new Date(date1);
            var dob = '';

            //if(date1 != null && date1 != '') {
            //    //date1 = new Date(date1.getFullYear(),date1.getMonth(),date1.getDay());
            //    var month = parseInt(date1.getMonth()) +1;
            //    console.log(month+1)
            //    dob = date1.getFullYear()+'-'+month+'-'+date1.getDate();
            //    //date1 = date1.toString().replace('(India Standard Time)', '(IST)');
            //    //date1 = new Date(date1);
            //
            //    console.log("ssssssssss",dob);
            //}
            if($scope.reg.profile_for == null || $scope.reg.profile_for ==''){
                $scope.showSelectProfile = true;
            }
            if($scope.reg.name == null || $scope.reg.name ==''){
                $scope.nameMsg = 'Enter your name';
                $scope.showName = true;
            }else{
               if($scope.reg.name.length > 50 || /^[a-zA-Z0-9]*$/.test($scope.reg.name) == false){
                   $scope.nameMsg = 'Enter valid Name';
                   $scope.showName = true;
               }
            }
            if($scope.reg.gender == null || $scope.reg.gender ==''){
                $scope.showGender = true;
            }
            if($scope.selectDob.day == '' || $scope.selectDob.month == '' || $scope.selectDob.year == ''){
                $scope.dobMsg = "Select date of birth";
                $scope.showDOB = true;
            }else{
                dob = $scope.selectDob.year+'-'+$scope.selectDob.month+'-'+$scope.selectDob.day;
                //console.log(date1.getFullYear());
                //console.log(new Date().getFullYear());
                //if(date1.getFullYear() >= new Date().getFullYear()){
                //    $scope.dobMsg = "Select the correct DOB";
                //    $scope.showDOB = true;
                //}
            }
            if($scope.reg.mothertongue == null || $scope.reg.mothertongue ==''){
                $scope.showmt = true;
            }
            console.log($scope.reg.religion)
            if($scope.reg.religion == null || $scope.reg.religion ==''){
                $scope.showreligion = true;
            }
            if($scope.reg.email == null || $scope.reg.email ==''){
                $scope.showemail = true;
            }
            if($scope.reg.mobile == null || $scope.reg.mobile =='' || $scope.reg.mobile.length != 10){
                $scope.moberror = 'Enter 10 digit Mobile No';
                $scope.showMobileNumber = true;
            }
            if($scope.reg.password == null || $scope.reg.password ==''){
                $scope.showPassword = true;
                $scope.passwordError = 'Enter Password';
            }else{
                if($scope.reg.password.length < 6 || $scope.reg.password.length > 20){
                    $scope.showPassword = true;
                    $scope.passwordError = 'Password character between 6-20';
                }
            }
            if(!$scope.showSelectProfile && !$scope.showName && !$scope.showGender
                && !$scope.showDOB && !$scope.showPassword && !$scope.showreligion && !$scope.showemail && !$scope.showMobileNumber) {
if($scope.terms.agree) {

    $http({
        method: 'POST',
        url: resourceUrl.url() + 'user?step=1&profile_for=' + $scope.reg.profile_for + '&' +
        'name=' + $scope.reg.name + '&gender=' + $scope.reg.gender + '&dob=' + dob + '&religion=' + parseInt($scope.reg.religion) +
        '&mothertongue=' + $scope.reg.mothertongue +
        '&country_code=' + $scope.reg.code + '&email=' + $scope.reg.email + '&' +
        'mobile=' + $scope.reg.mobile + '&password=' + $scope.reg.password + '&source=111'
    }).then(function successCallback(response) {
        console.log(response.data);
        if (!response.data.error) {
            storageService.set("token", response.data.access_token)
            storageService.set("id", response.data.id_people);
            storageService.set("valid", false);


            $state.go('reg', {
                rel_id: $scope.reg.religion, id: response.data.id_people
            })
        } else {
            $scope.message = response.data.message
        }


    }, function errorCallback(response) {
        console.log(response);
        $scope.message = response.data.message;


    });
}else{
    $scope.message = "Please agree the terms and conditions"
}
            }
        };


    };

    //}
    angular.module('dashboard').controller('ModalInstanceCtrl', function ($uibModal,$scope,storageService,$http,resourceUrl,$uibModalInstance, items,$state,$log) {
        var vm = this;

        vm.items = items;
        vm.selected = {
            item: vm.items[0]
        };




        vm.ok = function (login) {
            console.log(login);

            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/login?'+
                'username='+login.username+'&password='+login.password
            }).then(function successCallback(response) {
                console.log(response);
                if(!response.data.error) {
                    $uibModalInstance.close(vm.selected.item);
                    storageService.set("token", response.data.access_token)
                    storageService.set("id", response.data.id_people);
                    storageService.set("regular_search", '');
                    if (response.data.image == '') {
                        storageService.set("image_url", "assets/defaultImages/avatar.png");
                        storageService.set("image_attr", false);
                    } else {
                        storageService.set("image_url", response.data.image);
                        storageService.set("image_attr", true);
                    }
                    storageService.set("name", response.data.name);
                    storageService.set("valid", true);
                    $state.go('app');
                }else{
                    $scope.message = response.data.message;
                    $scope.login.username='';
                    $scope.login.password='';
                }

            }, function errorCallback(response) {
                $scope.message = response.data.message;
            });
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        vm.forgotPassword = function () {
            console.log("ddddddd");
            $uibModalInstance.dismiss('cancel');
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'forgotPassword.html',
                controller: 'forgotPasswordCtrl',
                controllerAs: 'vm',
                resolve: {
                    items: function () {
                        return "check";
                    }

                }
            });
        };
    });
    angular.module('dashboard').controller('forgotPasswordCtrl', function ($scope,storageService,$http,resourceUrl,$uibModalInstance, items,$state,$log) {
        var vm = this;
        vm.restPassword = true;
        vm.username = '';
        vm.message = '';

        vm.items = items;
        vm.selected = {
            item: vm.items[0]
        };




        vm.ok = function (login) {
            vm.message = '';


            $http({
                method: 'GET',
                url: resourceUrl.url()+'reset?'+
                'username='+vm.username,
            }).then(function successCallback(response) {
                console.log(response);
                if(!response.data.error) {
                    vm.restPassword = false;

                }else{
                    vm.message = response.data.message;
                }

            }, function errorCallback(response) {
                $scope.message = response.data.message;
            });
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();