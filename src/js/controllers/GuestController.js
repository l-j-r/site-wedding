import _default from "angular-ui-router";

angular.module('GuestController', [])
    .controller('GstCtrl', GstCtrl);

const guestURL = "https://readysetroberts.com/guest-list/";

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
                name: "associatedGuest",
                prompt: "WILL " + $scope.user.associatedGuest.toUpperCase() + " BE ATTENDING?",
                type: "y/n"
            },
            {
                name: "associatedGuestMeat",
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
            {
                name: "freeform",
                prompt:"ANYTHING ELSE ON YOUR MIND?",
                type:"text"
            }
        ]



        if (!$scope.user.questions) {
            $scope.user.questions = {
                attending: { response: null },
                meat: { response: null },
                freeform: { response: null },
            };
        }

        if ($scope.user.kidCount && $scope.user.kidCount > 0) {
            $scope.user.questions.kidCount = { response: 0 };
        }

        if ($scope.user.plusOne) {
            $scope.user.questions.plusOne = { response: null };
            $scope.user.questions.plusOneMeat = { response: null };
        }

        if ($scope.user.associatedGuest) {
            console.log("Assoc Guest!" + $scope.user.associatedGuest);
            $scope.user.questions.associatedGuest = { response: null };
            $scope.user.questions.associatedGuestMeat = { response: null };
        }


        $scope.showQuestion = (question) => {
            if (!$scope.user.questions[question.name]) {
                return false;
            } else if(question.name == 'attending') {
                return true;
            } else if($scope.user.questions.attending.response == 'yes'){
                if (question.name == 'freeform') {
                    question.prompt = "ANYTHING ELSE ON YOUR MIND?";
                    question.hint = "LET US KNOW!"
                }
                return true;
            } else if ($scope.user.questions.attending.response == 'no' && question.name == 'freeform') {
                question.prompt = "NO WORRIES, THANKS FOR THE HEADS UP!";
                question.hint = "YOU THINK YOU'RE BETTER THAN ME?"
                return true;
            }
            return false;
        } 



    }


    // GET ALL USERS -----------------------------------------  
    function UpdateGuests() {

        return $http({
            method: "GET",
            url: guestURL
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
                $scope.user.associatedGuest = $scope.user.associatedGuest || "";
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
            method: "POST",
            url: guestURL,
            data:
            {
                questions: $scope.user.questions,
                id: $scope.user.id,
                associatedGuestId : $scope.user.associatedGuestId || null
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






