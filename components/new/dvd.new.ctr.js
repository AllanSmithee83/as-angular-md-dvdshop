angular.module("dvdStore")
		.controller("newDvdStoreCtrl", ["$scope","dvdFactory", "$state", "$timeout", "$mdSidenav","$mdToast", "$mdDialog", 
							function($scope, dvdFactory, $state, $timeout, $mdSidenav, $mdToast,$mdDialog  ){
								var vm = this;
								vm.closeSidebar = closeSidebar;
								vm.saveMovie = saveMovie;
								
								//event loop
								$timeout(function(){
									$mdSidenav('left').open();
								});
									
							$scope.$watch('vm.sidenavOpen', function(sidenav){
								if(sidenav==false){
									$mdSidenav('left').close().then (function(){
										$state.go('dvd');
									});
								}
								
							});
							function closeSidebar(){
							vm.sidenavOpen =false;
							}
							
							function saveMovie(dvd){
								if(dvd){
									//emiting to parent controller
									$scope.$emit('newDvd', dvd);
									vm.sidenavOpen = false;
							}}
							
							}]);