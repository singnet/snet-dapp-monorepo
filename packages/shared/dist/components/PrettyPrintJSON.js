"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PrettyPrintJson = function PrettyPrintJson(_ref) {
  var data = _ref.data;
  return _react.default.createElement("div", null, _react.default.createElement("pre", null, JSON.stringify(data, null, 2)));
};

var _default = PrettyPrintJson;
exports.default = _default;