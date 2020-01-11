"use strict";

StartTest(function (t) {
  // https://app.assembla.com/spaces/bryntum/tickets/9253
  t.it('Should be possible create 2 editors with the same tab disabled', function (t) {
    t.livesOk(function () {
      new TaskEditor({
        tabsConfig: {
          notestab: false
        }
      });
      new TaskEditor({
        tabsConfig: {
          notestab: false
        }
      });
    });
  });
});