"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

StartTest(function (t) {
  Object.assign(window, {
    // The test harness needs this so that it can mock URLs for testing purposes.
    AjaxHelper: AjaxHelper
  });
  var gantt;
  t.beforeEach(function () {
    return gantt && gantt.destroy();
  });
  t.it('Should show task editor when double clicking task', function (t) {
    gantt = t.getGantt({
      appendTo: document.body,
      features: {
        taskTooltip: false
      },
      resources: t.getResourceStoreData()
    });
    var investigate = gantt.taskStore.getAt(2);
    var oldWidth;
    t.chain({
      dblClick: '.b-gantt-task.id11'
    }, {
      waitForSelector: '.b-taskeditor'
    }, function (next) {
      var oldEl = gantt.getElementFromTaskRecord(investigate);
      oldWidth = oldEl.offsetWidth;
      t.is(document.querySelector('.b-name input').value, gantt.taskStore.getById(11).name, 'Correct name');
      next();
    }, {
      click: function click() {
        return gantt.features.taskEdit.editor.widgetMap.fullDurationField.triggers.spin.upButton;
      }
    }, {
      click: function click() {
        return gantt.features.taskEdit.editor.widgetMap.saveButton.element;
      }
    }, {
      waitFor: function waitFor() {
        return gantt.getElementFromTaskRecord(investigate).offsetWidth > oldWidth;
      }
    });
  }); // https://app.assembla.com/spaces/bryntum/tickets/9416-adding-a-resource-in-the-taskeditor--then-clicking-save-throws-an-error-/

  t.it('Should not throw error when asdding resource to "from" side of new dependency.', function (t) {
    gantt = t.getGantt({
      appendTo: document.body,
      features: {
        taskTooltip: false
      },
      resources: t.getResourceStoreData()
    });
    t.livesOk(function () {
      t.chain({
        moveMouseTo: '[data-task-id="231"]'
      }, {
        moveMouseTo: '.b-sch-terminal-right'
      }, {
        drag: '[data-task-id="231"] .b-sch-terminal-right',
        to: '[data-task-id="232"]',
        dragOnly: true
      }, {
        moveMouseTo: '[data-task-id="232"] .b-sch-terminal-left'
      }, {
        mouseup: null
      }, {
        dblclick: '[data-task-id="232"]'
      }, {
        waitForSelector: '.b-taskeditor'
      }, {
        click: '.b-tabpanel-tab-title:contains(Resources)'
      }, {
        click: '.b-resourcestab .b-add-button'
      }, {
        click: '.b-grid .b-cell-editor'
      }, {
        click: '.b-list-item[data-index="0"]'
      }, {
        click: '.b-button:contains(Save)'
      }, {
        waitForPropagate: gantt.project
      }, {
        dblclick: '[data-task-id="231"]'
      }, {
        waitForSelector: '.b-taskeditor'
      }, {
        click: '.b-tabpanel-tab-title:contains(Resources)'
      }, {
        click: '.b-resourcestab .b-add-button'
      }, {
        click: '.b-grid .b-cell-editor'
      }, {
        click: '.b-list-item[data-index="0"]'
      }, {
        click: '.b-button:contains(Save)'
      }, {
        waitForPropagate: gantt.project
      });
    });
  });
  t.it('Should save assignments after task edit save button click', function (t) {
    gantt = t.getGantt({
      appendTo: document.body,
      features: {
        taskTooltip: false
      },
      resources: t.getResourceStoreData()
    });
    var investigate = gantt.project.eventStore.getAt(2),
        Arcady = gantt.project.resourceStore.getById(1);
    t.chain({
      dblClick: '.b-gantt-task.id11'
    }, {
      waitForSelector: '.b-taskeditor'
    }, {
      click: '.b-tabpanel-tab-title:contains(Resources)'
    }, {
      click: '.b-resourcestab .b-add-button'
    }, {
      click: '.b-grid .b-cell-editor'
    }, {
      wheel: '.b-list',
      deltaY: '-100'
    }, {
      click: '.b-list-item[data-index="0"]'
    }, {
      click: '.b-button:contains(Save)'
    }, {
      waitForPropagate: gantt.project
    }, function () {
      t.is(investigate.assignments.length, 1, 'Investigate task now has one assignment');
      t.is(investigate.assignments[0].resource, Arcady, 'Arcady is assigned to the task');
    });
  });
  t.it('Should not change assignments after task edit cancel button click', function (t) {
    gantt = t.getGantt({
      appendTo: document.body,
      features: {
        taskTooltip: false
      },
      resources: t.getResourceStoreData()
    });
    var investigate = gantt.project.eventStore.getAt(2);
    t.chain({
      dblClick: '.b-gantt-task.id11'
    }, {
      waitForSelector: '.b-taskeditor'
    }, {
      click: '.b-tabpanel-tab-title:contains(Resources)'
    }, {
      click: '.b-resourcestab .b-add-button'
    }, {
      click: '.b-grid .b-cell-editor'
    }, {
      wheel: '.b-list',
      deltaY: '-100'
    }, {
      click: '.b-list-item[data-index="0"]'
    }, {
      click: '.b-button:contains(Cancel)'
    }, {
      waitForSelectorNotFound: '.b-taskeditor-editing'
    }, function () {
      t.is(investigate.assignments.length, 0, 'Investigate task now has no assignments');
    });
  });
  t.describe('Advanced form works ok', function (t) {
    t.it('Should set constraints', function (t) {
      gantt = t.getGantt({
        appendTo: document.body,
        columns: [{
          type: 'name',
          width: 200
        }, {
          type: 'constrainttype',
          width: 100
        }, {
          type: 'constraintdate',
          width: 100
        }],
        subGridConfigs: {
          locked: {
            width: 400
          }
        },
        features: {
          taskTooltip: false
        }
      });
      var project = gantt.project;
      var task = gantt.taskStore.getById(13);
      t.chain({
        waitForPropagate: project
      },
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                task.constraintType = 'muststarton';
                task.constraintDate = task.startDate;
                return _context.abrupt("return", project.propagate());

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })), {
        dblclick: '.id13.b-gantt-task',
        desc: 'Edit task with constraint'
      }, {
        click: '.b-tabpanel-tab-title:contains(Advanced)'
      }, function (next) {
        t.hasValue('[name=constraintType]', 'Must start on', 'Constraint type value is ok');
        t.hasValue('[name=constraintDate]', DateHelper.format(task.startDate, 'L'), 'Constraint date value is ok');
        next();
      }, {
        click: '[name=constraintDate]'
      }, {
        type: '[DOWN][LEFT][ENTER]'
      }, function (next) {
        document.querySelector('[name=constraintType]').value = '';
        next();
      }, {
        click: '[name=constraintType]'
      }, {
        type: 's[ENTER]'
      }, {
        click: 'button:contains(Save)'
      }, {
        waitForPropagate: gantt.project
      }, function (next) {
        t.is(task.constraintType, 'startnoearlierthan', 'Constraint type is ok');
        t.is(task.constraintDate, task.startDate, 'Constraint date is ok');
        next();
      }, {
        dblclick: '.id13.b-gantt-task',
        desc: 'Edit task with constraint'
      }, {
        click: '.b-tabpanel-tab-title:contains(Advanced)'
      }, {
        click: '[name=constraintType]'
      }, function (next) {
        t.hasValue('[name=constraintType]', 'Start no earlier than', 'Constraint type value is ok');
        t.hasValue('[name=constraintDate]', DateHelper.format(task.startDate, 'L'), 'Constraint date value is ok');
        next();
      }, {
        click: '.b-constrainttypepicker .b-icon-remove'
      }, {
        click: 'button:contains(Save)'
      }, {
        waitForPropagate: gantt.project
      }, function (next) {
        t.is(task.constraintType, null, 'Constraint type is ok'); // t.is(task.constraintDate, new Date(2017, 0, 15), 'Constraint date is ok');

        next();
      });
    });
    t.it('Should set calendars', function (t) {
      gantt = t.getGantt({
        appendTo: document.body,
        columns: [{
          type: 'name',
          width: 200
        }, {
          type: 'calendar',
          width: 100
        }],
        subGridConfigs: {
          locked: {
            width: 300
          }
        },
        features: {
          taskTooltip: false
        }
      });
      var project = gantt.project;
      var task = gantt.taskStore.getById(13),
          originalEnd = task.endDate;
      task.setCalendar('night');
      t.chain({
        waitForPropagate: project
      }, {
        dblclick: '.id13.b-gantt-task',
        desc: 'Edit task'
      }, {
        click: '.b-tabpanel-tab-title:contains(Advanced)'
      }, {
        waitForSelector: 'input[name=calendar]'
      }, function (next) {
        t.hasValue('input[name=calendar]', 'Night shift', 'Calendar value is ok');
        next();
      }, {
        click: '[name=calendar]'
      }, {
        type: '[DOWN][UP][ENTER][ENTER]'
      }, {
        waitForPropagate: project
      }, function (next) {
        t.is(task.calendar.id, 'business', 'Calendar id is ok');
        t.notOk(task.endDate.getTime() === originalEnd.getTime(), 'Task is updated');
        t.contentLike('.id13 [data-column=calendar]', 'Business', 'Column cell value is ok');
      });
    });
  });
  t.it('Should disable certain fields for parent tasks', function (t) {
    gantt = t.getGantt({
      appendTo: document.body,
      features: {
        taskTooltip: false
      }
    });
    t.chain({
      dblClick: '[data-task-id="1"]'
    }, {
      waitForSelector: '.b-taskeditor'
    }, function () {
      var _gantt$features$taskE = gantt.features.taskEdit.editor.widgetMap,
          fullDurationField = _gantt$features$taskE.fullDurationField,
          effortField = _gantt$features$taskE.effortField,
          endDateField = _gantt$features$taskE.endDateField,
          percentDoneField = _gantt$features$taskE.percentDoneField;
      t.ok(fullDurationField.disabled, 'Duration disabled');
      t.ok(effortField.disabled, 'Effort disabled');
      t.ok(endDateField.disabled, 'Finish disabled');
      t.ok(percentDoneField.disabled, 'Percent done disabled');
    });
  });
  t.it('Should not cancel edit when editing a new resource allocation', function (t) {
    gantt = t.getGantt({
      appendTo: document.body,
      features: {
        taskTooltip: false
      },
      resources: t.getResourceStoreData()
    });
    var editorContext;
    t.chain({
      dblClick: '.b-gantt-task.id11'
    }, {
      waitForSelector: '.b-taskeditor'
    }, function (next) {
      gantt.features.taskEdit.editor.widgetMap.tabs.layout.animateCardChange = false;
      next();
    }, {
      click: '.b-tabpanel-tab-title:contains(Resources)'
    }, {
      click: '.b-resourcestab .b-add-button'
    }, {
      waitFor: function waitFor() {
        editorContext = gantt.features.taskEdit.editor.widgetMap['resourcestab-grid'].features.cellEdit.editorContext;
        return editorContext && editorContext.editor.containsFocus;
      }
    }, {
      click: function click() {
        return editorContext.editor.inputField.triggers.expand.element;
      }
    }, {
      click: function click() {
        return editorContext.editor.inputField.picker.getItem(1);
      }
    }, {
      type: '[TAB]'
    }, // Nothing should happen. The test is that editing does not finish
    // so there's no event to wait for.
    {
      waitFor: 500
    }, function () {
      editorContext = gantt.features.taskEdit.editor.widgetMap['resourcestab-grid'].features.cellEdit.editorContext;
      t.ok(editorContext && editorContext.editor.containsFocus);
    });
  });
  t.iit('Should preserve scroll when cancelling changes',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(t) {
      var config, project, task, scroll;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return ProjectGenerator.generateAsync(100, 30, function () {});

            case 2:
              config = _context3.sent;
              project = t.getProject(config);
              gantt = t.getGantt({
                appendTo: document.body,
                startDate: config.startDate,
                endDate: config.endDate,
                project: project
              });
              task = gantt.taskStore.getAt(gantt.taskStore.count - 1);
              t.chain({
                waitForPropagate: gantt
              }, {
                waitForSelector: '.b-gantt-task'
              },
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", gantt.scrollTaskIntoView(task));

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              })), {
                dblclick: function dblclick() {
                  return gantt.getElementFromTaskRecord(task);
                }
              }, {
                waitForSelector: '.b-taskeditor'
              }, {
                click: function click() {
                  return gantt.features.taskEdit.editor.widgetMap.fullDurationField.triggers.spin.upButton;
                }
              }, function (next) {
                scroll = gantt.scrollTop;
                var detacher = gantt.on({
                  renderTask: function renderTask(_ref4) {
                    var taskRecord = _ref4.taskRecord;

                    if (taskRecord === task) {
                      detacher();
                      next();
                    }
                  }
                });
                t.click('.b-popup-close');
              }, function () {
                t.is(gantt.scrollTop, scroll, 'Scroll is intact');
              });

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
  t.it('Should be able to show editor programmatically',
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(t) {
      var config, project;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return ProjectGenerator.generateAsync(1, 30, function () {});

            case 2:
              config = _context4.sent;
              project = t.getProject(config);
              gantt = t.getGantt({
                appendTo: document.body,
                startDate: config.startDate,
                endDate: config.endDate,
                project: project
              });
              t.chain({
                waitForPropagate: gantt
              }, {
                waitForSelector: '.b-gantt-task'
              }, function (next) {
                gantt.editTask(gantt.taskStore.rootNode.firstChild);
                next();
              }, {
                waitForSelector: '.b-gantt-taskeditor'
              });

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x2) {
      return _ref5.apply(this, arguments);
    };
  }());
  t.it('Should fire events upon show',
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(t) {
      var config, project;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return ProjectGenerator.generateAsync(1, 30, function () {});

            case 2:
              config = _context5.sent;
              project = t.getProject(config);
              gantt = t.getGantt({
                appendTo: document.body,
                startDate: config.startDate,
                endDate: config.endDate,
                project: project
              });
              _context5.next = 7;
              return project.waitForPropagateCompleted();

            case 7:
              t.firesOnce(gantt, 'beforeTaskEdit');
              t.firesOnce(gantt, 'beforeTaskEditShow');
              gantt.editTask(gantt.taskStore.rootNode.firstChild);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x3) {
      return _ref6.apply(this, arguments);
    };
  }());
  t.it('Should be possible to cancel show',
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(t) {
      var config, project;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return ProjectGenerator.generateAsync(1, 30, function () {});

            case 2:
              config = _context6.sent;
              project = t.getProject(config);
              gantt = t.getGantt({
                appendTo: document.body,
                startDate: config.startDate,
                endDate: config.endDate,
                project: project
              });
              _context6.next = 7;
              return project.waitForPropagateCompleted();

            case 7:
              t.firesOnce(gantt, 'beforeTaskEdit');
              t.wontFire(gantt, 'beforeTaskEditShow');
              gantt.on('beforeTaskEdit', function () {
                return false;
              });
              gantt.editTask(gantt.taskStore.rootNode.firstChild);
              t.selectorNotExists('.b-gantt-taskeditor', 'No editor in DOM');

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x4) {
      return _ref7.apply(this, arguments);
    };
  }());
  t.it('Should fire events upon save',
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(t) {
      var config, project;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return ProjectGenerator.generateAsync(1, 30, function () {});

            case 2:
              config = _context7.sent;
              project = t.getProject(config);
              gantt = t.getGantt({
                appendTo: document.body,
                startDate: config.startDate,
                endDate: config.endDate,
                project: project
              });
              _context7.next = 7;
              return project.waitForPropagateCompleted();

            case 7:
              t.firesOnce(gantt, 'beforeTaskSave');
              gantt.editTask(gantt.taskStore.rootNode.firstChild);
              _context7.next = 11;
              return gantt.features.taskEdit.save();

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x5) {
      return _ref8.apply(this, arguments);
    };
  }());
  t.it('Should be possible to cancel save',
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(t) {
      var config, project;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return ProjectGenerator.generateAsync(1, 30, function () {});

            case 2:
              config = _context8.sent;
              project = t.getProject(config);
              gantt = t.getGantt({
                appendTo: document.body,
                startDate: config.startDate,
                endDate: config.endDate,
                project: project
              });
              _context8.next = 7;
              return project.waitForPropagateCompleted();

            case 7:
              t.firesOnce(gantt, 'beforeTaskSave');
              t.wontFire(gantt.taskEdit.getEditor(), 'hide');
              gantt.on('beforeTaskSave', function () {
                return false;
              });
              gantt.editTask(gantt.taskStore.rootNode.firstChild);
              _context8.next = 13;
              return gantt.features.taskEdit.save();

            case 13:
              t.selectorExists('.b-gantt-taskeditor', 'Editor still visible');

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x6) {
      return _ref9.apply(this, arguments);
    };
  }());
  t.it('Should fire events upon delete',
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(t) {
      var config, project;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return ProjectGenerator.generateAsync(1, 30, function () {});

            case 2:
              config = _context9.sent;
              project = t.getProject(config);
              gantt = t.getGantt({
                appendTo: document.body,
                startDate: config.startDate,
                endDate: config.endDate,
                project: project
              });
              _context9.next = 7;
              return project.waitForPropagateCompleted();

            case 7:
              t.firesOnce(gantt, 'beforeTaskDelete');
              gantt.editTask(gantt.taskStore.rootNode.firstChild);
              _context9.next = 11;
              return gantt.features.taskEdit.delete();

            case 11:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x7) {
      return _ref10.apply(this, arguments);
    };
  }());
  t.it('Should be possible to cancel delete',
  /*#__PURE__*/
  function () {
    var _ref11 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(t) {
      var config, project;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return ProjectGenerator.generateAsync(1, 30, function () {});

            case 2:
              config = _context10.sent;
              project = t.getProject(config);
              gantt = t.getGantt({
                appendTo: document.body,
                startDate: config.startDate,
                endDate: config.endDate,
                project: project
              });
              _context10.next = 7;
              return project.waitForPropagateCompleted();

            case 7:
              t.firesOnce(gantt, 'beforeTaskDelete');
              t.wontFire(gantt.taskEdit.getEditor(), 'hide');
              gantt.on('beforeTaskDelete', function () {
                return false;
              });
              gantt.editTask(gantt.taskStore.rootNode.firstChild);
              _context10.next = 13;
              return gantt.features.taskEdit.delete();

            case 13:
              t.selectorExists('.b-gantt-taskeditor', 'Editor still visible');

            case 14:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x8) {
      return _ref11.apply(this, arguments);
    };
  }());
  t.it('Should fire events with correct params',
  /*#__PURE__*/
  function () {
    var _ref12 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(t) {
      var config, project, task;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return ProjectGenerator.generateAsync(1, 1, function () {});

            case 2:
              config = _context11.sent;
              project = t.getProject(config);
              gantt = t.getGantt({
                appendTo: document.body,
                startDate: config.startDate,
                endDate: config.endDate,
                project: project
              });
              _context11.next = 7;
              return project.waitForPropagateCompleted();

            case 7:
              task = gantt.taskStore.getById(3);
              t.firesOnce(gantt, 'beforeTaskEdit');
              gantt.on('beforeTaskEdit', function (event) {
                t.is(event.source, gantt, 'gantt');
                t.is(event.taskEdit, gantt.features.taskEdit, 'taskEdit');
                t.is(event.taskRecord, task, 'taskRecord');
                t.isInstanceOf(event.taskElement, HTMLElement, 'element');
              });
              t.firesOnce(gantt, 'beforeTaskEditShow');
              gantt.on('beforeTaskEditShow', function (event) {
                t.is(event.source, gantt, 'gantt');
                t.is(event.taskEdit, gantt.features.taskEdit, 'taskEdit');
                t.is(event.taskRecord, task, 'taskRecord');
                t.isInstanceOf(event.taskElement, HTMLElement, 'element');
                t.is(event.editor, gantt.features.taskEdit.getEditor(), 'editor');
              });
              t.firesOnce(gantt, 'beforeTaskSave');
              gantt.on('beforeTaskSave', function (event) {
                t.is(event.source, gantt, 'gantt');
                t.is(event.taskRecord, task, 'taskRecord');
                t.is(event.editor, gantt.features.taskEdit.getEditor(), 'editor');
              });
              t.firesOnce(gantt, 'beforeTaskDelete');
              gantt.on('beforeTaskDelete', function (event) {
                t.is(event.source, gantt, 'gantt');
                t.is(event.taskRecord, task, 'taskRecord');
                t.is(event.editor, gantt.features.taskEdit.getEditor(), 'editor');
              });
              gantt.on('beforeTaskSave', function () {
                return false;
              });
              gantt.on('beforeTaskDelete', function () {
                return false;
              });
              gantt.editTask(task);
              _context11.next = 21;
              return gantt.features.taskEdit.save();

            case 21:
              _context11.next = 23;
              return gantt.features.taskEdit.delete();

            case 23:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x9) {
      return _ref12.apply(this, arguments);
    };
  }());
  t.it('Should be possible to hide delete button',
  /*#__PURE__*/
  function () {
    var _ref13 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(t) {
      var config, project;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return ProjectGenerator.generateAsync(1, 1, function () {});

            case 2:
              config = _context12.sent;
              project = t.getProject(config);
              gantt = t.getGantt({
                appendTo: document.body,
                startDate: config.startDate,
                endDate: config.endDate,
                project: project,
                features: {
                  taskEdit: {
                    showDeleteButton: false
                  }
                }
              });
              _context12.next = 7;
              return project.waitForPropagateCompleted();

            case 7:
              gantt.editTask(gantt.taskStore.getById(3));
              t.selectorExists('.b-gantt-taskeditor button', 'Some button found');
              t.selectorNotExists('.b-gantt-taskeditor button:textEquals(Delete)', 'No delete button');

            case 10:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x10) {
      return _ref13.apply(this, arguments);
    };
  }()); // https://app.assembla.com/spaces/bryntum/tickets/9108

  t.it('Should not report isEditing if a listener cancels the editing',
  /*#__PURE__*/
  function () {
    var _ref14 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(t) {
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              gantt = t.getGantt();
              _context13.next = 3;
              return gantt.project.waitForPropagateCompleted();

            case 3:
              t.notOk(gantt.features.taskEdit.isEditing, 'Task edit not editing initially');
              gantt.on('beforeTaskEdit', function () {
                return false;
              });
              gantt.editTask(gantt.taskStore.rootNode.firstChild);
              t.notOk(gantt.features.taskEdit.isEditing, 'Task edit not editing');

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x11) {
      return _ref14.apply(this, arguments);
    };
  }()); // https://app.assembla.com/spaces/bryntum/tickets/8276

  t.it('Should support editing an unscheduled task',
  /*#__PURE__*/
  function () {
    var _ref15 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14(t) {
      var added;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              gantt = t.getGantt();
              added = gantt.taskStore.rootNode.appendChild({
                name: 'New task'
              }); // run propagation to calculate new task fields

              _context14.next = 4;
              return gantt.project.propagate();

            case 4:
              gantt.editTask(added);
              t.chain({
                waitForSelector: '.b-gantt-taskeditor'
              });

            case 6:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function (_x12) {
      return _ref15.apply(this, arguments);
    };
  }());
  t.it('Should not allow to set end before start date', function (t) {
    gantt = t.getGantt({
      project: t.getProject({
        calendar: 'general'
      })
    });
    var task = gantt.taskStore.getById(234);
    t.chain({
      dblclick: '.b-gantt-task.id234'
    }, {
      click: '.b-end-date .b-icon-angle-left'
    }, {
      waitFor: function waitFor() {
        return task.endDate.getTime() === new Date(2017, 1, 9).getTime() && task.duration === 0;
      },
      desc: 'End date changed, duration is 0'
    }, {
      click: '.b-end-date .b-icon-angle-left'
    }, {
      waitForPropagate: gantt
    }, {
      waitFor: function waitFor() {
        return task.endDate.getTime() === new Date(2017, 1, 9).getTime() && task.duration === 0;
      },
      desc: 'End date intact, duration is 0'
    }, {
      type: '[DOWN][TOP][ENTER]'
    }, {
      waitForPropagate: gantt
    }, {
      waitFor: function waitFor() {
        return task.endDate.getTime() === new Date(2017, 1, 9).getTime() && task.duration === 0;
      },
      desc: 'End date intact, duration is 0'
    }, {
      click: '.b-end-date .b-icon-angle-right'
    }, {
      waitFor: function waitFor() {
        return task.endDate.getTime() === new Date(2017, 1, 10).getTime() && task.duration === 1;
      },
      desc: 'End date chaged, duration is 1'
    });
  });
  t.it('Should not close on Save click if any field is invalid',
  /*#__PURE__*/
  function () {
    var _ref16 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15(t) {
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              gantt = t.getGantt();
              _context15.next = 3;
              return gantt.project.waitForPropagateCompleted();

            case 3:
              gantt.taskStore.rootNode.firstChild.name = ''; // invalid

              gantt.editTask(gantt.taskStore.rootNode.firstChild);
              gantt.features.taskEdit.save();
              t.ok(gantt.features.taskEdit.isEditing, 'Task edit still editing');

            case 7:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));

    return function (_x13) {
      return _ref16.apply(this, arguments);
    };
  }());
  t.it('Should support disabling', function (t) {
    gantt = t.getGantt();
    gantt.features.taskEdit.disabled = true;
    t.chain({
      dblClick: '.b-gantt-task'
    }, function (next) {
      t.selectorNotExists('.b-popup', 'Editor not shown');
      gantt.features.taskEdit.disabled = false;
      next();
    }, {
      dblClick: '.b-gantt-task'
    }, function () {
      t.selectorExists('.b-popup', 'Editor shown');
    });
  });
  t.it('autoSync', function (t) {
    var syncCallCount = 0;
    t.mockUrl('test-autosync-load', function (url, params, options) {
      var body = options.body,
          requestId = body.requestId;
      return {
        responseText: JSON.stringify({
          success: true,
          revision: 1,
          requestId: requestId,
          tasks: {
            rows: t.getProjectTaskData()
          },
          calendars: {
            rows: t.getProjectCalendarsData()
          },
          dependencies: {
            rows: t.getProjectDependenciesData()
          }
        })
      };
    });
    t.mockUrl('test-autosync-update', function (url, params, options) {
      var body = options.body,
          _JSON$parse = JSON.parse(body),
          requestId = _JSON$parse.requestId,
          revision = _JSON$parse.revision,
          tasks = _JSON$parse.tasks,
          updated = tasks.updated;

      syncCallCount++;
      return {
        responseText: JSON.stringify({
          success: true,
          revision: revision + tasks.length,
          requestId: requestId,
          tasks: {
            rows: updated.map(function (t) {
              return {
                id: t.id
              };
            })
          }
        })
      };
    });
    gantt = t.getGantt({
      features: {
        taskTooltip: false
      },
      project: {
        autoSync: true,
        transport: {
          load: {
            url: 'test-autosync-load',
            paramName: 'q'
          },
          sync: {
            url: 'test-autosync-update'
          }
        }
      }
    });
    t.chain({
      drag: '[data-task-id="11"]',
      offset: ['100%-5', '50%'],
      by: [gantt.tickSize + 1, 0]
    }, // The autoSync setting worked
    {
      waitFor: function waitFor() {
        return syncCallCount === 1;
      }
    }, {
      dblClick: '[data-task-id="11"]'
    }, function (next) {
      t.selectorExists('.b-popup', 'Editor shown');
      next();
    }, function (next) {
      t.click(gantt.features.taskEdit.editor.widgetMap.endDateField.triggers.forward.element, next);
    }, // Syncing is on a timer, so wait for it to cycle
    {
      waitFor: gantt.project.autoSyncTimeout * 2
    }, function (next) {
      // That must not have synced.
      t.is(syncCallCount, 1); // Cancel editing

      t.click(gantt.features.taskEdit.editor.widgetMap.cancelButton.element, next);
    }, // Syncing is on a timer, so wait for it to cycle
    {
      waitFor: gantt.project.autoSyncTimeout * 2
    }, function (next) {
      // That must not have synced.
      t.is(syncCallCount, 1);
      next();
    }, // Try again, but clicking the Save button
    {
      dblClick: '[data-task-id="11"]'
    }, function (next) {
      t.selectorExists('.b-popup', 'Editor shown');
      next();
    }, function (next) {
      t.click(gantt.features.taskEdit.editor.widgetMap.endDateField.triggers.forward.element, next);
    }, // Syncing is on a timer, so wait for it to cycle
    {
      waitFor: gantt.project.autoSyncTimeout * 2
    }, function (next) {
      // That must not have synced.
      t.is(syncCallCount, 1); // Cancel editing

      t.click(gantt.features.taskEdit.editor.widgetMap.saveButton.element, next);
    }, // Syncing is on a timer, so wait for it to cycle
    {
      waitFor: gantt.project.autoSyncTimeout * 2
    }, function () {
      // That must have synced.
      t.is(syncCallCount, 2);
    });
  });
});