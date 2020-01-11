import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

/**
 * @author Saki
 * @date 2019-06-28 19:37:14
 * @Last Modified by: Saki
 * @Last Modified time: 2019-06-30 23:01:01
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // we import gantt.umd for IE11 compatibility only. If you don't use IE
// import { Gantt, ObjectHelper, Widget } from 'bryntum-gantt';

import { Gantt, ObjectHelper, Widget } from 'bryntum-gantt/gantt.umd'; // Defines a React component that wraps Bryntum Gantt

var BryntumGantt =
/*#__PURE__*/
function (_Component) {
  _inherits(BryntumGantt, _Component);

  function BryntumGantt() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BryntumGantt);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BryntumGantt)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.featureRe = /Feature$/;
    _this.features = ['baselinesFeature', 'cellEditFeature', 'cellTooltipFeature', 'columnDragToolbarFeature', 'columnLinesFeature', 'columnPickerFeature', 'columnReorderFeature', 'columnResizeFeature', 'criticalPathsFeature', 'contextMenuFeature', 'dependenciesFeature', 'dependencyEditFeature', 'eventContextMenuFeature', 'eventDragCreateFeature', 'eventDragFeature', 'eventEditFeature', 'eventFilterFeature', 'eventResizeFeature', 'eventTooltipFeature', 'filterBarFeature', 'filterFeature', 'groupFeature', 'groupSummaryFeature', 'headerContextMenuFeature', 'labelsFeature', 'nonWorkingTimeFeature', 'panFeature', 'pdfExportFeature', 'percentBarFeature', 'progressLineFeature', 'projectLinesFeature', 'quickFindFeature', 'regionResizeFeature', 'resourceTimeRangesFeature', 'rowReorderFeature', 'scheduleContextMenuFeature', 'scheduleTooltipFeature', 'searchFeature', 'sortFeature', 'stripeFeature', 'summaryFeature', 'taskContextMenuFeature', 'taskDragCreateFeature', 'taskDragFeature', 'taskEditFeature', 'taskResizeFeature', 'taskTooltipFeature', 'timeRangesFeature', 'treeFeature'];
    _this.configs = ['animateRemovingRows', 'barMargin', 'cls', 'columnLines', 'columns', 'data', 'dataset', 'disabled', 'displayDateFormat', 'durationDisplayPrecision', 'emptyText', 'enableDeleteKey', 'enableTextSelection', 'endDate', 'eventColor', 'eventStyle', 'fillLastColumn', 'flex', 'forceFit', 'fullRowRefresh', 'height', 'hideHeaders', 'listeners', 'loadMask', 'longPressTime', 'managedEventSizing', 'maxHeight', 'maxWidth', 'maxZoomLevel', 'milestoneLayoutMode', 'minHeight', 'minWidth', 'minZoomLevel', 'navigator', 'partner', 'plugins', 'project', 'readOnly', 'ref', 'responsiveLevels', 'ripple', 'rowHeight', 'scrollLeft', 'scrollTop', 'selectedCell', 'selectedRecord', 'selectedRecords', 'showDirty', 'showRemoveRowInContextMenu', 'snap', 'snapRelativeToEventStartDate', 'startDate', 'store', 'style', 'subGridConfigs', 'taskRenderer', 'tickWidth', 'timeAxis', 'timeResolution', 'title', 'tooltip', 'viewportCenterDate', 'viewPreset', 'width', 'workingTime', 'zoomLevel', 'zoomLevels'];
    _this.state = {
      portals: new Set(),
      generation: 0
    };
    return _this;
  }

  _createClass(BryntumGantt, [{
    key: "releaseReactCell",
    value: function releaseReactCell(cellElement) {
      var state = this.state,
          cellElementData = cellElement._domData; // Cell already has a react component in it, remove

      if (cellElementData.reactPortal) {
        state.portals.delete(cellElementData.reactPortal);
        this.setState({
          portals: state.portals,
          generation: state.generation + 1
        });
        cellElementData.reactPortal = null;
      }
    } // React component rendered to DOM, render gantt to it

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var props = this.props,
          config = {
        appendTo: this.el,
        callOnFunctions: true,
        features: {},
        // Hook called by engine when requesting a cell editor
        processCellEditor: function processCellEditor(_ref) {
          var editor = _ref.editor,
              field = _ref.field;

          // String etc handled by feature, only care about fns returning React components here
          if (typeof editor !== 'function') {
            return;
          } // Wrap React editor in an empty widget, to match expectations from CellEdit/Editor and make alignment
          // etc. work out of the box


          var wrapperWidget = new Widget({
            name: field // For editor to be hooked up to field correctly

          }); // Ref for accessing the React editor later

          wrapperWidget.reactRef = React.createRef(); // column.editor is expected to be a function returning a React component (can be JSX). Function is
          // called with the ref from above, it has to be used as the ref for the editor to wire things up

          var reactComponent = editor(wrapperWidget.reactRef);

          if (reactComponent.$$typeof !== Symbol.for('react.element')) {
            throw new Error('Expect a React element');
          }

          var editorValidityChecked = false; // Add getter/setter for value on the wrapper, relaying to getValue()/setValue() on the React editor

          Object.defineProperty(wrapperWidget, 'value', {
            enumerable: true,
            get: function get() {
              debugger;
              return wrapperWidget.reactRef.current.getValue();
            },
            set: function set(value) {
              var component = wrapperWidget.reactRef.current;

              if (!editorValidityChecked) {
                var misses = ['setValue', 'getValue', 'isValid', 'focus'].filter(function (fn) {
                  return !(fn in component);
                });

                if (misses.length) {
                  throw new Error("\n                                        Missing function".concat(misses.length > 1 ? 's' : '', " ").concat(misses.join(', '), " in ").concat(component.constructor.name, ".\n                                        Cell editors must implement setValue, getValue, isValid and focus\n                                    "));
                }

                editorValidityChecked = true;
              }

              var context = wrapperWidget.owner.cellEditorContext;
              component.setValue(value, context);
            }
          }); // Add getter for isValid to the wrapper, mapping to isValid() on the React editor

          Object.defineProperty(wrapperWidget, 'isValid', {
            enumerable: true,
            get: function get() {
              return wrapperWidget.reactRef.current.isValid();
            }
          }); // Override widgets focus handling, relaying it to focus() on the React editor

          wrapperWidget.focus = function () {
            wrapperWidget.reactRef.current.focus && wrapperWidget.reactRef.current.focus();
          }; // Create a portal, making the React editor belong to the React tree although displayed in a Widget


          var portal = ReactDOM.createPortal(reactComponent, wrapperWidget.element);
          wrapperWidget.reactPortal = portal;
          var state = _this2.state; // Store portal in state to let React keep track of it (inserted into the Grid component)

          state.portals.add(portal);

          _this2.setState({
            portals: state.portals,
            generation: state.generation + 1
          });

          return {
            editor: wrapperWidget
          };
        },
        // Hook called by engine when rendering cells, creates portals for JSX supplied by renderers
        processCellContent: function processCellContent(_ref2) {
          var cellContent = _ref2.cellContent,
              cellElement = _ref2.cellElement,
              cellElementData = _ref2.cellElementData,
              record = _ref2.record;
          var shouldSetContent = Boolean(cellContent); // Release any existing React component

          _this2.releaseReactCell(cellElement); // Detect React component


          if (cellContent && cellContent.$$typeof === Symbol.for('react.element')) {
            // Excluding special rows for now to keep renderers simpler
            if (!record.meta.specialRow) {
              // Clear any non-react content
              var firstChild = cellElement.firstChild;

              if (!cellElementData.reactPortal && firstChild) {
                firstChild.data = '';
              } // Create a portal, belonging to the existing React tree but render in a cell


              var portal = ReactDOM.createPortal(cellContent, cellElement);
              cellElementData.reactPortal = portal;
              var state = _this2.state; // Store in state for React to not loose track of the portals

              state.portals.add(portal);

              _this2.setState({
                portals: state.portals,
                generation: state.generation + 1
              });
            }

            shouldSetContent = false;
          }

          return shouldSetContent;
        }
      }; // relay properties with names matching this.featureRe to features

      this.features.forEach(function (featureName) {
        if (featureName in _this2.props) {
          config.features[featureName.replace(_this2.featureRe, '')] = _this2.props[featureName];
        }
      }); // Handle config (relaying all props except those used for features to gantt)

      Object.keys(this.props).forEach(function (propName) {
        if (!propName.match(_this2.featureRe) && undefined !== _this2.props[propName]) {
          config[propName] = _this2.props[propName];
        }
      }); // console.log(config);
      // Create the actual gantt, used as engine for the wrapper

      var engine = this.ganttEngine = this.props.ganttClass ? new this.props.ganttClass(config) : new Gantt(config); // Release any contained React components when a row is removed

      engine.rowManager.on({
        removeRow: function removeRow(_ref3) {
          var row = _ref3.row;
          return row.cells.forEach(function (cell) {
            return _this2.releaseReactCell(cell);
          });
        }
      }); // Map all features from ganttEngine to gantt to simplify calls

      Object.keys(engine.features).forEach(function (key) {
        var featureName = key + 'Feature';

        if (!_this2[featureName]) {
          _this2[featureName] = engine.features[key];
        }
      });
    } // React component removed, destroy engine

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.ganttEngine.destroy();
    } // Component about to be updated, from changing a prop using state. React to it depending on what changed and
    // prevent react from re-rendering our component.

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this3 = this;

      var props = this.props,
          engine = this.ganttEngine,
          excludeProps = ['events', 'resources', 'eventsVersion', 'resourcesVersion', 'timeRanges', 'columns', 'adapter', 'ref', 'children'].concat(_toConsumableArray(this.features)); // Reflect configuration changes. Since most gantt configs are reactive the gantt will update automatically

      Object.keys(props).forEach(function (propName) {
        // Only apply if prop has changed
        if (!excludeProps.includes(propName) && !ObjectHelper.isEqual(props[propName], nextProps[propName])) {
          engine[propName] = nextProps[propName];
        }
      }); // xxVersion used to flag that data has changed

      if (nextProps.resourcesVersion !== props.resourcesVersion) {
        engine.resources = nextProps.resources;
      }

      if (nextProps.eventsVersion !== props.eventsVersion) {
        engine.eventStore.data = nextProps.events;
      } // Reflect feature config changes


      this.features.forEach(function (featureName) {
        var currentProp = props[featureName],
            nextProp = nextProps[featureName];

        if (featureName in props && !ObjectHelper.isEqual(currentProp, nextProp)) {
          engine.features[featureName.replace(_this3.featureRe, '')].setConfig(nextProp);
        }
      }); // Reflect JSX cell changes

      return nextState.generation !== this.state.generation;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement("div", {
        className: 'b-react-gantt-container',
        ref: function ref(el) {
          return _this4.el = el;
        }
      }, this.state.portals);
    } // eo function render

  }]);

  return BryntumGantt;
}(Component); // eo class BryntumGantt


BryntumGantt.defaultProps = {
  viewPreset: 'hourAndDay',
  barMargin: 2
};
export default BryntumGantt; // eof