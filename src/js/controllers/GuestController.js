angular.module('GuestController', [])
.controller('GstCtrl', GstCtrl);

const guestURL = "http://26b3cd1d.ngrok.io/guest-list/";

function GstCtrl(
    $scope,
    $stateParams,
    $http
) {

    // VAR INIT ---------------------------------
    $scope.user = {};
    $scope.response = {};
    $scope.guests = [];

    $scope.hasFailed = false;
    $scope.isGuest = false;
    $scope.complete = false;
    // $scope.isGuest = true;

    // QUESTIONS ---------------------------------

    function updateQuestions() {
        $scope.questions = [
            {
                name: "attending",
                prompt: "WILL YOU BE ATTENDING?",
                type: "y/n"
            },
            {
                name: "meat",
                prompt: "DO YOU EAT MEAT?",
                type: "y/n"
            },
            {
                name:"soAttending",
                prompt: "WILL " + $scope.user.associatedGuest.toUpperCase() + " BE ATTENDING?",
                type: "y/n"
            },
            {
                name:"soMeat",
                prompt: "DOES " + $scope.user.associatedGuest.toUpperCase() + " EAT MEAT?",
                type: "y/n"
            },
            {
                name: "plusOne",
                prompt: "WILL YOU BE BRINGING A PLUS ONE?",
                type: "y/n"
            },
            {
                name: "plusOneMeat",
                prompt: "DOES YOUR PLUS ONE (THEORETICAL OR OTHERWISE) EAT MEAT?",
                type: "y/n"
            },
            {
                name: "kids",
                prompt: "HOW MANY OF YOUR SPAWNS WILL ATTEND?",
                type: "count"
            },

            
        ]
    }

    // Can we populate the so on the page.


    // GET ALL USERS -----------------------------------------  
    function UpdateGuests() {
        
        return $http({
            method : "GET",
            url : guestURL
        }).then(function mySuccess(response) {
            
            if (response && response.data) {
                $scope.guests = response.data.guests;
            }
            
        }, function Error(response) {
            console.error(response);
        });
        
    }

    // CHECK FOR SPECIFIC USER ---------------------------------- 
    $scope.findUser = function () {
        for (let guest of $scope.guests) {
            // if both the first and last name match, let's call them the user.
            if (guest.firstName.toLowerCase() === $scope.user.firstName.toLowerCase() && guest.lastName.toLowerCase() === $scope.user.lastName.toLowerCase()) {

                $scope.isGuest = true;
                $scope.user = guest;
                
                updateQuestions();
                
                return;
            } 
        }

        // if we've reached this code, the user has not been found.
        $scope.hasFailed = true;
    }

    // SUBMIT TO SERVER ---------------------------------- 
    $scope.submit = function () {
        // console.log(JSON.stringify($scope.response));
        $http({
            method : "POST",
            url : guestURL,
            data: 
            {
                response: $scope.response,
                id: $scope.user.id
            }
        }).then(function mySuccess(response) {
            
            if (response && response.data) {
                $scope.guests = response.data.guests;
            }
            $scope.complete = true;
            
            
        }, function Error(response) {
            console.error(response);
        });
        // $scope.complete = true;
    }


    // INIT -----------------------------------------  
    if ($stateParams.fn && $stateParams.ln) {
        $scope.isLoading = true;
    }
    
    UpdateGuests()
    .then(() => {

        // ROUTE CHECK ------------------------------
        if ($stateParams.fn && $stateParams.ln) {
            $scope.user.firstName = $stateParams.fn;
            $scope.user.lastName = $stateParams.ln;
            $scope.findUser();
            $scope.isLoading = false;
        }

    });


    
    
}






