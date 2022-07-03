(function () {
    "use strict";

    angular
        .module("ShoppingListApp", [])
        .controller("ShoppingListController", ShoppingListController)
        .controller("PurchasedListController", PurchasedListController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ShoppingListController.$inject = ["ShoppingListCheckOffService"];
    PurchasedListController.$inject = ["ShoppingListCheckOffService"];

    function ShoppingListController(ShoppingListCheckOffService) {
        const controller = this;

        controller.shoppingList = ShoppingListCheckOffService.shoppingList;

        controller.buy = function (item) {
            ShoppingListCheckOffService.buy(item)
        }
    }

    function PurchasedListController(ShoppingListCheckOffService) {
        const controller = this;

        controller.purchasedList = ShoppingListCheckOffService.purchasedList;
    }

    function ShoppingListCheckOffService() {
        const service = this;

        service.shoppingList = [
            {name: "Squash", quantity: 2},
            {name: "Apples", quantity: 5},
            {name: "Sourdough Bread", quantity: 2},
            {name: "Mayonnaise", quantity: 1},
            {name: "Pesto", quantity: 1},
        ];

        service.purchasedList = [];

        service.buy = function (item) {
            const index = this.shoppingList.indexOf(item);
            if (index > -1) this.shoppingList.splice(index, 1);

            this.purchasedList.push(item)
        }
    }
})();
