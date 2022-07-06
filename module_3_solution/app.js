(function () {
    "use strict";

    angular
        .module("NarrowItDownApp", [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service("MenuSearchService", MenuSearchService)
        .directive("foundItems", FoundItems);

    NarrowItDownController.$inject = ["MenuSearchService"];

    MenuSearchService.$inject = ["$http"];

    function NarrowItDownController(MenuSearchService) {
        const controller = this;

        controller.searchTerm = ""

        controller.items = []

        controller.removeItem = function (item) {
            console.log(item)
            const index = controller.items.indexOf(item);
            if (index > -1) controller.items.splice(index, 1);
        }

        controller.getMatchedMenuItems = function () {
            MenuSearchService.getMatchedMenuItems(controller.searchTerm)
                .then(function (items) {
                    controller.items = items
                    console.log(items)
                });
        }
    }

    function MenuSearchService($http) {
        const service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function (response) {
                let items = response.data.menu_items;
                items = items.filter(function (item) {
                    return (item.description.toLocaleLowerCase()).includes(searchTerm.toLowerCase())
                })
                return items;
            });
        }
    }

    function FoundItems() {
        return {
            templateUrl: "foundItems.html",
            scope: {
                items: "=?",
                onRemove: "&"
            }
        };
    }
})();
