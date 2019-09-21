'use strict';

angular.
  module('items').
  factory('Items', ['$resource',
    function ($resource) {
      return $resource('http://frontend-recruitment.one2tribe.pl:8080/api/v1/item', {}, {
        query: {
          method: 'GET',
          isArray: true,
          interceptor: {
            request: function(request) {
              console.log(request);
              request.headers = {
                authorization: window.sessionStorage.getItem('token')
              }
              return request;
            }
          }
        },
        save: {
          method: 'POST',
          interceptor: {
            request: function(request) {
              request.headers = {
                authorization: window.sessionStorage.getItem('token')
              }
              return request;
            }
          }
        },
      });
    }
  ]);