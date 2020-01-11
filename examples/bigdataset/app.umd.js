"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable no-unused-vars */
var gantt,
    project = window.project = new bryntum.gantt.ProjectModel();

var _bryntum$gantt$Widget = bryntum.gantt.WidgetHelper.append([{
  type: 'number',
  label: 'Tasks',
  tooltip: 'Enter number of tasks to generate and press [ENTER]. Tasks are divided into blocks of ten',
  value: 1000,
  min: 10,
  max: 10000,
  width: 180,
  step: 10,
  onChange: function onChange(_ref) {
    var userAction = _ref.userAction;
    gantt.generateDataset();
  }
}, {
  type: 'number',
  label: 'Project size',
  tooltip: 'Enter number of tasks that should be connected into a "project" (multipliers of 10)',
  min: 10,
  max: 1000,
  value: 50,
  width: 180,
  step: 10,
  onChange: function onChange(_ref2) {
    var userAction = _ref2.userAction;
    gantt.generateDataset();
  }
}], {
  insertFirst: document.getElementById('tools') || document.body,
  cls: 'b-bright'
}),
    _bryntum$gantt$Widget2 = _slicedToArray(_bryntum$gantt$Widget, 2),
    taskCountField = _bryntum$gantt$Widget2[0],
    projectSizeField = _bryntum$gantt$Widget2[1];

gantt = new bryntum.gantt.Gantt({
  adopt: 'container',
  emptyText: '',
  project: project,
  columns: [{
    type: 'name',
    field: 'name',
    text: 'Name',
    width: 200
  }, {
    type: 'startdate',
    text: 'Start date'
  }, {
    type: 'duration',
    text: 'Duration'
  }],
  columnLines: false,
  generateDataset: function () {
    var _generateDataset = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _this = this;

      var mask, config;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              taskCountField.disabled = projectSizeField.disabled = true;
              mask = this.mask('Generating project');
              _context2.next = 4;
              return bryntum.gantt.ProjectGenerator.generateAsync(taskCountField.value, projectSizeField.value, function (count) {
                mask.text = "Generating tasks: ".concat(count, "/").concat(taskCountField.value);
              });

            case 4:
              config = _context2.sent;
              this.setTimeSpan(config.startDate, config.endDate);
              mask.text = 'Calculating schedule'; // Required to allow browser to update DOM before calculation starts

              this.requestAnimationFrame(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        project.startDate = config.startDate;
                        project.endDate = config.endDate;
                        project.taskStore.data = config.tasksData;
                        project.dependencyStore.data = config.dependenciesData;
                        _context.next = 6;
                        return project.propagate();

                      case 6:
                        _this.unmask();

                        taskCountField.disabled = projectSizeField.disabled = false;

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function generateDataset() {
      return _generateDataset.apply(this, arguments);
    }

    return generateDataset;
  }()
});
gantt.generateDataset();