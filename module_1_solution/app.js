(function () {
  "use strict";
  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];

  function LunchCheckController($scope) {
    $scope.itemsCsv = "";
    $scope.result = "";

    $scope.checkLunch = function () {
      var items = $scope.itemsCsv.split(",").filter(function (item) {
        return item !== "";
      });

      if (items.length <= 0) $scope.result = "Please enter data first";
      else if (items.length <= 3) $scope.result = "Enjoy!";
      else $scope.result = "Too much!";
    };
  }
})();
