"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _styles = require("@material-ui/styles");

var _GetStartedDescription = _interopRequireDefault(require("./GetStartedDescription"));

var _Category = _interopRequireDefault(require("./Category"));

var _StyledButton = _interopRequireDefault(require("../StyledButton"));

var _styles2 = require("./styles");

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GetStarted = function GetStarted(_ref) {
  var classes = _ref.classes,
      CTAType = _ref.CTAType,
      pageBtnRoute = _ref.pageBtnRoute,
      GetStartedDetails = _ref.GetStartedDetails,
      GetStartedCategories = _ref.GetStartedCategories;
  return /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    spacing: 24,
    className: classes.GetStartedMainContaienr
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    className: classes.TopSection
  }, /*#__PURE__*/_react.default.createElement(_GetStartedDescription.default, {
    title: GetStartedDetails.title,
    description: GetStartedDetails.description
  })), GetStartedCategories.map(function (item, index) {
    return /*#__PURE__*/_react.default.createElement(_Category.default, {
      key: item.categoryTitle,
      title: item.title,
      content: item.content,
      media: item.media,
      rightAlign: (index + 1) % 2 === 0
    });
  }), CTAType ? /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    className: classes.btnContainer
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: pageBtnRoute,
    className: classes.createRequestLink
  }, /*#__PURE__*/_react.default.createElement(_StyledButton.default, {
    type: "blue",
    btnText: "Create new Request"
  }))) : null);
};

var _default = (0, _styles.withStyles)(_styles2.useStyles)(GetStarted);

exports.default = _default;