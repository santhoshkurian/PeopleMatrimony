(function () {
    'use strict';

    angular
        .module('matrimony')
        .factory('storageService', ['$rootScope', function ($rootScope) {

            return {
                get: function (key) {
                    return localStorage.getItem(key);
                },
                set: function (key, data) {
                    localStorage.setItem(key, data);
                }
            };
        }])
        .factory('resourceUrl', [function () {
            return {
                url: function () {
                    return "http://devapi.peoplematrimony.com/";
                }
            }
        }])

        .run(function ($rootScope, $state, storageService) {
            $rootScope
                .$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams, $scope) {
                    console.log("start")
                    console.log(toState)
                    $scope.toState = toState;
                    $("#ui-view").html("");
                    $(".page-loading").removeClass("page-loading-hidden");
                    if ($scope.toState.name != 'login') {
                        $("#body-filter").addClass("page-grey-color");
                        $(".page-loading").addClass("page-loading-hidden");

                    }
                });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $(".page-loading").addClass("page-loading-hidden");
                $("#body-filter").removeClass("page-grey-color");
                if ((storageService.get("token") == null && storageService.get("id") == null) ||
                    (storageService.get("token") == 'null' && storageService.get("id") == 'null')) {
                    $state.go("login");


                } else {
                    $state.go(toState);
                }

            });


        })
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/login');

        // State definitions
        $stateProvider
            .state('app', {
                url: '/app',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/dbLayout.html',
                        controller: 'DashboardController as vm'
                    },
                    'toolbar@app': {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html',
                        //controller: 'DashboardController as vm'
                    },
                    'navigation@app': {
                        templateUrl: 'app/navigation/dashboard/dbNavigation.html',
                        //controller: 'DashboardController as vm'
                    },
                    'dbNavigationRight@app': {
                        templateUrl: 'app/navigation/dashboard-right/dashBoardRight.html',
                        controller: 'DashBoardRightController as vm'
                    },
                    'content@app': {
                        templateUrl: 'app/main/dashboard/inbox/inbox.html',
                        //controller: 'DashboardController as vm'
                    },
                    'footer@app': {
                        templateUrl: 'app/footer/footer.html',
                        //controller: 'FooterController as vm'
                    }
                }, resolve: {
                    profileCompleteness: function ($http,resourceUrl, storageService) {
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'completeprofile?' +
                            'id=' + storageService.get("id") + 'p_debug=1&token=' + storageService.get("token")
                        }).then(function successCallback(response) {
                            console.log(response)
                            return response.data;

                        }, function errorCallback(response) {
                            //console.log(response)
                            return response;


                        });
                    },
                    newMatches: function ($http,resourceUrl, storageService) {
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'matches/new??' +
                            'id=' + storageService.get("id") + 'p_debug=1&token=' + storageService.get("token")
                        }).then(function successCallback(response) {
                            console.log(response)
                            return response.data;

                        }, function errorCallback(response) {
                            //console.log(response)
                            return response;


                        });
                    },
                    recentUpdated: function ($http,resourceUrl, storageService) {
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'list/recentupdated??' +
                            'id=' + storageService.get("id") + 'p_debug=1&token=' + storageService.get("token")
                        }).then(function successCallback(response) {
                            console.log(response)
                            return response.data;

                        }, function errorCallback(response) {
                            //console.log(response)
                            return response;


                        });
                    },
                    viewed: function ($http,resourceUrl, storageService) {
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'list/viewed??' +
                            'id=' + storageService.get("id") + 'p_debug=1&token=' + storageService.get("token")
                        }).then(function successCallback(response) {
                            console.log(response)
                            return response.data;

                        }, function errorCallback(response) {
                            //console.log(response)
                            return response;


                        });
                    },
                    discoverMatches: function ($http,resourceUrl, storageService) {
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'v1/matches/discover?' +
                            'id=' + storageService.get("id") + '&p_debug=1&token=' + storageService.get("token")
                        }).then(function successCallback(response) {
                            console.log(response)
                            return response.data;

                        }, function errorCallback(response) {
                            //console.log(response)
                            return response;


                        });
                    }

                }
            }).state('login', {
                url: '/login',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/loginLayout.html',
                        controller: 'LoginController as vm'
                    },
                    'toolbar@login': {
                        templateUrl: 'app/toolbar/login/loginToolbar.html'
                        //controller : 'LoginController as vm'
                    },
                    'content@login': {
                        templateUrl: 'app/main/login/loginContent.html',
                    },
                    'footer@login': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                }
            }).state('reg', {
                url: '/reg/:reg_id',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/loginLayout.html'
                        //controller : 'MainController as vm'
                    },
                    'toolbar@reg': {
                        templateUrl: 'app/toolbar/login/registrationToolbar.html'
                        //controller : 'LoginController as vm'
                    },
                    'content@reg': {
                        templateUrl: 'app/main/registration/registration.html',
                        controller: 'RegistrationController as vm'
                    },
                    'footer@reg': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                },
                resolve: {
                    populate: function ($http,resourceUrl) {
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'populate'
                        }).then(function successCallback(response) {
                            console.log(response)
                            return response.data;

                        }, function errorCallback(response) {
                            //console.log(response)
                            return response;


                        });
                    }

                }
            }).state('profile', {
                url: '/profile',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/profileLayout.html',
                        controller: 'ProfileController as vm'
                    },
                    'navigation@profile': {
                        templateUrl: 'app/navigation/profile/profileNavigation.html',
                        //controller: 'NavigationController as vm'
                    },
                    'toolbar@profile': {
                        templateUrl: 'app/toolbar/profile/profileToolbar.html',
                        controller: 'ProfileToolbarController as vm'
                    },
                    'content@profile': {
                        templateUrl: 'app/main/profile/editProfile/profile.html',
                        //controller: 'ProfileController as vm'
                    },
                    'footer@profile': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                },
                resolve: {
                    populate: function ($http,resourceUrl) {
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'populate'
                        }).then(function successCallback(response) {
                            console.log(response)
                            return response.data;

                        }, function errorCallback(response) {
                            //console.log(response)
                            return response;


                        });
                    },
                    profile: function (storageService,resourceUrl, $http) {

                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'user/view?' +
                            'view_id=' + storageService.get("id") + '&token=' + storageService.get("token")
                        }).then(function successCallback(response) {
                            console.log(response)
                            return response.data;

                        }, function errorCallback(response) {
                            console.log(response)

                        });
                    }

                }
            }).state('search', {
                url: '/search',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/searchLayout.html'
                        //controller : 'InboxController as vm'
                    },
                    'toolbar@search': {
                        templateUrl: 'app/toolbar/search/searchtoolbar.html',
                        controller: 'SearchToolbarController as vm'
                    },
                    'navigation@search': {
                        templateUrl: 'app/navigation/search/searchNavigation.html',
                        controller: 'NavigationController as vm'
                    },
                    'content@search': {
                        templateUrl: 'app/main/search/regular/regular.html',
                        controller: 'RegularSearchController as vm'
                    },
                    'footer@search': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                },
                resolve: {
                    populate: function ($http,resourceUrl) {
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'populate'
                        }).then(function successCallback(response) {
                            console.log(response)
                            return response.data;

                        }, function errorCallback(response) {
                            //console.log(response)
                            return response;


                        });
                    }
                }
            }).state('settings', {
                url: '/settings',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/settingsLayout.html'
                        //controller : 'InboxController as vm'
                    },
                    'toolbar@settings': {
                        templateUrl: 'app/toolbar/settings/settingsToolbar.html',
                        controller: 'SettingsNavController as vm'
                    },
                    'navigation@settings': {
                        templateUrl: 'app/navigation/settings/settingNavigation.html',
                        controller: 'NavigationController as vm'
                    },
                    'content@settings': {
                        templateUrl: 'app/main/settings/accountsettings/accountSettings.html',
                        controller: 'AccountSettingsController as vm'
                    },
                    'footer@settings': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                },
                resolve: {
                    account: function ($http,resourceUrl, storageService) {
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'settings?id=' + storageService.get("id") +
                            '&type=account&token=' + storageService.get('token')
                        }).then(function successCallback(response) {
                            return response.data;
                        }, function errorCallback(response) {
                            return response;
                        });
                    }
                }
            }).state('messages', {
                url: '/messages',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/messageLayout.html'
                        //controller : 'InboxController as vm'
                    },
                    'toolbar@messages': {
                        templateUrl: 'app/toolbar/message/messagetoolbar.html',
                        controller: 'MessageToolbarController as vm'
                    },
                    'navigation@messages': {
                        templateUrl: 'app/navigation/message/inbox/inboxNavigation.html',
                        controller: 'InboxNavController as vm'
                    },
                    'content@messages': {
                        templateUrl: 'app/main/message/inbox/pending/messagePending.html',
                        controller: 'MessagePendingController as vm'
                    },
                    'footer@messages': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                },
                resolve: {
                    pending: function ($http, storageService,resourceUrl) {
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'inbox?' +
                            '&token=' + storageService.get("token") + '&type=pending'
                        }).then(function successCallback(response) {
                            return response.data;
                        }, function errorCallback(response) {
                            return response;
                        });
                    }
                }
            }).state('matches', {
                url: '/matches',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/matchesLayout.html',
                        controller: 'MatchesController as vm'
                    },
                    'toolbar@matches': {
                        templateUrl: 'app/toolbar/matches/matchestoolbar.html'
                    },
                    'navigation@matches': {
                        templateUrl: 'app/navigation/matches/matchesNavigation.html'
                    },
                    'content@matches': {
                        templateUrl: 'app/main/matches/matches.html',
                    },
                    'footer@matches': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                }
            }).state('searchresult', {
                url: '/searchresult',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/searchResultLayout.html'
                        //controller : 'InboxController as vm'
                    },
                    'toolbar@searchresult': {
                        templateUrl: 'app/toolbar/searchresults/searchresultstoolbar.html',
                        controller: 'SearchResultsToolbarController as vm'
                    },
                    'navigation@searchresult': {
                        templateUrl: 'app/navigation/searchresults/searchResultsNavigation.html',
                        controller: 'InboxNavController as vm'
                    },
                    'content@searchresult': {
                        templateUrl: 'app/main/searchresults/searchresults.html',
                        controller: 'SearchResultsController as vm'
                    },
                    'footer@searchresult': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                },
                params: {
                    name: null
                }
            }).state('viewProfile', {
                url: '/viewProfile/:view_id',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/viewProfileLayout.html',
                        controller: 'ViewProfileController as vm'
                    },
                    'toolbar@viewProfile': {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html',
                        //controller: 'DashboardToolbarController as vm'
                    },
                    'navigation@viewProfile': {
                        templateUrl: 'app/navigation/view-profile/viewProfileNav.html',
                        //controller: 'DashBoardRightController as vm'
                    },
                    'content@viewProfile': {
                        templateUrl: 'app/main/view-profile/viewProfile.html'
                    },
                    'footer@viewProfile': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                },resolve: {
                    viewProfile: function ($http, storageService,resourceUrl,$stateParams) {
                        return  $http({
                            method: 'GET',
                            url: resourceUrl.url()+'user/view?'+
                            'view_id='+$stateParams.view_id+'&token='+storageService.get("token")
                        }).then(function successCallback(response) {
                            return response.data;
                        }, function errorCallback(response) {
                            return response;
                        });
                    }
                }
            }).state('recomendation', {
                url: '/recomendation',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/recomendation.html'
                        //controller : 'InboxController as vm'
                    },
                    'toolbar@recomendation': {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html',
                        controller: 'DashboardToolbarController as vm'
                    },
                    'content@recomendation': {
                        templateUrl: 'app/main/recomendation/recomendation.html',
                        controller: 'ReconmendationController as vm'
                    },
                    'content-top@recomendation': {
                        templateUrl: 'app/main/recomendation/recomendationTop.html',
                        controller: 'ReconmendationController as vm'
                    },
                    'navigation@recomendation': {
                        templateUrl: 'app/navigation/recomendation/recomendation.html'
                    },
                    'footer@recomendation': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                }
            }).state('managephoto', {
                url: '/managephoto',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/managePhotoLayout.html'
                        //controller : 'InboxController as vm'
                    },
                    'toolbar@managephoto': {
                        templateUrl: 'app/toolbar/managephoto/managephotoToolbar.html',
                        controller: 'ManagePhotoController as vm'
                    },
                    'content@managephoto': {
                        templateUrl: 'app/main/managephotos/managephoto.html',
                        controller: 'ManagePhotoController as vm'
                    },

                    'footer@managephoto': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                }
            }).state('payment', {
                url: '/payment',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/paymentLayout.html'
                        //controller : 'InboxController as vm'
                    },
                    'toolbar@payment': {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html',
                    },
                    'content@payment': {
                        templateUrl: 'app/main/payment/payment.html',
                        controller: 'PaymentController as vm'
                    },
                    'footer@payment': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                }
            });

    }

    function initRun() {
        console.log("run");

    }

})();
