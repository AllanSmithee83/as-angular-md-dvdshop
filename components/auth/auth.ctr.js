(function() {
  
  "use strict";
  
  angular
    .module('dvdStore')
    .controller('authController', function(auth, $state) {
        
      var vm = this;
      
      vm.createUser = createUser;
      vm.login = login;
      
      function createUser() {
        
        // If there is already a user logged in,
        // log them out before proceeding
        auth.ref.$unauth();
        
        auth.ref.$createUser({
          email: vm.email,
          password: vm.password
        }).then(function(userData) {
          login()
        }).catch(function(error) {
          vm.error = error;
        });
      }
      
      function login() {
        
        auth.ref.$authWithPassword({          
          email: vm.email,
          password: vm.password
        }).then(function(data) {
          vm.email = null;
          vm.password = null;
          $state.go('dvd');
        }).catch(function(error) {
          console.log(error);
        });
      }
    
  });
  
})();