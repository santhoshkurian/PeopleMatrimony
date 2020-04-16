(function () {
    'use strict';

    angular
        .module('matrimony')
        .factory('storageService', [function () {

            return {
                get: function (key) {
                    return localStorage.getItem(key);
                },
                set: function (key, data) {
                    localStorage.setItem(key, data);
                },
                clear: function () {
                    localStorage.clear();
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
})();
