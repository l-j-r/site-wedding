var angular = require('angular');
var myApp = angular.module('myApp',[]);
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

console.log("Hello World!~");
/*

*/