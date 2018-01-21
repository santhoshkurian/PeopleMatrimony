(function () {
    'use strict';

    angular
        .module('matrimony')
        .directive('imageinfo', function () {
            return {
                restrict: 'E',
                scope: {
                    images: '=',
                    gender: '=',
                    settings: '=',
                    reverse: "&"
                },
                templateUrl: '/app/directive/image-scroll/image-scroll.html',
                controller: function ($scope) {
                    console.log("settings",$scope.settings);
                    $scope.indexValue = 0;
                    $scope.previous = 0;
                    $scope.display ='';
                    $scope.size = $scope.images.length;
                    if($scope.size != 0) {
                        $scope.display = $scope.images[0].image;
                        $scope.pos = 0;
                    }
                    if($scope.settings != null && $scope.settings.length > 0) {
                        if ($scope.settings[0].photo_privacy == 'protected') {
                            $scope.images = [];
                            if ($scope.gender == 'female') {
                                $scope.images.push({image: "/assets/defaultImages/female_photo_protected_card.jpg"});
                            }
                            if ($scope.gender == 'male') {
                                $scope.images.push({image: "/assets/defaultImages/male_photo_protected_card.jpg"});
                            }
                        } else {
                            if ($scope.size == 0) {
                                if ($scope.gender == 'female') {
                                    $scope.images.push({image: "/assets/defaultImages/female_card.jpg"});
                                }
                                if ($scope.gender == 'male') {
                                    $scope.images.push({image: "/assets/defaultImages/male_card.jpg"});
                                }
                            }

                        }
                    }else {

                        if ($scope.size == 0) {
                            if ($scope.gender == 'female') {
                                $scope.images.push({image: "/assets/defaultImages/female_card.jpg"});
                            }
                            if ($scope.gender == 'male') {
                                $scope.images.push({image: "/assets/defaultImages/male_card.jpg"});
                            }
                            $scope.pos = 0;
                        }
                    }

                    $scope.imageForward = function () {
                        $scope.previous = $scope.indexValue;
                        if($scope.indexValue < $scope.size-1) {
                            $scope.indexValue = $scope.indexValue +1;
                            //$scope.display = $scope.images[$scope.pos].image;
                        }
                    };
                    $scope.imageBackward = function () {
                        //$scope.indexValue = $scope.indexValue;

                        if($scope.indexValue > 0) {
                            $scope.indexValue = $scope.indexValue -1;
                            //$scope.display = $scope.images[$scope.pos].image;
                        }
                    };

                    $scope.reverse1 = function () {
                        $scope.reverse({data:$scope.images});
                    };
                },
            };

        });
    ;


})();