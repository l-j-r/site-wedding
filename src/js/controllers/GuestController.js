angular.module('GuestController', [])
.controller('GstCtrl', GstCtrl);

const guestURL = "https://9afd53ec.ngrok.io/guest-list";

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
                name:"associatedGuest",
                prompt: "WILL " + $scope.user.associatedGuest.toUpperCase() + " BE ATTENDING?",
                type: "y/n"
            },
            {
                name:"associatedGuestMeat",
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
                name: "kidCount",
                prompt: "HOW MANY OF YOUR SPAWNS WILL ATTEND?",
                type: "count"
            },
        ]

        

        if(!$scope.user.questions) {
            $scope.user.questions = {
                attending: { response: null},
                meat: { response: null},
                note: { response: null},
            };
        }

        if ($scope.user.kidCount && $scope.user.kidCount > 0) {
            $scope.user.questions.kidCount = { response: null};
        }

        if ($scope.user.plusOne) {
            $scope.user.questions.plusOne = { response: null};
            $scope.user.questions.plusOneMeat = { response: null};
        }

        if ($scope.user.associatedGuest) {
            $scope.user.questions.associatedGuest = { response: null};
            $scope.user.questions.associatedGuestMeat = { response: null};
        }



        

    }


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
            if (guest.guestInfo.firstName.toLowerCase() === $scope.user.firstName.toLowerCase() && guest.guestInfo.lastName.toLowerCase() === $scope.user.lastName.toLowerCase()) {

                $scope.isGuest = true;
                $scope.user = guest.guestInfo;
                
                updateQuestions();
                
                return;
            } 
        }

        // if we've reached this code, the user has not been found.
        $scope.hasFailed = true;
    }

    // SUBMIT TO SERVER ---------------------------------- 
    $scope.submit = function () {
        console.log(JSON.stringify($scope.response));
        console.log(JSON.stringify($scope.user));
        
        // console.log(JSON.stringify($scope.response));
        $http({
            method : "POST",
            url : guestURL,
            data: 
            {
                questions: $scope.user.questions,
                id: $scope.user.id
            },
            withCredentials: true,
            headers: {
                        'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function mySuccess(response) {
            
            if (response && response.data) {
                $scope.guests = response.data.guests;
            }
            // $scope.complete = true;
            
            
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






