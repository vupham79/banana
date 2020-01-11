"use strict";

(function () {
  var targetElement = document.querySelector('div[data-file="feature/RowReorder.js"] .external-target'); // User may already have navigated away from the documentation part that shows the example

  if (!targetElement) return;
  targetElement.innerHTML = '<p>Drag rows to reorder</p>'; //START
  // grid with RowReorder feature

  var grid = new Grid({
    appendTo: targetElement,
    // makes grid as high as it needs to be to fit rows
    autoHeight: true,
    features: {
      // enabled row reordering
      rowReorder: true
    },
    data: DataGenerator.generateData(5),
    columns: [{
      field: 'firstName',
      text: 'First name',
      width: 150,
      locked: true
    }, {
      field: 'surName',
      text: 'Surname',
      width: 150,
      locked: true
    }, {
      field: 'city',
      text: 'City',
      flex: 1
    }, {
      field: 'team',
      text: 'Team',
      flex: 1
    }, {
      field: 'score',
      text: 'Score',
      flex: 1
    }, {
      field: 'rank',
      text: 'Rank',
      flex: 1
    }]
  }); //END
})();
