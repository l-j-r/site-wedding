angular.module('NavController', [])
.controller('NavCtrl', NavCtrl);

function NavCtrl(
    $scope,
    $state
) {
    $scope.navOptions = [
        {
            name: "Home",
            display: "Home",
            sref: "wedsite.home"
        },
        {
            name: "Party",
            display: "Party",
            sref: "wedsite.party"
        },
        {
            name: "Registry",
            display: "Registry",
            sref: "wedsite.registry"
        },
        {
            name: "RSVP",
            display: "RSVP",
            sref: "wedsite.rsvp"
        },
        {
            name: "Photos",
            display: "Photos",
            sref: "wedsite.photos"
        }
        
        
    ];

    $scope.currentNavItem = 'Home'; 

    $scope.goto = function(to) {
        $state.go(to);
    }
}

