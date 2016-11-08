angular.module('bukukontak', []).controller('AppController', function($scope, $http){

	var refresh 		= function(){
		$http.get('/contacts').success(function(res){
			$scope.contacts	= res;
		});
	}
	
	refresh();
	
	$scope.addContact 	= function(){
		$http.post('/contacts', $scope.contact).success(function(res){
			refresh();
			$scope.clear();
		});
	};

	$scope.delContact	= function(id){
		$http.delete('/contacts/'+id).success(function(res){
			refresh();
		});
	};

	$scope.editContact	= function(id){
		$http.get('/contacts/'+id).success(function(res){
			$scope.contact 	= res;
		});
	};

	$scope.updateContact= function(){
		$http.put('/contacts/'+$scope.contact._id, $scope.contact).success(function(res){
			refresh();
			$scope.contact = "";
		});
	};

	$scope.clear		= function(){
		$scope.contact 	= "";
	};
});