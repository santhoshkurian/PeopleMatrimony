(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(resourceUrl,$uibModal,$state,$http,$scope,storageService,$log,populate) {
        //var vm = this;
        console.log(populate);
        $scope.religonList = populate.religon;
        $scope.motherTongueList = populate.mothertongue;
        $scope.message=null;





        $scope.login = {
            username:null,password:null
        }
        console.log("LoginController");

        $scope.reg={code:91,mobile:''

        };

        $scope.selectProfileFor = function() {
            if ($scope.reg.profile_for == 'daughter') {
            $scope.reg.gender = 'female';
        }
            if ($scope.reg.profile_for == 'son') {
            $scope.reg.gender = 'male';
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



            var date1 = $scope.reg.dob;
            date1 = new Date(date1);
            date1 = date1.toString().replace('(India Standard Time)','(IST)');;
            console.log(date1);
            if($scope.reg.profile_for == null || $scope.reg.profile_for ==''){
                $scope.showSelectProfile = true;
            }
            if($scope.reg.name == null || $scope.reg.name ==''){
                $scope.showName = true;
            }
            if($scope.reg.gender == null || $scope.reg.gender ==''){
                $scope.showGender = true;
            }
            if($scope.reg.dob == null || $scope.reg.dob ==''){
                $scope.showDOB = true;
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
            if($scope.reg.mobile == null || $scope.reg.mobile =='' || $scope.reg.mobile.toString().length != 10){
                $scope.moberror = 'Invalid Mobile Number / Enter 10 digit mobile number'
                $scope.showMobileNumber = true;
            }
            if($scope.reg.password == null || $scope.reg.password ==''){
                $scope.showPassword = true;
            }
            if(!$scope.showSelectProfile && !$scope.showName && !$scope.showGender
                && !$scope.showDOB && !$scope.showPassword && !$scope.showreligion && !$scope.showemail && !$scope.showMobileNumber) {

                $http({
                    method: 'POST',
                    url: resourceUrl.url()+'user?step=1&profile_for='+$scope.reg.profile_for+'&' +
                    'name='+$scope.reg.name+'&gender='+$scope.reg.gender+'&dob='+date1+'&religion='+parseInt($scope.reg.religion)+
                    '&mothertongue=' +$scope.reg.mothertongue+
                    '&country_code='+$scope.reg+'&email='+$scope.reg.email+'&' +
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
                $state.go('reg')
            }
        };


    };

    //}
    angular.module('dashboard').controller('ModalInstanceCtrl', function ($scope,storageService,$http,resourceUrl,$uibModalInstance, items,$state,$log) {
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
                $uibModalInstance.close(vm.selected.item);
                storageService.set("token",response.data.access_token)
                storageService.set("id",response.data.id_people);
                if(response.data.image == ''){
                    storageService.set("image_url","assets/defaultImages/avatar.png");
                }else{
                    storageService.set("image_url",response.data.image);

                }
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