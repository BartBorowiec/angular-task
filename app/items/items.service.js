'use strict';

angular.
  module('items').
  factory('Items', ['$resource',
    function ($resource) {
      var token = window.sessionStorage.getItem('token');
      return $resource('http://frontend-recruitment.one2tribe.pl:8080/api/v1/item', {}, {
        query: {
          method: 'GET',
          headers: {
            authorization: token
          },
          isArray: true
        },
        save: {
          method: 'POST',
          headers: {
            authorization: token
          },
        },
      });
    }
  ]);