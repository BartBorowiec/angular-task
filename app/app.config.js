'use strict';

angular.module('AngularTask')
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {
          template: '<list></list>'
        })
        .when('/login', {
          template: '<login></login>'
        })
        .otherwise('/');
    }
  ]);