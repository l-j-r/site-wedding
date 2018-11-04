// GENERAL IMPORTS --------------------------------  
    import angular from 'angular';
    import '@uirouter/angularjs';
    import 'angular-material';
    import 'angular-messages';
// ------------------------------------------------ 


// CONTROLLER IMPORTS  ----------------------------
    import './controllers/WedsiteController.js'
    import './controllers/NavController.js'
// ------------------------------------------------ 

// SERVICE IMPORTS  -------------------------------

// ------------------------------------------------ 


// MODULE DECLARATION -----------------------------
    var wedsite = angular.module('wedsite',[
        'ui.router',
        'ngMaterial', 
        'ngMessages',
        'WedsiteController',
        'NavController'
    ]);
// ------------------------------------------------ 


// STATE CONFIG ------------------------------------- 
    wedsite.config(function($stateProvider) {

        // HIGH LEVEL PAGE --------------------------
        $stateProvider.state('wedsite', {
            views: {
                'header': {
                    templateUrl: 'templates/header.html',
                    controller: 'NavCtrl as vm'
                },
                'content': {
                    template:'<div ui-view></div>'
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
            url: '/Home'
        })
        .state('wedsite.party', {
            templateUrl: 'templates/party.html',
            url: '/Party'
        })
        .state('wedsite.registry', {
            templateUrl: 'templates/registry.html',
            url: '/Registry'
        })
        .state('wedsite.rsvp', {
            templateUrl: 'templates/RSVP.html',
            url: '/RSVP'
        })
        .state('wedsite.photos', {
            templateUrl: 'templates/photos.html',
            url: '/Photos'
        });
    });
// ------------------------------------------------ 


// RUNTIME CONFIG ---------------------------------
  angular.module('wedsite')
  .run([
        "$state",
        function ($state) {
            if (!$state.current.name) {
                $state.go("wedsite.home");
            }
        }
    ]);
// ------------------------------------------------ 

// DEBUG ------------------------------------------
    console.log("Hello World!~");
