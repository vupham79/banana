"use strict";

(function () {
  var targetElement = document.querySelector('div[data-file="guides/features/Group.js"]');
  if (!targetElement) return; //START

  var grid = new Grid({
    appendTo: targetElement,
    autoHeight: true,
    features: {
      // group by food
      group: 'food'
    },
    data: DataGenerator.generateData(5),
    columns: [{
      field: 'name',
      text: 'Name',
      flex: 1
    }, {
      field: 'food',
      text: 'Favorite food',
      flex: 1
    }, {
      field: 'city',
      text: 'City',
      flex: 1
    }]
  }); //END
})();
