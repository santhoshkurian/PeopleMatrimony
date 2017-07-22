(function () {
    'use strict';

    angular
        .module('matrimony')
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
                        templateUrl: 'app/core/layouts/dbLayout.html'
                        //controller : 'InboxController as vm'
                    },
                    'toolbar@app': {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html',
                        controller: 'DashboardToolbarController as vm'
                    },
                    'navigation@app': {
                        templateUrl: 'app/navigation/dashboard/dbNavigation.html',
                        controller: 'NavigationController as vm'
                    },
                    'dbNavigationRight@app'         : {
                        templateUrl: 'app/navigation/dashboard-right/dashBoardRight.html',
                        controller : 'DashBoardRightController as vm'
                    },
                    'content@app'         : {
                        templateUrl: 'app/main/dashboard/inbox/inbox.html',
                        controller: 'InboxController as vm'
                    },
                    'footer@app': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                }
            }).state('login', {
                url: '/login',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/loginLayout.html'
                        //controller : 'MainController as vm'
                    },
                    'toolbar@login': {
                        templateUrl: 'app/toolbar/login/loginToolbar.html'
                        //controller : 'LoginController as vm'
                    },
                    'content@login': {
                        templateUrl: 'app/main/login/loginContent.html',
                        controller: 'LoginController as vm'
                    }
                }
            }).state('reg', {
                url: '/reg',
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
                    }
                }
            }).state('profile', {
                url: '/profile',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/profileLayout.html'
                        //controller : 'MainController as vm'
                    },
                    'navigation@profile': {
                        templateUrl: 'app/navigation/profile/profileNavigation.html',
                        controller: 'NavigationController as vm'
                    },
                    'toolbar@profile': {
                        templateUrl: 'app/toolbar/profile/profileToolbar.html',
                        controller: 'ProfileToolbarController as vm'
                    },
                    'content@profile': {
                        templateUrl: 'app/main/profile/editProfile/profile.html',
                        controller: 'RegistrationController as vm'
                    },
                    'footer@profile': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
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
                        templateUrl: 'app/main/message/message.html',
                        controller: 'MessageController as vm'
                    },
                    'footer@messages': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }
                }
            }).state('matches', {
                url: '/matches',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/matchesLayout.html'
                        //controller : 'InboxController as vm'
                    },
                    'toolbar@matches': {
                        templateUrl: 'app/toolbar/matches/matchestoolbar.html',
                        controller: 'MatchesToolbarController as vm'
                    },
                    'navigation@matches': {
                        templateUrl: 'app/navigation/matches/matchesNavigation.html',
                        controller: 'MatchesNavigationController as vm'
                    },
                    'content@matches': {
                        templateUrl: 'app/main/matches/matches.html',
                        controller: 'MatchesController as vm'
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
                }
            }).state('viewProfile', {
                url: '/viewProfile',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/viewProfileLayout.html'
                        //controller : 'InboxController as vm'
                    },
                    'toolbar@viewProfile': {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html',
                        controller: 'DashboardToolbarController as vm'
                    },
                    'navigation@viewProfile': {
                        templateUrl: 'app/navigation/view-profile/viewProfileNav.html',
                        controller: 'DashBoardRightController as vm'
                    },
                    'content@viewProfile'         : {
                        templateUrl: 'app/main/view-profile/viewProfile.html',
                        controller: 'ViewProfileController as vm'
                    },
                    'footer@viewProfile': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
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
            });
    }

})();
