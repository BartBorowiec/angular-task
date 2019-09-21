'use strict';

angular.
  module('login').
  component('login', {
    templateUrl: 'login/login.template.html',
    controller: ['$http', '$location',
      function LoginController($http, $location) {
        this.handleSubmit = function () {

          $http.post('http://frontend-recruitment.one2tribe.pl:8080/api/authenticate', { username: this.username, password: this.password })
            .then(function (response) {
              if (response.headers().authorization) {
                window.sessionStorage.setItem('token', response.headers().authorization);                  
                return window.sessionStorage.getItem('token');
              }
            })
            .then(function (token) {
              if(token) {
                $location.path('/');
              }
            })
            .catch(function(error) {
              console.log(error);
            })
        }
      }
    ]
  });
