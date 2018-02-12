(function () {
    'use strict';

    angular
        .module('matrimony')
        .directive('mailbox', function () {
            return {
                restrict: 'E',
                scope: {
                    mail: '=',
                    res: '='
                },
                templateUrl: '/app/directive/mail-box/mail-box.html',
                controller: function ($scope) {
                    console.log("mail",$scope.mail);
                    console.log("type",$scope.res);
                    $scope.len = 0;
                    $scope.showLink = false;
                    if($scope.mail.length> 0){
                        $scope.showLink = true;
                    }
                    $scope.showCon = function(){
                        $scope.len = $scope.mail.length
                        $scope.showLink = false;

                    }
                    //$scope.indexValue = 0;
                    //$scope.previous = 0;
                    //$scope.display ='';
                    //$scope.size = $scope.images.length;
                    //if($scope.size != 0) {
                    //    $scope.display = $scope.images[0].image;
                    //    $scope.pos = 0;
                    //}
                    //if($scope.settings != null && $scope.settings.length > 0) {
                    //    if ($scope.settings[0].photo_privacy == 'protected') {
                    //        $scope.images = [];
                    //        if ($scope.gender == 'female') {
                    //            $scope.images.push({image: "/assets/defaultImages/female_photo_protected_card.jpg"});
                    //        }
                    //        if ($scope.gender == 'male') {
                    //            $scope.images.push({image: "/assets/defaultImages/male_photo_protected_card.jpg"});
                    //        }
                    //    } else {
                    //        if ($scope.size == 0) {
                    //            if ($scope.gender == 'female') {
                    //                $scope.images.push({image: "/assets/defaultImages/female_card.jpg"});
                    //            }
                    //            if ($scope.gender == 'male') {
                    //                $scope.images.push({image: "/assets/defaultImages/male_card.jpg"});
                    //            }
                    //        }
                    //
                    //    }
                    //}else {
                    //
                    //    if ($scope.size == 0) {
                    //        if ($scope.gender == 'female') {
                    //            $scope.images.push({image: "/assets/defaultImages/female_card.jpg"});
                    //        }
                    //        if ($scope.gender == 'male') {
                    //            $scope.images.push({image: "/assets/defaultImages/male_card.jpg"});
                    //        }
                    //        $scope.pos = 0;
                    //    }
                    //}
                    //
                    //$scope.imageForward = function () {
                    //    $scope.previous = $scope.indexValue;
                    //    if($scope.indexValue < $scope.size-1) {
                    //        $scope.indexValue = $scope.indexValue +1;
                    //        //$scope.display = $scope.images[$scope.pos].image;
                    //    }
                    //};
                    //$scope.imageBackward = function () {
                    //    //$scope.indexValue = $scope.indexValue;
                    //
                    //    if($scope.indexValue > 0) {
                    //        $scope.indexValue = $scope.indexValue -1;
                    //        //$scope.display = $scope.images[$scope.pos].image;
                    //    }
                    //};
                    //
                    //$scope.reverse1 = function () {
                    //    $scope.reverse({data:$scope.images});
                    //};
                },
            };

        });
    ;


})();