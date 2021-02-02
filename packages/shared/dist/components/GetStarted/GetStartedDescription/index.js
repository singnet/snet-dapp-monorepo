"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _StyledButton = _interopRequireDefault(require("../../StyledButton"));

var _styles2 = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GetStartedDescription = function GetStartedDescription(_ref) {
  var classes = _ref.classes,
      title = _ref.title,
      description = _ref.description,
      button = _ref.button,
      btnText = _ref.btnText,
      btnType = _ref.btnType,
      handleClick = _ref.handleClick;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.GetStartedDescription
  }, /*#__PURE__*/_react.default.createElement("h2", null, title), /*#__PURE__*/_react.default.createElement("p", null, description), button ? /*#__PURE__*/_react.default.createElement(_StyledButton.default, {
    btnText: btnText,
    type: btnType,
    onClick: handleClick
  }) : null);
};

GetStartedDescription.propTypes = {
  title: _propTypes.default.string,
  description: _propTypes.default.string
};

var _default = (0, _styles.withStyles)(_styles2.useStyles)(GetStartedDescription);

exports.default = _default;