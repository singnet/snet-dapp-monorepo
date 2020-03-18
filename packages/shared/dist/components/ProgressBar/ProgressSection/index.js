"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProgressStatusList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var _StatusToggler = _interopRequireDefault(require("./StatusToggler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ProgressStatusList = {
  IDLE: "idle",
  ACTIVE: "active",
  COMPLETED: "completed"
};
exports.ProgressStatusList = ProgressStatusList;

var ProgressSection = function ProgressSection(_ref) {
  var progressNumber = _ref.progressNumber,
      progressText = _ref.progressText,
      progressStatus = _ref.progressStatus;
  var classes = (0, _styles.useStyles)();
  return _react.default.createElement("li", {
    className: classes[progressStatus]
  }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_StatusToggler.default, {
    progressStatus: progressStatus,
    progressNumber: progressNumber
  }), _react.default.createElement("span", {
    className: classes.TabTitle
  }, progressText)));
};

ProgressSection.propTypes = {
  progressNumber: _propTypes.default.number.isRequired,
  progressText: _propTypes.default.string.isRequired,
  progressStatus: _propTypes.default.oneOf(["idle", "active", "completed"])
};
var _default = ProgressSection;
exports.default = _default;