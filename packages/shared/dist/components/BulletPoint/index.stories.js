"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _ = _interopRequireDefault(require("."));

var _AlertBox = require("shared/dist/components/AlertBox");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)("Bullet Point", module).addParameters({
  props: {
    propTables: [_.default]
  }
}).add("_default", function () {
  return /*#__PURE__*/_react.default.createElement(_.default, {
    type: _AlertBox.alertTypes.WARNING,
    message: "Sample Message"
  });
});