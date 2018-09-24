(function(){
    'use strict';

    angular.module('MenuApp',[])
    .controller('MenuController',MenuController)
    .service('MenuService',MenuService);

    MenuController.$inject = ['MenuService'];
    function MenuController(MenuService)
    {
        var menu = this;
        menu.name = 'Egg';
        menu.visible = false;
        menu.getMenuCategories = function()
        {
           var promise = MenuService.getMenuCategories();
           promise.then(
                   function(success)
                   {
                    console.log("Categories",success.data);
                    menu.categories = success.data;
                   }
                      );
            menu.visible = true;
        };

        menu.getMyJson = function()
        {
           var promise = MenuService.getMyJson();
           promise.then(
                   function(success)
                   {
                    console.log("json",success.data);
                   // menu.categories = success.data;
                   }
                      );
            menu.visible = true;
        };
        
        menu.getMenuItems = function()
        {
           var promise = MenuService.getMenuItems();
           promise.then(
                   function(success)
                   {
                    console.log("Total Menu items",success.data);
                    menu.items = success.data;
                   }
                      );
        }; 

        menu.getMenuForCategory = function(shortname)
        {
            var promise = MenuService.getMenuForCategory(shortname);

            promise.then(function(success){
                console.log("Menu for selected category:",success.data.menu_items);
                menu.menuitems = success.data.menu_items;
            });
        }

        menu.deleteItem = function(id)
        {
           var promise = MenuService.deleteItem(id);

           promise.then(function(success){
               console.log("Deleted");
           });
        }

        menu.createCat = function(user)
        {
            var users = [];
            var promise = MenuService.createCat(user);
            promise.then(function(success)
            {
                console.log("response",success.data);
                menu.users.push(success.data);
            });
        }  
       
    }

    MenuService.$inject = ['$http'];
    function MenuService($http)
    {
      var service = this;

   service.getMenuCategories = function()
   {
       var response = $http({
          url:"https://davids-restaurant.herokuapp.com/categories.json",
          method:"GET"
      });
      return response;
   };

    service.getMyJson = function()
   {
       var response = $http({
          url:"https://github.com/priyangaprakash/json/blob/master/myfile.json",
          method:"GET"
      });
      return response;
   };


   service.getMenuItems = function()
   {
       var response = $http({
          url:"https://davids-restaurant.herokuapp.com/menu_items.json",
          method:"GET"
      });
      return response;
   };

   service.getMenuForCategory = function(shortname)
   {
       var response = $http({
          url:"https://davids-restaurant.herokuapp.com/menu_items.json",
          method:"GET",
          params:{category : shortname} //category is given in the deployment itself..we can directly use that one
      }); 
      return response;
   }

   service.deleteItem = function(shortname)
   {
       var response = $http({
            url:"https://davids-restaurant.herokuapp.com/menu_items.json",
          method:"DELETE",
          params:{category:shortname}
       });
       return response;
   }

   service.createCat = function(user)
   {
       var response = $http({
           url:"https://davids-restaurant.herokuapp.com/categories.json",
          method:"POST",
          data: user
       });
       return response;
   }
      
 }
})();