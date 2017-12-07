(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ManagePhotoController', ManagePhotoController);

    /** @ngInject */
    function ManagePhotoController(resourceUrl,$scope,storageService,$http,$state) {
        console.log("ManagePhotoController");
        $scope.viewType = 'managephoto';
        $scope.logout = logout;

        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token",null);
                storageService.set("id",null);
                storageService.set("image_url",null);
                storageService.set("name",null);
                $state.go('login');

            }, function errorCallback(response) {

            });
        }
        $scope.uploadmsg = '';
        $scope.recentUpload = '';
        $scope.groupName = '';
        $scope.hidegroup = true;
        $scope.selectType = selectType;
        $scope.group = group;
        $scope.backtomain = backtomain;
        $scope.changeProfilePic = changeProfilePic;
        $scope.removeProfilePic = removeProfilePic;



        function changeProfilePic(image){
           console.log(image);
            $http({
                method: 'post',
                url: resourceUrl.url()+'image/primary?token=' + storageService.get("token")+'&id='+storageService.get("token")+'&number='+image.number
            }).then(function successCallback(response) {
                console.log("update",response)
                $scope.image_url = storageService.set("image_url",image.image);


            }, function errorCallback(response) {
                console.log(response)

            });
        }

        function removeProfilePic(image){
           console.log(image);
            $http({
                method: 'post',
                url: resourceUrl.url()+'image/delete?token=' + storageService.get("token")+'&id='+storageService.get("token")+'&number='+image.number
            }).then(function successCallback(response) {

                $http({
                    method: 'GET',
                    url: resourceUrl.url()+'user/image/'+storageService.get("id")+'?token=' + storageService.get("token")
                }).then(function successCallback(response) {
                    console.log("check",response)
                    $scope.images = response.data.user.images;


                }, function errorCallback(response) {
                    console.log(response)

                });

            }, function errorCallback(response) {
                console.log(response)

            });
        }


        function selectType(type){
            $scope.viewType = type;
        }

        function backtomain(){
            $scope.viewType = 'managephoto';
            $scope.hidegroup = true;


        }
        function group(type){
            console.log(type)
            $scope.groupName = type;

            $scope.viewType = 'group';
            $scope.hidegroup = false;



            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/image/'+storageService.get("id")+'?token=' + storageService.get("token")
            }).then(function successCallback(response) {
                console.log("check",response)
                $scope.images = response.data.user.images;


            }, function errorCallback(response) {
                console.log(response)

            });

        }





        $scope.images =[];
        $scope.general = $scope.images.length;

        $scope.uploadFile = function () {
            var file = document.getElementById("myFile");
            $scope.uploadmsg= 'Uploading ....';
                var k = "https://devapi.peoplematrimony.com/image/upload";
                var j = new FormData;
                j.append("id", storageService.get("id")),
                    j.append("token", storageService.get("token")),
                    j.append("image", file.files[0]);


                $http({
                    method: "post",
                    url: "https://devapi.peoplematrimony.com/image/upload",
                    headers: {"Content-Type": void 0},
                    transformRequest: angular.identity,
                    data: j
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.uploadmsg= 'Uploaded Successfully';
                    $scope.recentUpload= 'http://devapi.peoplematrimony.com'+response.data.path+'/'+response.data.name;


                    $http({
                        method: 'GET',
                        url: resourceUrl.url()+'user/image/' + storageService.get("id") + '?token=' + storageService.get("token")
                    }).then(function successCallback(response) {
                        console.log("check", response)
                        $scope.uploadmsg= '';

                        $scope.images = response.data.user.images;


                    }, function errorCallback(response) {
                        console.log(response)

                    });


                }, function errorCallback(response) {
                    console.log(response);
                });



            //$http.post(k, j, {
            //    headers: {"Content-Type": void 0},
            //    transformRequest: angular.identity
            //}).success(function (a) {
            //    console.log(a)
            //}).error(function (a, b) {
            //    console.log(a,b)
            //
            //});



        };
        $scope.uploadFile1 = function () {
            var file = document.getElementById("myFile1");
            $scope.uploadmsg= 'Uploading ....';
                var k = "https://devapi.peoplematrimony.com/image/upload";
                var j = new FormData;
                j.append("id", storageService.get("id")),
                    j.append("token", storageService.get("token")),
                    j.append("image", file.files[0]);


                $http({
                    method: "post",
                    url: "https://devapi.peoplematrimony.com/image/upload",
                    headers: {"Content-Type": void 0},
                    transformRequest: angular.identity,
                    data: j
                }).then(function successCallback(response) {
                    console.log(response)
                    $scope.uploadmsg= 'Uploaded Successfully';
                    $scope.recentUpload= 'http://devapi.peoplematrimony.com'+response.data.path+'/'+response.data.name;

                    $http({
                        method: 'GET',
                        url: resourceUrl.url()+'user/image/' + storageService.get("id") + '?token=' + storageService.get("token")
                    }).then(function successCallback(response) {
                        console.log("check", response)
                        $scope.uploadmsg= '';

                        $scope.images = response.data.user.images;


                    }, function errorCallback(response) {
                        console.log(response)

                    });


                }, function errorCallback(response) {
                    console.log(response);
                });



            //$http.post(k, j, {
            //    headers: {"Content-Type": void 0},
            //    transformRequest: angular.identity
            //}).success(function (a) {
            //    console.log(a)
            //}).error(function (a, b) {
            //    console.log(a,b)
            //
            //});



        };



        //$scope.images = [
        //    {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 01 description"},
        //    {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 02 description"},
        //    {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 03 description"},
        //    {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 04 description"},
        //    {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 05 description"}
        //];

    }


})();