angular.module('WedsiteController', [])
.controller('WedCtrl', WedCtrl);

function WedCtrl(
    $scope
) {
    $scope.currentNacItem = 'page1';
    $scope.goto = function(page) {
        console.log("Goto " + page);
      }
}
