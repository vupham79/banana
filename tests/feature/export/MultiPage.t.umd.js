"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

StartTest(function (t) {
  var gantt, paperHeight;
  Object.assign(window, {
    AjaxHelper: AjaxHelper,
    DateHelper: DateHelper,
    Override: Override,
    ProjectGenerator: ProjectGenerator,
    RandomGenerator: RandomGenerator,
    Gantt: Gantt,
    PresetManager: PresetManager,
    PaperFormat: PaperFormat,
    Rectangle: Rectangle
  });
  t.overrideAjaxHelper();
  t.beforeEach(function () {
    gantt && gantt.destroy();
  });
  t.it('Should export to multiple pages',
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(t) {
      var verticalPages, horizontalPages, totalPages, rowsPerPage, _ref2, result, html;

      return regeneratorRuntime.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              verticalPages = 3, horizontalPages = 2, totalPages = horizontalPages * verticalPages, rowsPerPage = 11;
              _context3.next = 3;
              return t.createGanttForExport({
                horizontalPages: horizontalPages,
                verticalPages: verticalPages,
                rowsPerPage: rowsPerPage
              });

            case 3:
              _ref2 = _context3.sent;
              gantt = _ref2.gantt;
              paperHeight = _ref2.paperHeight;
              t.chain({
                waitForPropagate: gantt
              }, {
                waitForSelector: '.b-sch-dependency'
              }, {
                waitFor: 500
              },
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var _loop, i;

                return regeneratorRuntime.wrap(function _callee$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return gantt.features.pdfExport.export({
                          columns: gantt.columns.visibleColumns.map(function (c) {
                            return c.id;
                          }),
                          exporterType: 'multipage',
                          range: 'completeview'
                        });

                      case 2:
                        result = _context2.sent;
                        html = result.response.request.body.html;
                        t.is(html.length, totalPages, "".concat(totalPages, " pages exported"));
                        _loop =
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _loop(i) {
                          return regeneratorRuntime.wrap(function _loop$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return new Promise(function (resolve) {
                                    t.setIframe({
                                      height: paperHeight,
                                      html: html[i].html,
                                      onload: function onload(doc, frame) {
                                        t.ok(t.assertHeaderPosition(doc), "Header exported ok on page ".concat(i));
                                        t.ok(t.assertFooterPosition(doc), "Footer exported ok on page ".concat(i));
                                        t.assertRowsExportedWithoutGaps(doc, false, (i + 1) % verticalPages !== 0);

                                        if (i % verticalPages === 0) {
                                          t.ok(t.assertTicksExportedWithoutGaps(doc), "Ticks exported without gaps on page ".concat(i));
                                        }

                                        var _gantt = gantt,
                                            taskStore = _gantt.taskStore,
                                            tasks = taskStore.query(function (record) {
                                          return taskStore.indexOf(record) > rowsPerPage * (i % verticalPages) - 1 && taskStore.indexOf(record) < rowsPerPage * (i % verticalPages + 1) - 1;
                                        }),
                                            dependencies = gantt.dependencyStore.query(function (record) {
                                          return tasks.includes(record.sourceEvent) && tasks.includes(record.targetEvent);
                                        });
                                        t.ok(tasks.length, 'Some tasks found');
                                        t.ok(dependencies.length, 'Some dependencies found');
                                        t.ok(t.assertExportedTasksList(doc, tasks), "Tasks are exported ok on page ".concat(i));
                                        t.ok(t.assertExportedGanttDependenciesList(doc, dependencies), "Dependncies are exported ok on page ".concat(i));
                                        frame.remove();
                                        resolve();
                                      }
                                    });
                                  });

                                case 2:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _loop);
                        });
                        i = 0;

                      case 7:
                        if (!(i < html.length)) {
                          _context2.next = 12;
                          break;
                        }

                        return _context2.delegateYield(_loop(i), "t0", 9);

                      case 9:
                        i++;
                        _context2.next = 7;
                        break;

                      case 12:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee);
              })));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
});