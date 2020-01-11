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
  t.it('Sanity',
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(t) {
      var _ref2, result, html, assertContent, _assertContent;

      return regeneratorRuntime.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _assertContent = function _ref5() {
                _assertContent = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee2() {
                  var _loop, i;

                  return regeneratorRuntime.wrap(function _callee2$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _loop =
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _loop(i) {
                            return regeneratorRuntime.wrap(function _loop$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    _context2.next = 2;
                                    return new Promise(function (resolve) {
                                      t.setIframe({
                                        height: paperHeight + 50,
                                        html: html[i].html,
                                        onload: function onload(doc, frame) {
                                          t.ok(t.assertHeaderPosition(doc), "Header is exported ok on page ".concat(i));
                                          t.ok(t.assertFooterPosition(doc), "Footer is exported ok on page ".concat(i));
                                          t.assertRowsExportedWithoutGaps(doc, false, true);
                                          t.ok(t.assertTicksExportedWithoutGaps(doc), "Ticks exported without gaps on page ".concat(i));
                                          t.isExportedTickCount(doc, gantt.timeAxis.count);
                                          t.ok(t.assertExportedGanttDependenciesList(doc, gantt.dependencies), "Dependencies are exported ok on page ".concat(i));
                                          t.is(doc.querySelectorAll('.b-gantt-task-wrap').length, gantt.eventStore.count, 'All tasks exported');
                                          frame.remove();
                                          resolve();
                                        }
                                      });
                                    });

                                  case 2:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _loop);
                          });
                          i = 0;

                        case 2:
                          if (!(i < html.length)) {
                            _context3.next = 7;
                            break;
                          }

                          return _context3.delegateYield(_loop(i), "t0", 4);

                        case 4:
                          i++;
                          _context3.next = 2;
                          break;

                        case 7:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee2);
                }));
                return _assertContent.apply(this, arguments);
              };

              assertContent = function _ref4() {
                return _assertContent.apply(this, arguments);
              };

              _context4.next = 4;
              return t.createGanttForExport();

            case 4:
              _ref2 = _context4.sent;
              gantt = _ref2.gantt;
              paperHeight = _ref2.paperHeight;
              t.chain({
                waitForPropagate: gantt
              }, {
                waitForSelector: '.b-sch-dependency'
              },
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        t.diag('Using singlepage export');
                        _context.next = 3;
                        return gantt.features.pdfExport.export({
                          columns: gantt.columns.visibleColumns.map(function (c) {
                            return c.id;
                          }),
                          exporterType: 'singlepage',
                          range: 'completeview'
                        });

                      case 3:
                        result = _context.sent;
                        html = result.response.request.body.html;
                        t.is(html.length, 1, '1 page is exported');
                        _context.next = 8;
                        return assertContent();

                      case 8:
                        t.diag('Using multipage export');
                        _context.next = 11;
                        return gantt.features.pdfExport.export({
                          columns: gantt.columns.visibleColumns.map(function (c) {
                            return c.id;
                          }),
                          exporterType: 'multipage',
                          range: 'completeview'
                        });

                      case 11:
                        result = _context.sent;
                        html = result.response.request.body.html;
                        t.is(html.length, 1, '1 page is exported');
                        _context.next = 16;
                        return assertContent();

                      case 16:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })));

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
});