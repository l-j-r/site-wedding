// GENERAL IMPORTS --------------------------------  
import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-material';
import 'angular-messages';
// ------------------------------------------------ 


// CONTROLLER IMPORTS  ----------------------------
import './controllers/WedsiteController.js'
import './controllers/NavController.js'
import './controllers/GuestController.js'
// ------------------------------------------------ 

// SERVICE IMPORTS  -------------------------------

// ------------------------------------------------ 


// MODULE DECLARATION -----------------------------
var wedsite = angular.module('wedsite', [
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'WedsiteController',
    'NavController',
    'GuestController'
]);
// ------------------------------------------------ 

// THEME CONFIG -----------------------------------
wedsite.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('amber')
        .accentPalette('indigo');
});
// ------------------------------------------------


// STATE CONFIG ------------------------------------- 
wedsite.config(function ($stateProvider) {

    // HIGH LEVEL PAGE --------------------------
    $stateProvider.state('wedsite', {
        views: {
            'header': {
                templateUrl: 'templates/header.html',
                controller: 'NavCtrl as vm'
            },
            'content': {
                template: '<div ui-view></div>'

            },
            'footer': {
                templateUrl: 'templates/footer.html',
                controller: 'WedCtrl as vm'
            }
        }
    })

        // CONTENT --------------------------------
        .state('wedsite.home', {
            templateUrl: 'templates/home.html',
            controller: 'WedCtrl as vm',
            url: '/Home'
        })
        .state('wedsite.party', {
            templateUrl: 'templates/party.html',
            controller: 'WedCtrl as vm',
            url: '/Party'
        })
        .state('wedsite.registry', {
            templateUrl: 'templates/registry.html',
            url: '/Registry'
        })
        .state('wedsite.rsvp', {
            templateUrl: 'templates/RSVP.html',
            url: '/RSVP?fn&ln',
            controller: 'GstCtrl as vm',
            params: {
                fn: null,
                ln: null
            }
        })

        .state('wedsite.photos', {
            templateUrl: 'templates/photos.html',
            url: '/Photos'
        });
});


wedsite.config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/Home');
})
// ------------------------------------------------ 



// RUNTIME CONFIG ---------------------------------

angular.module('wedsite')
    .run([
        "$rootScope",
        "$state",
        "$window",
        function ($rootScope, $state, $window) {
            $rootScope.goto = function (to, name) {
                $window.scrollTo(0, 0);
                $state.go(to);
                if (name) {
                    $rootScope.currentNavItem = name;
                }
                
            }

            $rootScope.log = console.log;
        }
    ]);

angular.module('wedsite')
    .run([
        "$http",
        function ($http) {

        }
    ]);
// ------------------------------------------------ 

// DEBUG ------------------------------------------



