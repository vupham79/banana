"use strict";

StartTest(function (t) {
  var gantt;
  t.beforeEach(function () {
    gantt && gantt.destroy();
  });
  t.it('Should restore state', function (t) {
    gantt = t.getGantt({
      startDate: null,
      endDate: null
    });
    var _gantt = gantt,
        startDate = _gantt.startDate,
        endDate = _gantt.endDate; // eslint-disable-next-line no-self-assign

    gantt.state = gantt.state;
    t.is(gantt.startDate, startDate, 'Gantt start is ok');
    t.is(gantt.endDate, endDate, 'Gantt end is ok');
  });
});