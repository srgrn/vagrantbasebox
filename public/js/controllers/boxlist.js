'use strict';

angular.module('vboxes')
  .controller('BoxlistCtrl', function ($scope,$location,$http) {
		$http.get('/api/boxes').success(function(data) {
			$scope.boxes = data;
			$scope.types = _.uniq(_.pluck(data,'provider'));
		});
		
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

		$scope.$on('$viewContentLoaded', function() {
			$('.selectpicker').selectpicker('refresh');
		});
		$location.path('/');

  });
