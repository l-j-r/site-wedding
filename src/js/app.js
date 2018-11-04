// ------------------------------------------------ GENERAL IMPROTS
import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-material';
import 'angular-messages';

// ------------------------------------------------ CONTROLLER IMPORTS
import './controllers/WedsiteController.js'


var wedsite = angular.module('wedsite',[
    'ui.router',
    'ngMaterial', 
    'ngMessages',
    'WedsiteController'
]);

wedsite.directive('customButton', function () {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        template:   '<a href="" class="myawesomebutton" ng-transclude>' +
                        '<i class="icon-ok-sign"></i>' +
                    '</a>',
        link: function (scope, element, attrs) {
        }
    };
})
// ------------------------------------------------ STATE CONFIG 
wedsite.config(function($stateProvider) {
    // ------------------------------------------------ PAGE
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

    // ------------------------------------------------ VIEW
    .state('wedsite.home', {
        templateUrl: 'templates/home.html',
        url: '/home'
    });

  });



  // ------------------------------------------------ RUN
  angular.module('wedsite')
  .run([
        "$state",
        function ($state) {
            $state.go("wedsite.home");
        }
    ]);

console.log("Hello World!~");
