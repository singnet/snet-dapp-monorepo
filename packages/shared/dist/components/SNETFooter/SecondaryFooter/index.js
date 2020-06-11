"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _styles = require("./styles");

var _SocialIcon = _interopRequireDefault(require("../SocialIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SecondaryFooter = function SecondaryFooter(_ref) {
  var data = _ref.data;
  var classes = (0, _styles.useStyles)();
  return /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    className: classes.secondaryFooter
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: classes.copyrightText
  }, "Copyright \xA9 2020 SingularityNET All rights reserved."), /*#__PURE__*/_react.default.createElement("p", {
    className: classes.copyrightText
  }, "Stichting SingularityNET Barbara Strozzilaan 362 1083 HN Amsterdam The Netherlands")), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: classes.socialIconsList
  }, data.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_SocialIcon.default, {
      key: item.title,
      item: item
    });
  }))));
};

var _default = SecondaryFooter;
exports.default = _default;