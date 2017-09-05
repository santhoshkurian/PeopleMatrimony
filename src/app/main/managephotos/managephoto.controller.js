(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ManagePhotoController', ManagePhotoController);

    /** @ngInject */
    function ManagePhotoController($scope,storageService,$http) {
        console.log("ManagePhotoController");
        $scope.viewType = 'managephoto';
        $scope.image_url = storageService.get("image_url");

        $scope.uploadmsg = '';
        $scope.groupName = '';
        $scope.hidegroup = true;
        $scope.selectType = selectType;
        $scope.group = group;
        $scope.backtomain = backtomain;
        $scope.changeProfilePic = changeProfilePic;



        function changeProfilePic(image){
           console.log(image);
            $http({
                method: 'post',
                url: 'https://devapi.peoplematrimony.com/image/primary?token=' + storageService.get("token")+'&id='+storageService.get("token")+'&number='+image.number
            }).then(function successCallback(response) {
                console.log("update",response)
                $scope.image_url = storageService.set("image_url",image.image);


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
                url: 'https://devapi.peoplematrimony.com/user/image/'+storageService.get("id")+'?token=' + storageService.get("token")
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

                    $http({
                        method: 'GET',
                        url: 'https://devapi.peoplematrimony.com/user/image/' + storageService.get("id") + '?token=' + storageService.get("token")
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