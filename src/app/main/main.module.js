(function ()
{
    'use strict';

    angular
        .module('dashboard',[])
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
            });

    }

})();