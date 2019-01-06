angular.module('NavController', [])
.controller('NavCtrl', NavCtrl);

function NavCtrl(
    $rootScope,
    $scope,
    $state,
    $window

) {
    $scope.navOptions = [
        {
            name: "Home",
            display: "Home",
            sref: "wedsite.home"
        },
        {
            name: "Party",
            display: "BBQ",
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

    let state = $state.current.name;
    for (let option of $scope.navOptions) {
        if (option.sref == state) {
            $rootScope.currentNavItem = option.name;
        }
    }

    $rootScope.currentNavItem = $rootScope.currentNavItem || 'Party';

    $scope.goto = $rootScope.goto;
}

