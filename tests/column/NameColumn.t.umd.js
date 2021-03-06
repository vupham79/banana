"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

StartTest(function (t) {
  var gantt;
  t.beforeEach(function () {
    gantt && gantt.destroy();
  });
  t.it('Name column should be always added if not provided in columns config', function (t) {
    gantt = t.getGantt({
      appendTo: document.body,
      columns: []
    });
    t.ok(gantt.columns.count, 1, '1 column');
    t.ok(gantt.columns.first.type, 'name', 'Name column added');
  });
  t.it('Name column should NOT be added if already provided in columns config', function (t) {
    gantt = t.getGantt({
      appendTo: document.body,
      columns: [{
        type: 'name'
      }]
    });
    t.ok(gantt.columns.count, 1, '1 column');
    t.ok(gantt.columns.first.type, 'name', 'Name column added');
  });
  t.it('Name column should NOT be added if a subclass of Name column is provided in columns config', function (t) {
    var MyNameColumn =
    /*#__PURE__*/
    function (_NameColumn) {
      _inherits(MyNameColumn, _NameColumn);

      function MyNameColumn() {
        _classCallCheck(this, MyNameColumn);

        return _possibleConstructorReturn(this, _getPrototypeOf(MyNameColumn).apply(this, arguments));
      }

      _createClass(MyNameColumn, null, [{
        key: "type",
        get: function get() {
          return 'myname';
        }
      }, {
        key: "isGanttColumn",
        get: function get() {
          return true;
        }
      }]);

      return MyNameColumn;
    }(NameColumn);

    ColumnStore.registerColumnType(MyNameColumn);
    gantt = t.getGantt({
      appendTo: document.body,
      columns: [{
        type: 'myname'
      }]
    });
    t.ok(gantt.columns.count, 1, '1 column');
    t.ok(gantt.columns.first.type, 'myname', 'MyName column added');
  });
});