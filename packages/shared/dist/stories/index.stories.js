"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _Theme = _interopRequireDefault(require("../assets/Theme"));

var _Providers = _interopRequireDefault(require("./Providers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withProviders = function withProviders(story) {
  return /*#__PURE__*/_react.default.createElement(_Providers.default, {
    theme: _Theme.default
  }, story());
};

(0, _react2.addDecorator)(withProviders);