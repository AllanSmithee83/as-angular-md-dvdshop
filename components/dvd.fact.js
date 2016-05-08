

angular.module("dvdStore")
	.factory("dvdFactory", ["$http", "$firebaseArray", function($http, $firebaseArray ){
		
		
		var ref = new Firebase('https://simpledvdstore.firebaseio.com/')
		
		/*function getDvds(){
			return $http.get('data/dvd.json');
		}*/
		
		return{
			ref : $firebaseArray(ref)
		}
		//return{
		//	getDvds : getDvds
		//}
		
	}]);