// start angular Spa App
var app = angular.module('spaApp', ["ngRoute"]);

// factory of getting data from json file
app.factory("jsonFactory", function($http) {
  function getData() {
    return $http({method:'GET',url:'database/AgendaDataSource.json'});
  }
  function getDataAll(users) {
    var users = $http({method:'GET',url:'database/AgendaDataSource.json'}).then(function(response){
        return response.data;
    })
    return users;
  }
  function updateUser(user) {
    getData().then(function(response){
        var users = response.data;
        users.splice(user, 1);
        users.push(user);
    });
  }
  return {
    getData: getData,
    updateUser : updateUser,
    getDataAll : getDataAll
  }
});

// Edit user controller
app.controller("editUserCtrlScope", function($scope, $rootScope, $location, $routeParams, jsonFactory) {
    $scope.title = "Edit User";
    $scope.pageId = $routeParams.id;
    $scope.editing = true;
    jsonFactory.getData().then(function(response){
      var users = response.data;
      for(user in users) {
        if(users[user].id == $routeParams.id) {
          $scope.user = users[user];
        }
      }
      $scope.editUser = function(user) {
        jsonFactory.updateUser(user);
        $rootScope.$broadcast('updatedUsers', users);
        $location.path('/');
      }
    });
});

// User Details controller
app.controller("spaUserDetailsCtrl", function($scope, $routeParams, jsonFactory) {
    // getting data from JSON file
    // jsonFactory.getData().then(function(response){
    //     $scope.users = response.data;
    // });
    var users = jsonFactory.getDataAll(users).then;

    for(user in users) {
      console.log(users[user])
    }
    $scope.title = "User Details";
    $scope.pageId = $routeParams.id;
});

// Controller loads data from JSON file
app.controller("spaJSONCtrl", function($scope, jsonFactory) {
    // getting data from JSON file
    jsonFactory.getData().then(function(response){
      var users = response.data;
      $scope.delete = function(id) {
        for(user in users) {
          if(users[user].id == id) {
            users.splice(user, 1);
          }
        }
      }
      $scope.users = users;
      $scope.$on('updatedUsers', function(event, data) {
        $scope.users = data;
      });
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

// geting data from localstorage service
app.service('usersChanges', function() {
  var users = angular.fromJson(localStorage.getItem('users')) || [];
  var getUsers = function() {
    return users;
  };
  var addUser = function(user) {
    users.push(user);
    localStorage.setItem('users', angular.toJson(users));
  };
  var removeUser = function(id) {
    for(user in users) {
      if(users[user].id == id) {
        users.splice(user, 1);
        localStorage.setItem('users', angular.toJson(users));
      }
    }
  };
  return {
    addUser  : addUser,
    getUsers : getUsers,
    removeUser : removeUser
  };
});

// Save user controller
app.controller("spaNewUserCtrl", function($scope, $location, usersChanges) {
    $scope.title = "Register User";
    $scope.saveUser = function(user) {
      var user = {
          "id": (new Date()).getTime(),
          "name": user.name,
          "surname": user.surname,
          "age": user.age,
          "born": user.born,
          "phone": {"home":user.phone.home,"work":user.phone.work},
          "address":{"home":user.address.home,"work":user.address.work},
          "note":user.note,
          "created": new Date()
      };
      usersChanges.addUser(user);
      $location.path('/');
    };
});

// Edit user controller
app.controller("editUserCtrl", function($scope, $location, $routeParams) {
    $scope.title = "Edit User";
    $scope.pageId = $routeParams.id;
    $scope.editing = true;
    //jsonFactory.getData().then(function(response){
    var users = angular.fromJson(localStorage.getItem('users')) || [];
      for(user in users) {
        if(users[user].id == $routeParams.id) {
          $scope.user = users[user];
        }
      }
    $scope.editUser = function(user) {
      users.splice(user, 1);
      users.push(user);
      localStorage.setItem('users', angular.toJson(users));
      $location.path('/');
    }
    //});
});

// Controller loads data from localStorage
app.controller("spaStorageCtrl", function($scope, usersChanges) {
    // getting data from localStorage
    var users = usersChanges.getUsers();
    $scope.users = users;
    $scope.delete = function(id) { usersChanges.removeUser(id) };

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

// User Details controller LocalStorage
app.controller("spaUsersDetailsCtrl", function($scope, $http, $routeParams) {
    // getting data from JSON file
    $scope.users = angular.fromJson(localStorage.getItem('users'));
    $scope.title = "User Details";
    $scope.pageId = $routeParams.id;
});
