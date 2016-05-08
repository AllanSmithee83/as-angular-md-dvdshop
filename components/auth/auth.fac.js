(function() {
  
  "use strict";
  
  angular
    .module('dvdStore')
    .factory('auth', function($firebaseAuth) {
        
      var ref = new Firebase('https://simpledvdstore.firebaseio.com/');
    
      return {
        ref: $firebaseAuth(ref),
        user: ref.getAuth()
      }
      
    });
  
})();