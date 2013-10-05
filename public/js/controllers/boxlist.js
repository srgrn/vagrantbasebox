'use strict';

angular.module('vboxes')
  .controller('BoxlistCtrl', function ($scope,$location,$http) {
		$http.get('/api/boxes').success(function(data) {
			$scope.boxes = data;
		});
		$scope.toggle = function() {
			$scope.isVisible = ! $scope.isVisible;
		};
		$scope.isVisible = false; // this is for the show hide directive

		$scope.voteup = function (index){
			$scope.boxes[index].score++;
			$http.post('api/voteup',{ "name": $scope.boxes[index].name }).success(function(result){
				console.log(result);
			});
		};
		$scope.votedown = function (index){
			$scope.boxes[index].score--;
			$http.post('api/votedown',{ "name": $scope.boxes[index].name }).success(function(result){
				console.log(result);
			});
		};
		$scope.add = function (box){
			console.log("Entered here");
			console.log("here be box");
		};
		$location.path('/');

  });
