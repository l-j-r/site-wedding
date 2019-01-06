angular.module('WedsiteController', [])
.controller('WedCtrl', WedCtrl);

function WedCtrl(
    $rootScope,
    $scope
) { 
    $scope.goto = $rootScope.goto;
    $scope.log = $rootScope.log;
}
