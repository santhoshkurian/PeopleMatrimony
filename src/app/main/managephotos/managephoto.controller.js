(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ManagePhotoController', ManagePhotoController);

    /** @ngInject */
    function ManagePhotoController($scope,storageService,$http) {
        console.log("ManagePhotoController");
        $scope.viewType = 'managephoto';
        $scope.selectType = selectType;
        function selectType(type){
            $scope.viewType = type;
        }

        $scope.uploadFile = function () {
            var file = document.getElementById("myFile");
            console.log(file.files[0]);
            var k = "https://devapi.peoplematrimony.com/image/upload";
           var  j = new FormData;
            j.append("id", storageService.get("id")),
                j.append("token", storageService.get("token")),
                j.append("image",file.files[0]);


                $http({
                    method: "post",
                    url: "https://devapi.peoplematrimony.com/image/upload",
                        headers: {"Content-Type": void 0},
                        transformRequest: angular.identity,
                    data : j
                }).then(function successCallback(response) {
                    console.log(response)
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



        $scope.images = [
            {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 01 description"},
            {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 02 description"},
            {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 03 description"},
            {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 04 description"},
            {"thumbnail":"../assets/images/prof1.jpg", "description":"Image 05 description"}
        ];

    }


})();