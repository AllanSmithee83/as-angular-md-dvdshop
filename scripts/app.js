angular.module("dvdStore", ["ngMaterial", "ui.router", "firebase"])

.config(function($stateProvider, $urlRouterProvider){
	
	$stateProvider
	
	
		.state('dvd', {
			url:'/dvd',
			templateUrl: 'components/dvd/dvd.tpl.html',
			controller: 'dvdStoreCtrl as vm',			
		})
		.state('dvd.new', {
			url:'/new',
			templateUrl: 'components/new/dvd.new.tpl.html',
			controller: 'newDvdStoreCtrl as vm',			
		})
		.state('dvd.edit', {
			url:'/edit/:id',
			templateUrl: 'components/edit/dvd.edit.tpl.html',
			controller: 'editDvdStoreCtrl as vm',
			params:{dvd:null}
		});
	
	 $urlRouterProvider.otherwise('/dvd');
});