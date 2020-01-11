"use strict";

StartTest(function (t) {
  var gridClass = bryntum.grid.Grid,
      schedulerClass = bryntum.scheduler.Scheduler,
      ganttClass = bryntum.gantt.Gantt;
  t.ok(gridClass, 'bryntum.grid.Grid available');
  t.ok(schedulerClass, 'bryntum.scheduler.Scheduler available');
  t.ok(ganttClass, 'bryntum.gantt.Gantt available');
  new gridClass({
    appendTo: 'grid-container',
    id: 'grid',
    columns: [{
      field: 'name',
      text: 'Name'
    }],
    data: [{
      name: 'Mr Fantastic'
    }],
    width: 1024,
    height: 300
  });
  new schedulerClass({
    appendTo: 'scheduler-container',
    id: 'scheduler',
    width: 1024,
    height: 300
  });
  new ganttClass({
    appendTo: 'gantt-container',
    id: 'gantt',
    width: 1024,
    height: 300
  });
  t.selectorExists('.b-grid#grid', 'Grid element found');
  t.selectorExists('.b-scheduler#scheduler', 'Scheduler element found');
  t.selectorExists('.b-gantt#gantt', 'Gantt element found');
  t.selectorCountIs('.b-float-root', 1, 'Single float root');
  t.notOk('BUNDLE_EXCEPTION' in window, 'No exception from including both');
});