(function () {
    'use strict';

    angular
        .module('matrimony')
        .directive('userinfo', function () {
            return {
                restrict: 'E',
                scope: {
                    user: '=',
                    gender: '='
                },
                templateUrl: '/app/directive/image-scroll/image-scroll.html',
                controller: function ($scope) {
                    $scope.display ='';
                    $scope.size = $scope.user.length;
                    if($scope.size != 0) {
                        $scope.display = $scope.user[0].image;
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
                            $scope.display = $scope.user[$scope.pos].image;
                        }
                    };
                    $scope.imageBackward = function () {
                        if($scope.pos > 0) {
                            $scope.pos = $scope.pos -1;
                            $scope.display = $scope.user[$scope.pos].image;
                        }
                    };
                },
            };

        });
    ;


})();