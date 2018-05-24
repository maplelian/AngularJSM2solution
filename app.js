(function(){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)


//List#1-ToBuy controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuyList = this; 
  toBuyList.items = ShoppingListCheckOffService.getbuyItem(); 
  toBuyList.moveItem = function (itemIndex){
      try{
        ShoppingListCheckOffService.moveItem(itemIndex);
      } catch(error){
        toBuyList.errorMessage = error.message;
    }
  };
};

//List #2- Alreadybought controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var alreadyBoughtList = this;
  alreadyBoughtList.items = ShoppingListCheckOffService.getboughtItem();
}

//This is the service to list items and move items.
function ShoppingListCheckOffService(){
  var service = this;
  var boughtList = [];  //this is an internal array under the ShoppingListCheckOffService
  var buyList = [      //this is an internal array under the ShoppingListCheckOffService
    {
        name: "Milk",
        quantity: "10"
      },
      {
        name: "Donuts",
        quantity: "20"
      },
      {
        name: "Cookies",
        quantity: "30"
      },
      {
        name: "Chocolate",
        quantity: "15"
      },
      {
        name: "Apples",
        quantity: "15"
      },
      {
        name: "Peanut Butter",
        quantity: "30"
      }
];
//expose the internal items array to the outside.
service.getbuyItem = function (){   
    return buyList;
};
//expose the internal items array to the outside.
service.getboughtItem = function(){   
    return boughtList;
};


//move the items from buyList to boughtList
service.moveItem = function (itemIndex){
        var deletedElement = buyList.splice(itemIndex, 1);
        boughtList.push(deletedElement[0]);
        if (buyList.length == 0){
          throw new Error("Everything is bought!");
        }
    }
}
})();