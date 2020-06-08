"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _PrimaryFooter = _interopRequireDefault(require("./PrimaryFooter"));

var _SecondaryFooter = _interopRequireDefault(require("./SecondaryFooter"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer(_ref) {
  var data = _ref.data;
  var classes = (0, _styles.useStyles)();
  return /*#__PURE__*/_react.default.createElement("footer", {
    className: classes.footer
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    className: classes.footerWrapper
  }, /*#__PURE__*/_react.default.createElement(_PrimaryFooter.default, {
    leftData: data.PrimaryFooterLeft,
    mainData: data.PrimaryFooterMain
  }), /*#__PURE__*/_react.default.createElement(_SecondaryFooter.default, {
    data: data.SecondaryFooter
  })));
};

var _default = Footer;
exports.default = _default;