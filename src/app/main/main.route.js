(function ()
{
    'use strict';

    angular
        .module('dashboard')
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
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
                    },
                    'navigation@search': {
                        templateUrl: 'app/navigation/search/searchNavigationAdvanced.html'
                    }
                },
                params: {
                    name: null
                },
                resolve:{
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
                url      : '/searchbyId/:id',
                views    : {
                    'content@search'         : {
                        templateUrl: 'app/main/search/searchbyid/searchById.html',
                        controller: 'SearchByIdController as vm'
                    },
                    'navigation@search': {
                        templateUrl: 'app/navigation/search/searchNavigationById.html',
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
                    alert:function($http,storageService,resourceUrl){

                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'settings?id='+storageService.get("id")+
                            '&type=email&token='+storageService.get('token')
                        }).then(function successCallback(response) {
                            return response.data;
                        }, function errorCallback(response) {
                            return response;
                        });
                    }

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
                    contact:function($http,storageService,resourceUrl){
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'settings?' +
                            'id='+storageService.get("id")+
                            '&type=contact' +
                            '&token='+storageService.get('token')
                        }).then(function successCallback(response) {
                            return response.data;
                        }, function errorCallback(response) {
                            return response;
                        });
                    }

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
                    privacy:function($http,storageService,resourceUrl){
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'settings?' +
                            'id='+storageService.get("id")+
                            '&type=privacy' +
                            '&token='+storageService.get('token')
                        }).then(function successCallback(response) {
                            return response.data;
                        }, function errorCallback(response) {
                            return response;
                        });
                    },
                    profile:function(storageService,resourceUrl,$http){

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
                    deactivate:function($http,resourceUrl,storageService){
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'settings?' +
                            'id='+storageService.get("id")+
                            '&type=profile' +
                            '&token='+storageService.get('token')
                        }).then(function successCallback(response) {
                            return response.data;
                        }, function errorCallback(response) {
                            return response;
                        });
                    }

                }
            }).state('messages.sent', {
                url      : '/sent',
                views    : {
                    'content@messages'         : {
                        templateUrl: 'app/main/message/sent/sent.html',
                        controller: 'SentController as vm'
                    }
                    ,
                    'navigation@messages': {
                        templateUrl: 'app/navigation/message/sent/sentNavigation.html',
                        controller: 'SentNavController as vm'
                    }
                },
                resolve  : {
                    sent:function($http,resourceUrl,storageService){
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'inbox?' +
                            '&token=' + storageService.get("token") + '&type=all_sent'
                        }).then(function successCallback(response) {
                            return response.data;
                        }, function errorCallback(response) {
                            return response;
                        });
                    }

                }
            }).state('messages.awaiting', {
                url      : '/awaiting',
                views    : {
                    'content@messages'         : {
                        templateUrl: 'app/main/message/awaitingReply/awaiting.html',
                        controller: 'AwaitingController as vm'
                    }
                    ,
                    'navigation@messages': {
                        templateUrl: 'app/navigation/message/sent/sentNavigation.html',
                        controller: 'SentNavController as vm'
                    }
                },
                resolve  : {
                    awaitingReply:function($http,resourceUrl,storageService){
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'inbox?' +
                            'token=' + storageService.get("token") + '&type=awaiting_reply'
                        }).then(function successCallback(response) {
                            return response.data;
                        }, function errorCallback(response) {
                            return response;
                        });
                    }
                }
            }).state('messages.pending', {
                url      : '/pending',
                views    : {
                    'content@messages'         : {
                        templateUrl: 'app/main/message/inbox/pending/messagePending.html',
                        controller: 'MessagePendingController as vm'
                    }
                    ,
                    'navigation@messages': {
                        templateUrl: 'app/navigation/message/inbox/inboxNavigation.html',
                        controller: 'InboxNavController as vm'
                    }
                },
                resolve  : {
                    pending:function($http,resourceUrl,storageService){
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
            }).state('messages.accept', {
                url      : '/accept',
                views    : {
                    'content@messages'         : {
                        templateUrl: 'app/main/message/inbox/accepted/messageAccepted.html',
                        controller: 'MessageAcceptedController as vm'
                    }
                    ,
                    'navigation@messages': {
                        templateUrl: 'app/navigation/message/inbox/inboxNavigation.html',
                        controller: 'InboxNavController as vm'
                    }
                },
                resolve  : {
                    accept:function($http,resourceUrl,storageService){
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'inbox?' +
                            '&token=' + storageService.get("token") + '&type=accepted'
                        }).then(function successCallback(response) {
                            return response.data;
                        }, function errorCallback(response) {
                            return response;
                        });
                    }
                }
            }).state('messages.declined', {
                url      : '/declined',
                views    : {
                    'content@messages'         : {
                        templateUrl: 'app/main/message/inbox/declined/messageDeclined.html',
                        controller: 'MessageDeclinedController as vm'
                    }
                    ,
                    'navigation@messages': {
                        templateUrl: 'app/navigation/message/inbox/inboxNavigation.html',
                        controller: 'InboxNavController as vm'
                    }
                },
                resolve  : {
                    declined:function($http,resourceUrl,storageService){
                        return $http({
                            method: 'GET',
                            url: resourceUrl.url()+'inbox?' +
                            '&token=' + storageService.get("token") + '&type=declined'
                        }).then(function successCallback(response) {
                            return response.data;
                        }, function errorCallback(response) {
                            return response;
                        });
                    }

                }
            })
            .state('messages.communication', {
                url      : '/communication/:page/:id',
                views    : {
                    'content@messages'         : {
                        templateUrl: 'app/main/message/communication/communication.html',
                        controller: 'CommunicationController as vm'
                    }
                    ,
                    'navigation@messages': {
                        templateUrl: 'app/navigation/message/inbox/inboxNavigation.html',
                        controller: 'InboxNavController as vm'
                    }
                },
                resolve  : {
                    viewProfile: function ($http, storageService,resourceUrl,$stateParams) {
                        return  $http({
                            method: 'GET',
                            url: resourceUrl.url()+'user/view?'+
                            'view_id='+$stateParams.id+'&token='+storageService.get("token")
                        }).then(function successCallback(response) {
                            console.log(response);
                            return response.data;
                        }, function errorCallback(response) {
                            return 'error';
                        });
                    }

                }
            })
            .state('businessEnquires', {
                url      : '/businessEnquires',
                views    : {
                    'main@': {
                        templateUrl: 'app/core/layouts/helpLayout.html',
                        controller: 'busEnqController as vm'
                    },
                    'toolbar@businessEnquires': {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html'
                    },
                    'content@businessEnquires'         : {
                        templateUrl: 'app/main/help/busEnquires/busEnquires.html',
                    },
                    'footer@businessEnquires': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }

                }
            })
            .state('customerCare', {
                url      : '/customerCare',
                views    : {
                    'main@': {
                        templateUrl: 'app/core/layouts/helpLayout.html',
                        controller: 'customerCareController as vm'
                    },
                    'toolbar@customerCare': {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html'
                    },
                    'content@customerCare'         : {
                        templateUrl: 'app/main/help/customerCare/customerCare.html'
                    },
                    'footer@customerCare': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }

                }
            }).state('contactUs', {
                url      : '/contactUs',
                views    : {
                    'main@': {
                        templateUrl: 'app/core/layouts/helpLayout.html',
                        controller: 'contactUsController as vm'
                    },
                    'toolbar@contactUs': {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html',
                        //controller: 'DashboardToolbarController as vm'
                    },
                    'content@contactUs'         : {
                        templateUrl: 'app/main/help/contactUs/contactUs.html'
                    },
                    'footer@contactUs': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }

                }
            }).state('feedback', {
                url      : '/feedback',
                views    : {
                    'main@': {
                        templateUrl: 'app/core/layouts/helpLayout.html',
                        controller: 'feedbackController as vm'
                    },
                    'toolbar@feedback': {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html'
                    },
                    'content@feedback'         : {
                        templateUrl: 'app/main/help/feedback/feedback.html'
                    },
                    'footer@feedback': {
                        templateUrl: 'app/footer/footer.html',
                        controller: 'FooterController as vm'
                    }

                }
            });

    }

})();