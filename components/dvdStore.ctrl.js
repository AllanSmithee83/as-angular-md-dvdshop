
angular.module("dvdStore")
		.controller("dvdStoreCtrl", ["$scope", "$state", "$http", "dvdFactory","$mdSidenav","$mdToast", "$mdDialog", 
							function($scope, $state, $http, dvdFactory, $mdSidenav, $mdToast,$mdDialog  ){
		
		//refactoring 'controllerAs' vm ; we change all $scope to var vm

		var vm =this;
		
		vm.openSidebar = openSidebar;
		vm.closeSidebar = closeSidebar;
		vm.saveMovie = saveMovie;
		vm.editMovie = editMovie;
		vm.saveEdit = saveEdit;
		vm.deleteMovie = deleteMovie;
		
		vm.dvds;
		vm.editing;
		vm.dvd;
		vm.dvds=dvdFactory.ref;
		
		/*Before firebase
		dvdFactory.getDvds().then(function(dvd){
				vm.dvds= dvd.data;		
			});
		*/	
				//sending data between controllers
				//retrive form child controller
		$scope.$on('editSaved', function(event, message){
			showToast(message);
			});
			
		$scope.$on('newDvd', function(event, dvd){
			//ading in firebase
			vm.dvds.$add(dvd);
			//dvd.id = vm.dvds.lenght + 1;
			//vm.dvds.push(dvd);
			showToast('Movie Saved!');
			});	
			
		function openSidebar(){
				$state.go('dvd.new');
			 //$mdSidenav('left').open()			
        };
		
		function closeSidebar(){
			 $mdSidenav('left').close()		
        };
	
		function saveMovie(dvd){
		
			if(dvd){
			vm.dvds.push(dvd);
			//clear information after save movie
			vm.dvd={};
			closeSidebar();
			showToast ("Movie Saved!");
			}
        };		
		
		function editMovie(dvd){
			$state.go('dvd.edit', {
				id:dvd.$id
				//Before firebase
				//id:dvd.id,
				//dvd:dvd
				});
			//inform the view wether or not we are editing Movie
			//we need condicional hide and show certian element 
			/*vm.editing = true;
			openSidebar();
			vm.dvd=dvd;
			*/
			
        }
		
		function saveEdit(){
			vm.editing = false;
			vm.dvd={};
			closeSidebar();
			showToast ("Edit Saved!");
		};

		function deleteMovie(event, dvd){
			  var confirm = $mdDialog.confirm()
          .title('Would you like to delete ' + dvd.title + '?')
          .ok('Please do it!')
          .cancel('Sounds like a scam')
		  .targetEvent(event);
		   $mdDialog.show(confirm).then(function() {
					var index = vm.dvds.indexOf(dvd);
					//vm.dvds.splice(index, 1);
					vm.dvds.$remove(dvd);
					showToast ("Movie Deleted!");
		   },  function() {
         });
   				
		};		
		
		function showToast(message){
			$mdToast.show(
			$mdToast.simple()
					.content(message)
					.position ('top, right')
					.hideDelay(4000)
					);
		}
		//sending data to firebase
	/*
var data = 		[
			{
				"id":"1",
				"title" : "Cook the Thief her Wife and her Lover",
				"price" : "1200",
				"description": "The wife of an abusive criminal finds solace in the arms of a kind regular guest in her husbands restaurant.",
				"ganre": "Drama",
				"year": "1970",
				"image": "cook.png"
			},
			{
				"id":"2",
				"title" : "Switchblade Sisters",
				"price" : "1500",
				"description": "The 'Dagger Debs' are a gang of snarling girls, and Maggie is their newest member. Lace, the ever tooth-gritting leader, befriends her but soon has doubts --it seems Lace's man, Dominic, ..",
				"ganre": "Action",
					"year": "1970",
				"image": "switch.png"
			},
			{
				"id":"3",
				"title" : "Run Lola Run",
				"price" : "1500",
				"description": "After a botched money delivery, Lola has 20 minutes to come up with 100,000 Deutschmarks.",
				"ganre": "Action",
					"year": "1970",
				"image": "run.png"
			},
			{
				"id":"3",
				"title" : "Detroit 900",
				"price" : "1500 ",
				"description": "After a fundraiser for a black politician is robbed, Detroit police put two detectives, one white and one black, on the case, who try to work together under boiling political pressure.",
				"ganre": "Thriller",
					"year": "1970",
				"image": "detroit.png"
			},
			{
				"id":"4",
				"title" : "Rounders",
				"price" : "999",
				"description": " A young man is a reformed gambler who must return to playing big stakes poker to help a friend pay off loan sharks.",
				"ganre": "Thriller",
					"year": "1970",
				"image": "rounders.png"
			}
			
						
			]			
			
							
			var firebase = dvdFactory.ref;				
				angular.forEach(data, function(item){
					firebase.$add(item);
				});			
	
	*/
		
		
		//before routing
		/*	
			dvdFactory.getDvds().then(function(dvd){
				$scope.dvds= dvd.data;
		
			});
			
		
			
			
		$scope.openSidebar=function(){
			 $mdSidenav('left').open()
			
        };
		
		$scope.closeSidebar=function(){
			 $mdSidenav('left').close()
			
        };
	
		$scope.saveMovie=function(dvd){
		
			if(dvd){
			$scope.dvds.push(dvd);
			//clear information after save movie
			$scope.dvd={};
			$scope.closeSidebar();
			
			showToast ("Movie Saved!");
			}
        };
		
		
		$scope.editMovie=function(dvd){
			//inform the view wether or not we are editing Movie
			//we need condicional hide and show certian element 
			$scope.editing = true;
			$scope.openSidebar();
			$scope.dvd=dvd;
			
        };
		
		$scope.saveEdit = function(){
			$scope.editing = false;
			$scope.dvd={};
			$scope.closeSidebar();
			showToast ("Edit Saved!");
		};

		$scope.deleteMovie = function(event, dvd){
			  var confirm = $mdDialog.confirm()
          .title('Would you like to delete ' + dvd.title + '?')
          .ok('Please do it!')
          .cancel('Sounds like a scam')
		  .targetEvent(event);
		   $mdDialog.show(confirm).then(function() {
					var index = $scope.dvds.indexOf(dvd);
					$scope.dvds.splice(index, 1);
		   },  function() {
         });
   				
		};
		
		
		function showToast(message){
			$mdToast.show(
			$mdToast.simple()
					.content(message)
					.position ('top, right')
					.hideDelay(4000)
					);
		}
		
		$scope.filterOptions= {
			 ganres: [
			 {name: "show all"},
			 {name: "Drama"},
			 {name: "Thriller"},
			 {name: "Action"}
			 
			 ]
			
			
		};
		$scope.filterItem = {
			ganre: $scope.filterOptions.ganres[0]
		}
	
			*/
		
		}]);