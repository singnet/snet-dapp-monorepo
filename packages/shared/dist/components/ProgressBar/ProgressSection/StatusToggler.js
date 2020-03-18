"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));

var _styles = require("./styles");

var _ = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StatusToggler = function StatusToggler(_ref) {
  var progressNumber = _ref.progressNumber,
      progressStatus = _ref.progressStatus;
  var classes = (0, _styles.useStyles)();

  if (progressStatus === _.ProgressStatusList.COMPLETED) {
    return _react.default.createElement("div", {
      className: classes.numberContaienr
    }, _react.default.createElement("span", {
      className: classes.completedIcon
    }, _react.default.createElement(_CheckCircle.default, null)));
  }

  return _react.default.createElement("div", {
    className: classes.numberContaienr
  }, _react.default.createElement("span", {
    className: classes.number
  }, progressNumber));
};

var _default = StatusToggler;
exports.default = _default;