// GENERAL IMPORTS --------------------------------  
    import angular from 'angular';
    import '@uirouter/angularjs';
    import 'angular-material';
    import 'angular-messages';
// ------------------------------------------------ 


// CONTROLLER IMPORTS  ----------------------------
    import './controllers/WedsiteController.js'
// ------------------------------------------------ 


// MODULE DECLARATION -----------------------------
    var wedsite = angular.module('wedsite',[
        'ui.router',
        'ngMaterial', 
        'ngMessages',
        'WedsiteController'
    ]);
// ------------------------------------------------ 


// STATE CONFIG ------------------------------------- 
    wedsite.config(function($stateProvider) {
        
        // HIGH LEVEL PAGE --------------------------
        $stateProvider.state('wedsite', {
            views: {
                'header': {
                    templateUrl: 'templates/header.html',
                    controller: 'WedCtrl as vm'
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
            url: '/home'
        });
    });
// ------------------------------------------------ 


// RUNTIME CONFIG ---------------------------------
  angular.module('wedsite')
  .run([
        "$state",
        function ($state) {
            $state.go("wedsite.home");
        }
    ]);
// ------------------------------------------------ 

// DEBUG ------------------------------------------
    console.log("Hello World!~");
