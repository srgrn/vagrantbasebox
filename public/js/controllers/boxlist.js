'use strict';

angular.module('vboxes')
  .controller('BoxlistCtrl', function ($scope,$location,$http) {
		$http.get('/api/boxes').success(function(data) {
			$scope.boxes = data;
		});
		$scope.voteup = function (boxname){
			$http.post('api/voteup',{ "name": boxname }).success(function(result){
				console.log(result);
			});
		};
		$scope.votedown = function (boxname){
			$http.post('api/votedown',{ "name": boxname }).success(function(result){
				console.log(result);
			});
		};
		$location.path('/boxes');

  });
