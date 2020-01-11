import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

/**
 * @author Saki
 * @date 2019-03-06 11:56:30
 * @Last Modified by: Saki
 * @Last Modified time: 2019-06-28 22:03:59
 *
 * Fullscreen button. If container is passed in props then it
 * appends itself to that container. Otherwise it creates a
 * div and renders into that div.
 *
 * cSpell: ignore toggleable
 */
// libraries
import React, { Component } from 'react'; // we import gantt.umd for IE11 compatibility only. If you don't use IE import:
// import { Fullscreen, WidgetHelper } from 'bryntum-gantt';

import { Fullscreen, WidgetHelper } from 'bryntum-gantt/gantt.umd';

var FullscreenButton =
/*#__PURE__*/
function (_Component) {
  _inherits(FullscreenButton, _Component);

  function FullscreenButton() {
    _classCallCheck(this, FullscreenButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(FullscreenButton).apply(this, arguments));
  }

  _createClass(FullscreenButton, [{
    key: "componentDidMount",

    /**
     * Configure and render Fullscreen button
     */
    value: function componentDidMount() {
      var _this = this;

      var button = Fullscreen.enabled ? WidgetHelper.createWidget({
        type: 'button',
        id: 'fullscreen-button',
        icon: 'b-icon b-icon-fullscreen',
        tooltip: 'Fullscreen',
        toggleable: true,
        cls: 'b-blue b-raised',
        onToggle: function onToggle(_ref) {
          var pressed = _ref.pressed;

          if (pressed) {
            Fullscreen.request(document.documentElement);
          } else {
            Fullscreen.exit();
          }
        }
      }) : null; // eo function button

      if (button) {
        Fullscreen.onFullscreenChange(function () {
          _this.button.pressed = Fullscreen.isFullscreen;
        });
        button.appendTo = this.props.container || this.el;

        if (!this.props.skipRender) {
          button.render();
        }

        this.button = button;
      }
    } // eo function componentDidMount

    /**
     * Cleanup
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.button) {
        Fullscreen.onFullscreenChange(null);
      }
    } // eo function componentWillUnmount

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return this.props.container ? null : React.createElement("div", {
        ref: function ref(el) {
          return _this2.el = el;
        }
      });
    }
  }]);

  return FullscreenButton;
}(Component); // eo class FullscreenButton
// eof


export { FullscreenButton as default };