"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ProgressSection = _interopRequireWildcard(require("./ProgressSection"));

var _styles2 = require("./styles");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgressBar = function ProgressBar(_ref) {
  var classes = _ref.classes,
      activeSection = _ref.activeSection,
      progressText = _ref.progressText,
      onSectionClick = _ref.onSectionClick;

  var computeProgressStatus = function computeProgressStatus(progressNumber, activeSection) {
    if (progressNumber < activeSection) {
      return _ProgressSection.ProgressStatusList.COMPLETED;
    }

    if (progressNumber === activeSection) {
      return _ProgressSection.ProgressStatusList.ACTIVE;
    }

    if (progressNumber > activeSection) {
      return _ProgressSection.ProgressStatusList.IDLE;
    }
  };

  return _react.default.createElement("div", {
    className: classes.tabsContainer
  }, _react.default.createElement("ul", null, progressText.map(function (text, index) {
    return _react.default.createElement(_ProgressSection.default, {
      progressNumber: index + 1,
      progressText: text,
      progressStatus: computeProgressStatus(index + 1, activeSection),
      key: text,
      onSectionClick: onSectionClick
    });
  })));
};

ProgressBar.propTypes = {
  activeSection: _propTypes.default.number,
  progressText: _propTypes.default.arrayOf(_propTypes.default.string),
  onSectionClick: _propTypes.default.func
};

var _default = (0, _styles.withStyles)(_styles2.useStyles)(ProgressBar);

exports.default = _default;