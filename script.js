'use strict';

angular.module('AngularTask', ['ngRoute', 'ngResource'])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'list.html',
          controller: 'ListController',
        })
        .when('/login', {
          templateUrl: 'login.html',
          controller: 'LoginController',
        })
    }])
  .controller('LoginController', function ($scope, $http, $location) {
    $scope.handleSubmit = function(){
      
      $http.post('http://frontend-recruitment.one2tribe.pl:8080/api/authenticate', {username: $scope.username, password: $scope.password})
      .then(function(response) {
        if(response.headers().authorization) {          
          window.sessionStorage.setItem('token', response.headers().authorization);
        };
      })
      .then(function() {
        $location.path('/');
      });
    }
    
  })
  .controller('ListController', function ($scope, $location, $resource) {
    if (!window.sessionStorage.getItem('token')) {
      $location.path('/login');
    }

    var token = window.sessionStorage.getItem('token');
    var Items = $resource('http://frontend-recruitment.one2tribe.pl:8080/api/v1/item', {}, {
      query: {method:'GET', headers:{authorization: token}, isArray: true},
      save: {method:'POST', headers:{authorization: token}, data: {name:$scope.newItem}},
    });

    var updateList = function() {
      var items = Items.query();
      items.$promise.then(function() {
        $scope.items = items;
      });
    }
    
    updateList();

    $scope.handleSubmit = function(){
      var newItem = new Items();
      newItem.name = $scope.newItem;
      
      newItem.$save().then(function() {
        updateList();
      })
    }
    
  });
