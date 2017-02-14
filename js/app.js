// start angular Spa App
var app = angular.module('spaApp', ["ngRoute"]);


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
        .otherwise({
            redirectTo: "/"
        });
    $locationProvider.html5Mode(true);
});

// User Details controller
app.controller("spaUserDetailsCtrl", function($scope, $http, $routeParams) {
    // getting data from JSON file
    $http({method:'GET',url:'database/AgendaDataSource.json'}).then(function(response){
        $scope.users = response.data;
    });
    $scope.title = "User Details";
    $scope.pageId = $routeParams.id;
});

// Save user controller
app.controller("spaNewUserCtrl", function($scope, $location) {
    $scope.title = "Register User";
    $scope.saveUser = function(user) {
        var user = {
            "id": new Date(),
            "name": user.Name,
            "surname": user.Surname,
            "age": user.Age,
            "born": user.Born,
            "phone": {"home":user.PhoneHome,"work":user.PhoneWork},
            "address":{"home":user.AddressHome,"work":user.AddressWork},
            "note":user.Note
        };
        var users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        $location.path('/');
        $scope.$apply();
    };
});


// Controller loads data from JSON file
app.controller("spaJSONCtrl", function($scope, $http) {
    // getting data from JSON file
    $http({method:'GET',url:'database/AgendaDataSource.json'}).then(function(response){
        $scope.users = response.data;
    });
    // sort by column
    $scope.sortColumn = "name";
    $scope.reverseSort = false;
    $scope.sortData = function(column){
        $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
    };
    // adding or removing arrows class
    $scope.getSortClass = function(column) {
        if($scope.sortColumn == column) {
            return $scope.reverseSort ? 'arrow-down' : 'arrow-up'
        };
        return '';
    };
});


// Controller loads data from localStorage
app.controller("spaStorageCtrl", function($scope, $routeParams) {
    // getting data from localStorage
    $scope.users = JSON.parse(localStorage.getItem('users'));
    $scope.pageId = $routeParams.id;
});
// User Details controller LocalStorage
app.controller("spaUsersDetailsCtrl", function($scope, $http, $routeParams) {
    // getting data from JSON file
    $scope.users = JSON.parse(localStorage.getItem('users'));
    $scope.title = "User Details";
    $scope.pageId = $routeParams.id;
});