// Routing Configuration
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html"
        })
        .when("/detail/:id", {
            templateUrl : "views/userDetail.html",
            controller : "spaUserDetailsCtrl"
        })
        .when("/details/:id", {
            templateUrl : "views/userDetail.html",
            controller : "spaUsersDetailsCtrl"
        })
        .when("/addnew", {
            templateUrl : "views/registerUser.html",
            controller : "spaNewUserCtrl"
        })
        .when("/edit/:id", {
            templateUrl : "views/registerUser.html",
            controller : "editUserCtrl"
        })
        .when("/edits/:id", {
            templateUrl : "views/registerUser.html",
            controller : "editUserCtrlScope"
        })
        .otherwise({
            redirectTo: "/"
        });
    $locationProvider.html5Mode(true);
});
