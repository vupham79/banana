"use strict";

/* eslint-disable no-unused-vars,no-undef */
(function () {
  var targetElement = document.querySelector('div[data-file="scheduler/EventDrag.js"] .external-target'); // User may already have navigated away from the documentation part that shows the example

  if (!targetElement) return;
  targetElement.innerHTML = '<p>This demo only allows dragging within an events resource:</p>'; //START

  var scheduler = new Scheduler({
    appendTo: targetElement,
    // makes grid as high as it needs to be to fit rows
    autoHeight: true,
    features: {
      eventDrag: {
        constrainDragToResource: true
      }
    },
    startDate: new Date(2018, 4, 6),
    endDate: new Date(2018, 4, 13),
    columns: [{
      field: 'name',
      text: 'Name',
      width: 100
    }],
    resources: [{
      id: 1,
      name: 'Bernard'
    }, {
      id: 2,
      name: 'Bianca'
    }],
    events: [{
      id: 1,
      resourceId: 1,
      name: 'Drag me',
      startDate: '2018-05-06',
      endDate: '2018-05-07'
    }, {
      id: 2,
      resourceId: 2,
      name: 'Or me',
      startDate: '2018-05-07',
      endDate: '2018-05-07'
    }, {
      id: 3,
      resourceId: 2,
      name: 'But not me',
      startDate: '2018-05-08',
      endDate: '2018-05-10',
      draggable: false,
      eventColor: 'red'
    }]
  }); //END
})();
