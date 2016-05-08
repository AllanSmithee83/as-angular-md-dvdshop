angular.module("dvdStore")
		.controller("editDvdStoreCtrl", ["$scope","dvdFactory", "$state", "$timeout", "$mdSidenav","$mdToast", "$mdDialog", 
							function($scope, dvdFactory, $state, $timeout, $mdSidenav, $mdToast,$mdDialog  ){
								var vm = this;
								
								vm.closeSidebar = closeSidebar;
								vm.saveEdit= saveEdit;
								vm.dvds=dvdFactory.ref
								
								//vm.dvd=$state.params.dvd;
								
								//editing in firebase
								vm.dvd=vm.dvds.$getRecord($state.params.id);
								;
								
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
							
							function saveEdit(){
								//edit in db
								vm.dvds.$save(vm.dvd).then(function(){
									$scope.$emit('editSaved', 'edit Saved!');
									vm.sidenavOpen = false;
								})
								
								//	$scope.$emit('editSaved', 'edit Saved!');						
								//	vm.sidenavOpen = false;
							}
							
							
				
							
							
							
							
							
							}]);