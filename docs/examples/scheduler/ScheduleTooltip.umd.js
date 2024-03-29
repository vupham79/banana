"use strict";

/* eslint-disable no-unused-vars,no-undef */
(function () {
  var targetElement = document.querySelector('div[data-file="scheduler/ScheduleTooltip.js"] .external-target'); // User may already have navigated away from the documentation part that shows the example

  if (!targetElement) return;
  targetElement.innerHTML = '<p>Hover an empty part of the schedule to display the ScheduleTooltip:</p>'; //START

  var scheduler = new Scheduler({
    appendTo: targetElement,
    // makes grid as high as it needs to be to fit rows
    autoHeight: true,
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
      name: 'Hover outside me',
      startDate: '2018-05-07',
      endDate: '2018-05-10',
      iconCls: 'b-fa b-fa-mouse-pointer'
    }]
  }); //END
})();
