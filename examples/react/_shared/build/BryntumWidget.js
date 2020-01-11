import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

/**
 * @author Saki
 * @date 2019-06-08 18:49:27
 * @Last Modified by: Saki
 * @Last Modified time: 2019-06-28 22:03:39
 */
import React, { Component } from 'react'; // we import gantt.umd for IE11 compatibility only. If you don't use IE import:
// import { WidgetHelper, ObjectHelper } from 'bryntum-gantt';

import { WidgetHelper, ObjectHelper } from 'bryntum-gantt/gantt.umd';

var BryntumWidget =
/*#__PURE__*/
function (_Component) {
  _inherits(BryntumWidget, _Component);

  function BryntumWidget() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BryntumWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BryntumWidget)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.configs = ['activeTab', 'allowOver', 'anchorToTarget', 'animateTabChange', 'autoClose', 'autoComplete', 'autoExpand', 'autoShow', 'badge', 'bbar', 'checked', 'chipView', 'clearable', 'clearHandler', 'closable', 'closeAction', 'closeParent', 'cls', 'color', 'dataset', 'defaults', 'disabled', 'displayField', 'displayValueRenderer', 'editable', 'emptyText', 'filterOperator', 'filterSelected', 'flex', 'focusOnHover', 'footer', 'forElement', 'forSelector', 'format', 'header', 'height', 'hidden', 'hideDelay', 'highlightExternalChange', 'html', 'icon', 'iconTpl', 'inline', 'inputWidth', 'itemCls', 'items', 'keyStrokeChangeDelay', 'keyStrokeFilterDelay', 'label', 'labelWidth', 'layoutStyle', 'listCls', 'listeners', 'listItemCls', 'loadingMsg', 'margin', 'max', 'menu', 'min', 'minChars', 'mode', 'mouseOffsetX', 'mouseOffsetY', 'multiSelect', 'onAction', 'onChange', 'onClick', 'onItem', 'picker', 'pickerAlignElement', 'pickerFormat', 'pickerWidth', 'placeholder', 'pressed', 'readOnly', 'required', 'resize', 'ripple', 'selected', 'showOnClick', 'showOnHover', 'showProgress', 'showTooltip', 'showValue', 'step', 'store', 'style', 'tabMinWidth', 'tabMaxWidth', 'tbar', 'text', 'timeout', 'title', 'toggle', 'toggleable', 'toggleGroup', 'tools', 'tooltip', 'trapFocus', 'triggerAction', 'triggers', 'type', 'unit', 'useAbbreviation', 'validateFilter', 'value', 'valueField', 'visible', 'width'];
    _this.skipUpdateProps = ['clearable', 'listeners', 'placeholder', 'triggers', 'type'];
    return _this;
  }

  _createClass(BryntumWidget, [{
    key: "componentDidMount",

    /* #endregion */
    // runs when React rendered DOM so we render the widget into that dom
    value: function componentDidMount() {
      var _this2 = this;

      var config = {
        appendTo: this.props.container || this.el
      };
      this.configs.forEach(function (configName) {
        if (undefined !== _this2.props[configName]) config[configName] = _this2.props[configName];
      });
      this.widget = WidgetHelper.createWidget(config);
    } // eo function componentDidMount

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var widget = this.widget,
          props = this.props,
          configs = this.configs,
          skipUpdateProps = this.skipUpdateProps;
      Object.keys(props).forEach(function (propName) {
        // we update only changed props skipping the listed props
        if (configs.includes(propName) && !skipUpdateProps.includes(propName) && !ObjectHelper.isEqual(props[propName], nextProps[propName])) {
          widget[propName] = nextProps[propName];
        }
      }); // we don't let React to re-render this component

      return false;
    } // eo function shouldComponentUpdate
    // let's destroy the underlying Bryntum widget

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.widget && this.widget.destroy();
    } // eo function componentWillUnmount

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return this.props.container ? null : React.createElement("div", {
        ref: function ref(el) {
          return _this3.el = el;
        }
      });
    } // eo function render

  }]);

  return BryntumWidget;
}(Component); // eo class BryntumWidget


BryntumWidget.defaultProps = {};
export default BryntumWidget; // eof