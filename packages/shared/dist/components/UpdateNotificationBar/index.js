"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/styles");

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _ArrowForwardIos = _interopRequireDefault(require("@material-ui/icons/ArrowForwardIos"));

var _AnnoucementIcon = _interopRequireDefault(require("../../assets/images/AnnoucementIcon.png"));

var _styles2 = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpdateNotificationBar = function UpdateNotificationBar(_ref) {
  var classes = _ref.classes,
      showNotification = _ref.showNotification,
      onCloseClick = _ref.onCloseClick,
      ispageScrolled = _ref.ispageScrolled;
  if (!showNotification) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(classes.updateNotificationBar, " ").concat(ispageScrolled ? classes.addOpacity : '')
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _AnnoucementIcon.default,
    alt: "Announcment"
  }), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("span", null, "Phase 2 white paper avaliable now! "), /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    title: "Read More"
  }, "Read more on our official blog post.", /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, null))), /*#__PURE__*/_react.default.createElement(_Close.default, {
    className: classes.closeIcon,
    onClick: onCloseClick
  }));
};

var _default = (0, _styles.withStyles)(_styles2.useStyles)(UpdateNotificationBar);

exports.default = _default;