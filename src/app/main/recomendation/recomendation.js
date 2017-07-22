(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ReconmendationController', ReconmendationController);

    /** @ngInject */
    function ReconmendationController($scope) {
        var vm = this;
        $scope.viewType = 'personal';
        $scope.selectType = selectType;
        function selectType(type) {
            $scope.viewType = type;
        }

        $scope.recomendationList = [{
            name: "Priya rajini",
            percentage: "76 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Vimala Raman",
            percentage: "76 %",
            imageSrc: "../assets/img/avatar9.jpg"
        }, {
            name: "Jisha Micheal",
            percentage: "66 %",
            imageSrc: "../assets/images/prof1.jpg"
        }, {
            name: "Akku mathew",
            percentage: "56 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Arathi krishnan",
            percentage: "86 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Priyanka chopra",
            percentage: "66 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Priya rajini",
            percentage: "86 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Vimala Raman",
            percentage: "76 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Jisha Micheal",
            percentage: "66 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Akku mathew",
            percentage: "56 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Arathi krishnan",
            percentage: "86 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Priyanka chopra",
            percentage: "66 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Priya rajini",
            percentage: "86 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Vimala Raman",
            percentage: "76 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Jisha Micheal",
            percentage: "66 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Akku mathew",
            percentage: "56 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Arathi krishnan",
            percentage: "86 %",
            imageSrc: "../assets/images/profile2.jpg"
        }, {
            name: "Priyanka chopra",
            percentage: "66 %",
            imageSrc: "../assets/images/profile2.jpg"
        }];
    }


})();