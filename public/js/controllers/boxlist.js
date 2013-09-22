'use strict';

angular.module('vboxes')
  .controller('BoxlistCtrl', function ($scope,$location,$http) {
  $http.get('/api/boxes').success(function(data) {
		      $scope.boxes = data;
  });
  $location.path('/boxes')
  });
