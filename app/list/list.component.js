'use strict';

angular.
  module('list').
  component('list', {
    templateUrl: 'list/list.template.html',
    controller: ['Items', '$location',
      function ListController(Items, $location) {
        var self = this;

        if (!window.sessionStorage.getItem('token')) {
          $location.path('/login');
        } else {
          self.items = Items.query();

          self.handleSubmit = function () {
            var newItem = new Items();
            newItem.name = self.newItem;
            self.newItem = '';

            newItem.$save()
              .then(function () {
                console.log(newItem);
                self.items = Items.query();
              })
              .catch(function (error) {
                console.log(error);
              })
          }
        }
      }
    ],
    bindings: {
      newItem: '<'
    }
  })