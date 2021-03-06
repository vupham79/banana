"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Special collection class used in {@link #ActionsGrid} to allow only single top level item to be selected.
 */
var ActionsCollection =
/*#__PURE__*/
function (_bryntum$gantt$Collec) {
  _inherits(ActionsCollection, _bryntum$gantt$Collec);

  function ActionsCollection() {
    _classCallCheck(this, ActionsCollection);

    return _possibleConstructorReturn(this, _getPrototypeOf(ActionsCollection).apply(this, arguments));
  }

  _createClass(ActionsCollection, [{
    key: "splice",
    value: function splice() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toRemove = arguments.length > 1 ? arguments[1] : undefined;

      for (var _len = arguments.length, toAdd = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        toAdd[_key - 2] = arguments[_key];
      }

      var me = this,
          lengthAfter = me.count - (Array.isArray(toRemove) ? toRemove.length : toRemove) + toAdd.length; // bryntum.gantt.Collection must always has 1 action selected

      if (lengthAfter === 1) {
        // bryntum.gantt.Collection doesn't allow adding more then 1 element
        // Only Initial state (id=-1) or parent nodes are allowed
        if (toAdd.length === 0 || toAdd.length === 1 && (toAdd[0].id === -1 || toAdd[0].isParent)) {
          var _get2;

          (_get2 = _get(_getPrototypeOf(ActionsCollection.prototype), "splice", this)).call.apply(_get2, [this, index, toRemove].concat(toAdd));
        }
      }
    }
  }]);

  return ActionsCollection;
}(bryntum.gantt.Collection);
/**
 * Actions grid contains list of undo/redo transactions available to switch to and actions
 * constituting them.
 */


var ActionsGrid =
/*#__PURE__*/
function (_bryntum$gantt$TreeGr) {
  _inherits(ActionsGrid, _bryntum$gantt$TreeGr);

  function ActionsGrid() {
    _classCallCheck(this, ActionsGrid);

    return _possibleConstructorReturn(this, _getPrototypeOf(ActionsGrid).apply(this, arguments));
  }

  _createClass(ActionsGrid, null, [{
    key: "type",
    get: function get() {
      return 'actionsgrid';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        features: {
          cellEdit: false
        },
        recordCollection: new ActionsCollection(),
        store: {
          fields: ['idx', 'title', 'changes'],
          data: [{
            id: -1,
            idx: 0,
            title: 'Initial state',
            changes: ''
          }]
        },
        selectedCell: {
          id: -1
        },
        columns: [{
          text: '#',
          field: 'idx',
          width: '1em',
          sortable: false
        }, {
          text: 'Action',
          field: 'title',
          flex: 0.4,
          type: 'tree',
          sortable: false
        }, {
          text: 'Changes',
          field: 'changes',
          flex: 0.6,
          sortable: false
        }]
      };
    }
  }]);

  return ActionsGrid;
}(bryntum.gantt.TreeGrid); // The newly created widget (ActionsGrid) should be registered. This allows us insert widget
// into a container using just simple JSON-like configuration object.


bryntum.gantt.BryntumWidgetAdapterRegister.register(ActionsGrid.type, ActionsGrid);
var project = window.project = new bryntum.gantt.ProjectModel({
  transport: {
    load: {
      url: '../_datasets/launch-saas.json'
    }
  }
}); // Primary application container. Contains two widgets: Gantt and Actions grid.

var container = new bryntum.gantt.Container({
  appendTo: 'container',
  flex: '1 1 100%',
  style: {
    flexWrap: 'nowrap'
  },
  items: [{
    ref: 'gantt',
    type: 'gantt',
    flex: '1 1 auto',
    project: project,
    columns: [{
      type: 'wbs'
    }, {
      type: 'name',
      field: 'name',
      text: 'Name',
      width: 250
    }, {
      type: 'startdate',
      text: 'Start date'
    }, {
      type: 'duration',
      text: 'Duration'
    }, {
      text: 'Predecessors',
      type: 'predecessor',
      width: 112
    }, {
      text: 'Successors',
      type: 'successor',
      width: 112
    }, {
      type: 'addnew'
    }],
    subGridConfigs: {
      locked: {
        width: 420
      }
    },
    loadMask: 'Loading tasks...'
  }, {
    type: 'splitter'
  }, {
    ref: 'actionsGrid',
    type: 'actionsgrid',
    flex: '0 0 30em'
  }]
});
var gantt = container.widgetMap.gantt,
    actionsGrid = container.widgetMap.actionsGrid,
    actionStore = actionsGrid.store,
    // Obtaining State Tracking Manager instance we will be using to track tasks and dependencies store state.
stm = gantt.project.stm; // Disabling State Tracking Manager initially to not record normalization transaction

stm.disable(); // State Tracking Manager provide us with possibility to create custom title for each transaction

stm.getTransactionTitle = function (transaction) {
  return "Transaction ".concat(stm.position + 1);
}; // Adding event listeners to update GUI accordingly


stm.on({
  // This event handler will be called each time a transaction recording stops.
  // Upon this event we:
  // - add a new transaction into the Actions grid store as well as we add
  //   transaction constituting actions as transaction node children.
  // - update undo/redo controls
  // - select the transaction currently
  recordingstop: function recordingstop(_ref) {
    var stm = _ref.stm,
        transaction = _ref.transaction;
    // Because of the selection's ActionsCollection's insistence on NOT
    // removing a selected record, we must gather the toRemove records
    // before adding and selecting the new one, then remove them.
    var toRemove = actionStore.rootNode.children.slice(stm.position);
    var action = actionStore.rootNode.insertChild({
      idx: stm.position,
      title: transaction.title,
      changes: transaction.length > 1 ? "".concat(transaction.length, " steps") : "".concat(transaction.length, " step"),
      expanded: false,
      // Here we analyze transaction actions queue and provide a corresponding title for each
      // action record for better user experience. Similar thing can be done for entire transaction title.
      children: transaction.queue.map(function (action, idx) {
        var type = action.type,
            parentModel = action.parentModel,
            model = action.model,
            modelList = action.modelList,
            newData = action.newData,
            title = '',
            changes = '';

        if (!model) {
          if (parentModel) {
            model = parentModel;
          } else {
            model = modelList[modelList.length - 1];
          }
        }

        if (type === 'UpdateAction' && model instanceof bryntum.gantt.ProjectModel) {
          title = 'Update project';
          changes = bryntum.gantt.StringHelper.safeJsonStringify(newData);
        } else if (type === 'UpdateAction' && model instanceof bryntum.gantt.TaskModel) {
          title = 'Edit task ' + model.name;
          changes = bryntum.gantt.StringHelper.safeJsonStringify(newData);
        } else if (type === 'AddAction' && model instanceof bryntum.gantt.TaskModel) {
          title = 'Add task ' + model.name;
        } else if (type === 'RemoveAction' && model instanceof bryntum.gantt.TaskModel) {
          title = 'Remove task ' + model.name;
        } else if (type === 'UpdateAction' && model instanceof bryntum.gantt.DependencyModel) {
          if (model.sourceEvent && model.targetEvent) {
            title = "Edit link ".concat(model.sourceEvent.name, " -> ").concat(model.targetEvent.name);
          } else {
            title = 'Edit link';
          }

          changes = bryntum.gantt.StringHelper.safeJsonStringify(newData);
        } else if (type === 'AddAction' && model instanceof bryntum.gantt.DependencyModel) {
          title = "Link ".concat(model.sourceTask.name, " -> ").concat(model.targetTask.name);
        } else if (type === 'RemoveAction' && model instanceof bryntum.gantt.DependencyModel) {
          var sourceEvent = model.sourceEvent || gantt.taskStore.getById(model.from),
              targetEvent = model.targetEvent || gantt.taskStore.getById(model.to);

          if (sourceEvent && targetEvent) {
            title = "Unlink ".concat(sourceEvent.name, " -> ").concat(targetEvent.name);
          } else {
            title = 'Unlink tasks';
          }
        } else if (type === 'InsertChildAction') {
          title = "Insert task ".concat(model.name, " at ").concat(action.insertIndex, " posiiton");
        }

        return {
          idx: "".concat(stm.position, ".").concat(idx + 1),
          title: title,
          changes: changes
        };
      })
    }, toRemove[0]);
    updateUndoRedoControls();
    actionsGrid.selectedRecord = action; // Remove after because the selection insists on having at least one selected record

    if (toRemove.length) {
      actionStore.rootNode.removeChild(toRemove);
    }
  },
  // This event is fired each time a transaction restoring stops i.e. when state is restored to
  // a particular transaction. Here we update undo/redo controls and select the transaction currently
  // we are at in the Actions grid.
  restoringstop: function restoringstop(_ref2) {
    var stm = _ref2.stm;
    var action = actionStore.rootNode.children[stm.position];
    updateUndoRedoControls();
    actionsGrid.selectedRecord = action;
  }
}); // Registering `selectionchange` event handler to restore application data model state to a particular
// Action grid selected transaction.

actionsGrid.on({
  selectionchange: function selectionchange(_ref3) {
    var mode = _ref3.mode,
        selected = _ref3.selected,
        deselected = _ref3.deselected;

    if (mode === 'row') {
      // Actions grid always will have one item selected
      var _selected = _slicedToArray(selected, 1),
          action = _selected[0],
          idx = action.idx;

      if (stm.position < idx) {
        stm.redo(idx - stm.position);
      } else if (stm.position > idx) {
        stm.undo(stm.position - idx);
      }
    }
  }
}); // This will add Undo/Redo buttons to the example tools area.

bryntum.gantt.WidgetHelper.append([{
  id: 'undoBtn',
  type: 'button',
  icon: 'b-icon b-fa b-fa-undo',
  color: 'b-blue b-raised',
  text: 'Undo',
  tooltip: 'Undo',
  disabled: true,
  onAction: function onAction() {
    stm.canUndo && stm.undo();
  }
}, {
  id: 'redoBtn',
  type: 'button',
  icon: 'b-icon b-fa b-fa-redo',
  color: 'b-blue b-raised',
  text: 'Redo',
  tooltip: 'Redo',
  disabled: true,
  onAction: function onAction() {
    stm.canRedo && stm.redo();
  }
}], {
  insertFirst: document.getElementById('tools') || document.body
}); // The functions updates state and badges of Undo/Redo buttons depending
// on State Tracking Manager properties

var updateUndoRedoControls = function updateUndoRedoControls() {
  var undoBtn = bryntum.gantt.WidgetHelper.getById('undoBtn');
  var redoBtn = bryntum.gantt.WidgetHelper.getById('redoBtn');
  undoBtn.badge = stm.position;
  redoBtn.badge = stm.length - stm.position;
  undoBtn.disabled = !stm.canUndo;
  redoBtn.disabled = !stm.canRedo;
};

project.load().then(function () {
  stm.enable();
  stm.autoRecord = true;
});
window.stm = stm;