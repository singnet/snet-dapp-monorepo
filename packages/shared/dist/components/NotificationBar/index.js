"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.notificationBarTypes = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/styles");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _clsx = _interopRequireDefault(require("clsx"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _styles2 = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notificationBarTypes = {
  WARNING: "WARNING",
  INFORMATION: "INFORMATION",
  REMINDER: "REMINDER"
};
exports.notificationBarTypes = notificationBarTypes;

var NotificationBar = function NotificationBar(_ref) {
  var classes = _ref.classes,
      showNotification = _ref.showNotification,
      Icon = _ref.icon,
      message = _ref.message,
      type = _ref.type;
  if (!showNotification) return null;
  return /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    className: classes.NotificationBar
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    className: (0, _clsx.default)(classes.notificationText, classes[notificationBarTypes[type]])
  }, !(0, _isEmpty.default)(Icon) && /*#__PURE__*/_react.default.createElement(Icon, null), /*#__PURE__*/_react.default.createElement("span", null, message)));
};

NotificationBar.propTypes = {
  type: _propTypes.default.oneOf(["WARNING", "INFORMATION", "REMINDER"]),
  message: _propTypes.default.string,
  showNotification: _propTypes.default.bool,
  icon: _propTypes.default.object
};

var _default = (0, _styles.withStyles)(_styles2.useStyles)(NotificationBar);

exports.default = _default;