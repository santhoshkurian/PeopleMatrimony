(function ()
{
    'use strict';

    angular
        .module('dashboard',['ui.bootstrap.pagination'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.pending', {
            url      : '/pending',
            views    : {
                'content@app'         : {
                    templateUrl: 'app/main/dashboard/pending/pending.html',
                    controller : 'PendingController as vm'
                }
            },
            resolve  : {
                
            }
        })
            .state('app.accept', {
                url      : '/accept',
                views    : {
                    'content@app'         : {
                        templateUrl: 'app/main/dashboard/accept/accept.html',
                        controller : 'AcceptController as vm'
                    }
                },
                resolve  : {

                }
            }) .state('app.decline', {
                url      : '/decline',
                views    : {
                    'content@app'         : {
                        templateUrl: 'app/main/dashboard/decline/decline.html',
                        controller : 'DeclineController as vm'
                    }
                },
                resolve  : {

                }
            })
            .state('profile.contact', {
                url      : '/contact',
                views    : {
                    'content@profile'         : {
                        templateUrl: 'app/main/profile/contactdetails/contactDetails.html',
                        controller : 'DeclineController as vm'
                    }
                },
                resolve  : {

                }
            }).state('profile.photos', {
                url      : '/managephotos',
                views    : {
                    'content@profile'         : {
                        templateUrl: 'app/main/profile/managephotos/managePhoto.html',
                        controller : 'DeclineController as vm'
                    }
                },
                resolve  : {

                }
            }).state('search.advanced', {
                url      : '/advanced',
                views    : {
                    'content@search'         : {
                        templateUrl: 'app/main/search/advanced/advanced.html',
                        controller: 'AdvancedSearchController as vm'
                    }
                },
                resolve  : {

                }
            }).state('search.robo', {
                url      : '/robo',
                views    : {
                    'content@search'         : {
                        templateUrl: 'app/main/search/robosearch/roboSearch.html',
                        controller: 'RoboSearchController as vm'
                    }
                },
                resolve  : {

                }
            }).state('search.searchbyId', {
                url      : '/searchbyId',
                views    : {
                    'content@search'         : {
                        templateUrl: 'app/main/search/searchbyid/searchById.html',
                        controller: 'SearchByIdController as vm'
                    }
                },
                resolve  : {

                }
            }).state('settings.emailalerts', {
                url      : '/emailalerts',
                views    : {
                    'content@settings'         : {
                        templateUrl: 'app/main/settings/manageEmail/manageEmail.html',
                        controller: 'ManageEmailController as vm'
                    }
                },
                resolve  : {

                }
            }).state('settings.contactFilters', {
                url      : '/contactFilters',
                views    : {
                    'content@settings'         : {
                        templateUrl: 'app/main/settings/contactFilters/contactFilters.html',
                        controller: 'ContactFiltersController as vm'
                    }
                },
                resolve  : {

                }
            }).state('settings.privacySettings', {
                url      : '/privacySettings',
                views    : {
                    'content@settings'         : {
                        templateUrl: 'app/main/settings/privacySettings/privacySettings.html',
                        controller: 'PrivacySettingsController as vm'
                    }
                },
                resolve  : {

                }
            }).state('settings.membershipDetails', {
                url      : '/membershipDetails',
                views    : {
                    'content@settings'         : {
                        templateUrl: 'app/main/settings/membershipDetails/membershipDetails.html',
                        controller: 'MembershipDetailsController as vm'
                    }
                },
                resolve  : {

                }
            }).state('settings.deactivateProfile', {
                url      : '/deactivateProfile',
                views    : {
                    'content@settings'         : {
                        templateUrl: 'app/main/settings/deactivateProfile/deactivateProfile.html',
                        controller: 'DeactivateProfileController as vm'
                    }
                },
                resolve  : {

                }
            }).state('messages.sent', {
                url      : '/sent',
                views    : {
                    'content@messages'         : {
                        templateUrl: 'app/main/message/message.html',
                        controller: 'MessageController as vm'
                    }
                ,
                'navigation@messages': {
                    templateUrl: 'app/navigation/message/sent/sentNavigation.html',
                    controller: 'SentNavController as vm'
                }
                },
                resolve  : {

                }
            });

    }

})();