"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

StartTest(function (t) {
  var gantt;
  t.beforeEach(function () {
    gantt && gantt.destroy();
  });
  t.it('Should properly schedule tasks after undo', function (t) {
    gantt = t.getGantt({
      appendTo: document.body,
      tasks: [{
        id: 1,
        startDate: '2017-01-16',
        duration: 1
      }, {
        id: 2,
        startDate: '2017-01-17',
        duration: 1
      }, {
        id: 3,
        startDate: '2017-01-18',
        duration: 1
      }, {
        id: 4,
        startDate: '2017-01-16',
        duration: 1
      }, {
        id: 5,
        startDate: '2017-01-17',
        duration: 1
      }, {
        id: 6,
        expanded: true,
        children: [{
          id: 61,
          startDate: '2017-01-18',
          duration: 1
        }]
      }],
      dependencies: [{
        fromEvent: 1,
        toEvent: 2
      }, {
        fromEvent: 2,
        toEvent: 3
      }, {
        fromEvent: 4,
        toEvent: 5
      }, {
        fromEvent: 5,
        toEvent: 61
      }]
    });
    var stm = gantt.project.getStm(); // let's track scheduling conflicts happened

    gantt.project.on('schedulingconflict', function (context) {
      Toast.show('Scheduling conflict has happened ..recent changes were reverted'); // as the conflict resolution approach let's simply cancel the changes

      context.continueWithResolutionResult(EffectResolutionResult.Cancel);
      t.fail('Scheduling conflict');
    });
    var event1 = gantt.taskStore.getById(1),
        event2 = gantt.taskStore.getById(2),
        event5 = gantt.taskStore.getById(5),
        event61 = gantt.taskStore.getById(61);
    t.chain({
      waitForPropagate: gantt
    },
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              stm.disabled = false;
              stm.autoRecord = true;
              _context.next = 4;
              return event2.setConstraint(ConstraintType.StartNoEarlierThan, new Date(2017, 1, 6));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })), {
      waitForEvent: [stm, 'recordingstop']
    },
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              stm.undo();
              t.is(event1.startDate, new Date(2017, 0, 16), 'Event 1 start is ok');
              t.is(event2.startDate, new Date(2017, 0, 17), 'Event 2 start is ok');
              _context2.next = 5;
              return event1.setConstraint(ConstraintType.StartNoEarlierThan, new Date(2017, 0, 18));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })), {
      waitForEvent: [stm, 'recordingstop']
    },
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              t.is(event1.startDate, new Date(2017, 0, 18), 'Event 1 start is ok');
              t.is(event2.startDate, new Date(2017, 0, 19), 'Event 2 start is ok');
              _context3.next = 4;
              return event61.setConstraint(ConstraintType.StartNoEarlierThan, new Date(2017, 1, 6));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })), {
      waitForEvent: [stm, 'recordingstop']
    },
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              stm.undo();
              t.is(event5.startDate, new Date(2017, 0, 17), 'Event 4 start is ok');
              t.is(event61.startDate, new Date(2017, 0, 18), 'Event 51 start is ok');
              _context4.next = 5;
              return event5.setConstraint(ConstraintType.StartNoEarlierThan, new Date(2017, 0, 20));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })), {
      waitForEvent: [stm, 'recordingstop']
    },
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              t.is(event5.startDate, new Date(2017, 0, 20), 'Event 4 start is ok');
              t.is(event61.startDate, new Date(2017, 0, 21), 'Event 51 start is ok');

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
});