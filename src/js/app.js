import angular from 'angular';
import '@uirouter/angularjs';

var myApp = angular.module('myApp',[
    'ui.router'
]);
myApp.controller('UsrCtrl', ['$scope', function ($scope) {
    $scope.users = [
        {
            "name": "steve",
            "route": "a",
            "value": "100"
        },
        {
            "name": "john",
            "route": "a",
            "value": "1000"
        },
        {
            "name": "fransisco",
            "route": "b",
            "value": "10"
        },
        {
            "name": "lavon",
            "route": "c",
            "value": "1"
        }
    ];
}]);

myApp.directive('customButton', function () {
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

myApp.config(function($stateProvider) {
    var helloState = {
      name: 'hello',
      url: '/hello',
      template: '<h3>hello world!</h3>'
    }
  
    var aboutState = {
      name: 'about',
      url: '/about',
      template: '<h3>Its the UI-Router hello world app!</h3>'
    }
  
    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
  });

console.log("Hello World!~");
/*

*/