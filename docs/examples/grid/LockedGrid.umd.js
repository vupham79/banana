"use strict";

(function () {
  var targetElement = document.querySelector('div[data-file="grid/LockedGrid.js"] .external-target'); // User may already have navigated away from the documentation part that shows the example

  if (!targetElement) return; //START
  // grid with basic configuration

  var grid = new Grid({
    appendTo: targetElement,
    // makes grid as high as it needs to be to fit rows
    autoHeight: true,
    width: 500,
    subGridConfigs: {
      locked: {
        width: 300
      }
    },
    data: DataGenerator.generateData(5),
    columns: [{
      field: 'name',
      text: 'Name',
      width: 200,
      locked: true
    }, {
      field: 'firstName',
      text: 'First name',
      width: 100,
      locked: true
    }, {
      field: 'surName',
      text: 'Last name',
      width: 100,
      locked: true
    }, {
      field: 'city',
      text: 'City',
      width: 100
    }, {
      type: 'number',
      field: 'age',
      text: 'Age',
      width: 200
    }, {
      field: 'food',
      text: 'Food',
      width: 200
    }]
  }); //END
})();
