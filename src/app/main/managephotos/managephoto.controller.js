(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ManagePhotoController', ManagePhotoController);

    /** @ngInject */
    function ManagePhotoController(resourceUrl,privacy,$scope,storageService,profile,$http,$state,loadImages) {
        console.log("ManagePhotoController");
        console.log("ManagePhotoController", loadImages.user.images.length);
        $scope.viewType = 'managephoto';
        $scope.privacy = privacy;
        $scope.profile = profile;
        $scope.changePhoto = changePhoto;




        $scope.imageLength = loadImages.user.images.length;

        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        if($scope.imageLength > 0){
            $scope.selectedMeal = {url:loadImages.user.images[0].image}
        }

        changePhoto();

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

        $scope.uploadmsg = '';
        $scope.recentUpload = '';
        $scope.groupName = '';
        $scope.hidegroup = true;
        $scope.selectType = selectType;
        $scope.group = group;
        $scope.backtomain = backtomain;
        $scope.changeProfilePic = changeProfilePic;
        $scope.removeProfilePic = removeProfilePic;

        function changePhoto(){

            if (profile.user.gender == 'female'){
                if ($scope.privacy.photo == 'protected') {
                    $scope.image = '/assets/defaultImages/female_photo_protected_card.jpg';
                }
                if ($scope.privacy.photo != 'protected') {
                    if($scope.imageLength == 0) {
                        $scope.image = '/assets/defaultImages/female_card.jpg';
                    }else{
                        $scope.image = loadImages.user.images[0].image;
                    }
                }
            }
            if (profile.user.gender == 'male'){
                if ($scope.privacy.photo == 'protected') {
                    $scope.image = '/assets/defaultImages/male_photo_protected_card.jpg';
                }
                if ($scope.privacy.photo != 'protected') {
                    if($scope.imageLength == 0) {
                        $scope.image = '/assets/defaultImages/male_card.jpg';
                    }else{
                        $scope.image = loadImages.user.images[0].image;
                    }
                }
            }
        }



        function changeProfilePic(image){
           console.log(image);
            $http({
                method: 'post',
                url: resourceUrl.url()+'image/primary?token=' + storageService.get("token")+'&id='+storageService.get("token")+'&number='+image.number
            }).then(function successCallback(response) {
                console.log("update",response);
                storageService.set("image_url",image.image);
                $scope.image_url = storageService.get("image_url");


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


        $scope.editPhotoPrivacy = editPhotoPrivacy;
        function editPhotoPrivacy(obj){
            $http({
                method: 'POST',
                url: resourceUrl.url()+'settings/privacy?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&photo='+obj
            }).then(function successCallback(response) {
            }, function errorCallback(response) {


            });

        }


        $scope.images =[];
        $scope.general = $scope.images.length;
        $scope.recentUpload = '';

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
        $scope.uploadFile2 = function () {
            var file = document.getElementById("myFile2");
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