(function () {
    'use strict';

    angular
        .module('matrimony')
        .directive('imageinfo', function () {
            return {
                restrict: 'E',
                scope: {
                    images: '=',
                    gender: '='
                },
                templateUrl: '/app/directive/image-scroll/image-scroll.html',
                controller: function ($scope) {
                    $scope.display ='';
                    $scope.size = $scope.images.length;
                    if($scope.size != 0) {
                        $scope.display = $scope.images[0].image;
                        $scope.pos = 0;
                    }

                    if($scope.size == 0) {
                        if($scope.gender == 'female'){
                            $scope.display = "/assets/defaultImages/female_card.jpg";
                        }
                        if($scope.gender == 'male'){
                            $scope.display = "/assets/defaultImages/male_card.jpg";
                        }
                        $scope.pos = 0;
                    }

                    $scope.imageForward = function () {
                        if($scope.pos < $scope.size-1) {
                            $scope.pos = $scope.pos +1;
                            $scope.display = $scope.images[$scope.pos].image;
                        }
                    };
                    $scope.imageBackward = function () {
                        if($scope.pos > 0) {
                            $scope.pos = $scope.pos -1;
                            $scope.display = $scope.images[$scope.pos].image;
                        }
                    };
                },
            };

        });
    ;


})();