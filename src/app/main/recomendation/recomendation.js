(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ReconmendationController', ReconmendationController);

    /** @ngInject */
    function ReconmendationController($scope,storageService,$state,dailyMatches) {
        var vm = this;

        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        console.log("dailyMatches",dailyMatches);
        $scope.dailyMatches = dailyMatches;
        $scope.recomendationList = [];

        if($scope.dailyMatches.matches.length > 0){
            $scope.view = $scope.dailyMatches.matches[0];
            $scope.dailyMatches.matches.filter(function(a){
                $scope.recomendationList.push({
                        name: a.name,
                        percentage: "76 %",
                        imageSrc: "../assets/images/profile2.jpg"
                    })

            });
        }

        $scope.viewType = 'personal';
        $scope.selectType = selectType;
        function selectType(type) {
            $scope.viewType = type;
        }


        $scope.showSelected = showSelected;
        function showSelected(obj) {
            $scope.view = obj;
        }


        //$scope.recomendationList = [{
        //    name: "Priya rajini",
        //    percentage: "76 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Vimala Raman",
        //    percentage: "76 %",
        //    imageSrc: "../assets/img/avatar9.jpg"
        //}, {
        //    name: "Jisha Micheal",
        //    percentage: "66 %",
        //    imageSrc: "../assets/images/prof1.jpg"
        //}, {
        //    name: "Akku mathew",
        //    percentage: "56 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Arathi krishnan",
        //    percentage: "86 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Priyanka chopra",
        //    percentage: "66 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Priya rajini",
        //    percentage: "86 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Vimala Raman",
        //    percentage: "76 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Jisha Micheal",
        //    percentage: "66 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Akku mathew",
        //    percentage: "56 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Arathi krishnan",
        //    percentage: "86 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Priyanka chopra",
        //    percentage: "66 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Priya rajini",
        //    percentage: "86 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Vimala Raman",
        //    percentage: "76 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Jisha Micheal",
        //    percentage: "66 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Akku mathew",
        //    percentage: "56 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Arathi krishnan",
        //    percentage: "86 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}, {
        //    name: "Priyanka chopra",
        //    percentage: "66 %",
        //    imageSrc: "../assets/images/profile2.jpg"
        //}];

        $scope.logout = logout;
        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token",'');
                storageService.set("id",'');
                storageService.set("image_url",'');
                storageService.set("name",'');
                storageService.set("package",'');
                storageService.set("regular_search",'');
                $state.go('login');

            }, function errorCallback(response) {

            });
        }
    }




})();